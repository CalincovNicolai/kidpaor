import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { KidpaorApi } from '../../services/kidpaor-service';
import { ActivityBriefViewModel } from '../../models/activity.model';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {
  private _activitiesAll$ = new BehaviorSubject<ActivityBriefViewModel[]>([]);

  public data = {
    activitiesAll$: this._activitiesAll$.asObservable()
  }

  constructor(
    private apiService: KidpaorApi
  ) {
  }

  fetchAllActivities() {
    this.apiService.activitiesAll().subscribe((activities: any[]) => {
      this._activitiesAll$.next(activities);
    });
  }
}
