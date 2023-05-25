import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivityBriefViewModel, CategoryViewModel } from '../../../models/activity.model';
import { ActivitiesService } from '../activities.service';

@Component({
  selector: 'app-activities-list',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent implements OnInit {
  activities$ = this.activitiesService.data.activitiesAll$;
  searchControl = new FormControl();
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

  filterBy(activities: any[], str: string) {
    return activities!.filter(u => u.title.toLowerCase().includes(str.toLowerCase()));
  }
}
