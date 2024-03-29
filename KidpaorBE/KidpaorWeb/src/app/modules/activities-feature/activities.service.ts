import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, of } from "rxjs";
import { KidpaorApi } from '../../services/kidpaor-service';
import { ActivityBriefViewModel, ActivityViewModel, KidBriefViewModel } from '../../models/activity.model';
import { TuiAlertService, TuiNotification } from '@taiga-ui/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {
  private _activitiesAll$ = new BehaviorSubject<ActivityBriefViewModel[]>([]);
  private _activityData$ = new BehaviorSubject<ActivityViewModel | null>(null);
  private _activityKidsData$ = new BehaviorSubject<KidBriefViewModel[]>([]);

  public data = {
    activitiesAll$: this._activitiesAll$.asObservable(),
    activityData$: this._activityData$.asObservable(),
    activityKidsData$: this._activityKidsData$.asObservable(),
  }

  constructor(
    private apiService: KidpaorApi,
    @Inject(TuiAlertService) private readonly alerts: TuiAlertService,
    private translate: TranslateService
  ) {
  }

  fetchAllActivities() {
    this.apiService.activitiesAll()
      .pipe(
        catchError(err => {
          return of([]);
        })
      )
      .subscribe((activities: any[]) => {
        this._activitiesAll$.next(activities);
      });
  }

  fetchActivityById(id: number) {
    if (!id) {
      this._activityData$.next(null);
      return;
    }

    this.apiService
      .activitiesGET(id)
      .pipe(
        catchError(err => {
          return of(null);
        })
      )
      .subscribe((activity: any) => {
        this._activityData$.next(activity);
      });
  }

  fetchActivityKidsById(id: number) {
    if (!id) {
      this._activityKidsData$.next([]);
      return;
    }

    this.apiService
      .byActivity(id)
      .pipe(
        catchError(err => {
          return of([]);
        })
      )
      .subscribe((activityKids: any) => {
        this._activityKidsData$.next(activityKids);
      });
  }

  deleteActivityKidsById(activityId: number, id: number) {
    if (!id) {
      this._activityKidsData$.next([]);
      return;
    }

    this.apiService.deleteFromActivity(activityId, id)
      .pipe(
        catchError(err => {
          return of([]);
        })
      )
      .subscribe(() => {
        this.fetchActivityKidsById(activityId);
        let label = '';
        let content = '';
        this.translate.get('SuccessfullyDeleted').subscribe(translation => {
          label = translation;
        });
        this.translate.get('SuccessfullyKidRemoved').subscribe(translation => {
          content = translation;
        });
        this.alerts
          .open(`${content}`, {
            label: `${label}`,
            status: TuiNotification.Success,
            autoClose: false
          })
          .subscribe();
      });
  }
}
