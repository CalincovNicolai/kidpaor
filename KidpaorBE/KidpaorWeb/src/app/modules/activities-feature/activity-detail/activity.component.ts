import { Component, OnInit } from '@angular/core';
import { distinctUntilChanged, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { KidpaorDestroyService } from '../../../services/kidpaor-destroy.service';
import { ActivitiesService } from '../activities.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {
  activity$ = this.activitiesService.data.activityData$;

  constructor(
    private activitiesService: ActivitiesService,
    private route: ActivatedRoute,
    private router: Router,
    private destroy$: KidpaorDestroyService
  ) {
  }

  ngOnInit(): void {
    this.route.params
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged()
      ).subscribe((params) => {
      const id = params['id'];
      this.activitiesService.fetchActivityById(id);
    });
  }
}
