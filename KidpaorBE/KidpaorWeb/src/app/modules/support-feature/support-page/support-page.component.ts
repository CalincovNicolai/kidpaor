import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CategoryViewModel } from '../../../models/activity.model';
import { ActivitiesService } from '../../activities-feature/activities.service';
import { AuthorizationService } from '../../../shared/utils/services/authorization.service';

@Component({
  selector: 'app-support-page',
  templateUrl: './support-page.component.html',
  styleUrls: ['./support-page.component.scss']
})
export class SupportPageComponent  implements OnInit {
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
    private activitiesService: ActivitiesService,
    public authorizationService: AuthorizationService
  ) {
  }

  ngOnInit(): void {
    this.activitiesService.fetchAllActivities();
  }

  filterBy(activities: any[], str: string) {
    return activities!.filter(u => u.title.toLowerCase().includes(str.toLowerCase()));
  }
}
