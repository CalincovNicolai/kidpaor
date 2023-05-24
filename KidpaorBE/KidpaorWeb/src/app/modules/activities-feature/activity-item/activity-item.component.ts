import { Component, Input } from '@angular/core';
import { ActivityBriefViewModel } from '../../../models/activity.model';

@Component({
  selector: 'app-activity-item',
  templateUrl: './activity-item.component.html',
  styleUrls: ['./activity-item.component.scss']
})
export class ActivityItemComponent {
  @Input() activity!: ActivityBriefViewModel;
}
