import { Component, Input, OnInit } from '@angular/core';
import { ActivityBriefViewModel } from '../../../models/activity.model';
import { AuthorizationService } from '../../../shared/utils/services/authorization.service';

@Component({
  selector: 'app-activity-item',
  templateUrl: './activity-item.component.html',
  styleUrls: ['./activity-item.component.scss']
})
export class ActivityItemComponent implements OnInit {
  @Input() activity!: ActivityBriefViewModel;

  getActivityImage(imageName: string) {
    return `assets/${ imageName }`;
  }

  ngOnInit(): void {
  }
}
