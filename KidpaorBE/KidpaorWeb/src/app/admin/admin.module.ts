import { NgModule } from '@angular/core';
import { AdminDashboardComponent } from "./admin-dashboard/admin-dashboard.component";
import { CommonModule } from "@angular/common";
import { AdminActivitiesComponent } from "./admin-activities/admin-activities.component";
import { AdminOrganizersComponent } from "./admin-organizers/admin-organizers.component";
import { AdminParentsComponent } from "./admin-parents/admin-parents.component";
import { AdminViewComponent } from './admin-view/admin-view.component';
import { RouterOutlet } from "@angular/router";
import { TuiButtonModule } from "@taiga-ui/core";

@NgModule({
  declarations: [
    AdminDashboardComponent,
    AdminActivitiesComponent,
    AdminOrganizersComponent,
    AdminParentsComponent,
    AdminViewComponent
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    TuiButtonModule
  ],
  exports: []
})
export class AdminModule {
}
