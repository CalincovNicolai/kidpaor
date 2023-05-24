import { Component, OnInit } from '@angular/core';
import { CategoryViewModel } from '../../../models/activity.model';
import { ActivitiesService } from '../activities.service';

@Component({
  selector: 'app-activities-list',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent implements OnInit {
  activities$ = this.activitiesService.data.activitiesAll$;
  categories: CategoryViewModel[] = [
    {
      name: 'SummerCamp'
    },
    {
      name: 'Games'
    },
    {
      name: 'Music'
    },
    {
      name: 'Dancing'
    },
    {
      name: 'Drawing'
    },
    {
      name: 'Sport'
    },
    {
      name: 'Science'
    },
    {
      name: 'Economy'
    },
    {
      name: 'Social'
    },
    {
      name: 'Art'
    },
  ];

  constructor(
    private activitiesService: ActivitiesService
  ) {
  }

  ngOnInit(): void {
    this.activitiesService.fetchAllActivities();
  }
}
