import { Component } from '@angular/core';
import { AdminService } from "../admin.service";

@Component({
  selector: 'app-admin-activities',
  templateUrl: './admin-activities.component.html',
  styleUrls: ['./admin-activities.component.scss']
})
export class AdminActivitiesComponent {
  activities = this.adminService.data.activitiesAll$;

  constructor(private adminService: AdminService) {
  }

  deleteActivity() {
    console.log(this.activities);
  }
}
