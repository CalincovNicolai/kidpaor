import { Component } from '@angular/core';
import { AdminService } from "../admin.service";

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.scss']
})
export class AdminViewComponent {
  requests = this.adminService.data.requestsAll$;

  constructor(private adminService: AdminService) {
  }

  deleteActivity() {
    console.log(this.requests);
  }
}
