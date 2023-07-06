import { ChangeDetectionStrategy, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { distinctUntilChanged, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { KidpaorDestroyService } from '../../../services/kidpaor-destroy.service';
import { ActivitiesService } from '../activities.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { TuiDialogContext, TuiDialogService, TuiHostedDropdownComponent } from '@taiga-ui/core';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(-30%)', opacity: 0 }),
        animate('1000ms ease-in-out', style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        style({ transform: 'translateX(0)', opacity: 1 }),
        animate('800ms ease-in-out', style({ transform: 'translateX(-30%)', opacity: 0 }))
      ])
    ])
  ]
})
export class ActivityComponent implements OnInit {
  @ViewChild(TuiHostedDropdownComponent)
  component?: TuiHostedDropdownComponent;
  activity$ = this.activitiesService.data.activityData$;
  activityKids$ = this.activitiesService.data.activityKidsData$;
  id: string = '';

  constructor(
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    private activitiesService: ActivitiesService,
    private route: ActivatedRoute,
    private router: Router,
    private destroy$: KidpaorDestroyService
  ) {
  }

  ngOnInit(): void {
    this.component?.nativeFocusableElement?.focus();
    this.route.params
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged()
      ).subscribe((params) => {
      this.id = params['id'];
      this.activitiesService.fetchActivityById(Number(this.id));
      this.activitiesService.fetchActivityKidsById(Number(this.id));
    });
  }

  getActivityImage(imageName: string) {
    return `assets/${ imageName }`;
  }

  editKid(id: number) {
    console.log();
  }

  deleteKid(id: number) {
    this.activitiesService.deleteActivityKidsById(Number(this.id), id);
  }
}
