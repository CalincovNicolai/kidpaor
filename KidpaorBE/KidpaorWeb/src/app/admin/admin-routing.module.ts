import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { AdminDashboardComponent } from "./admin-dashboard/admin-dashboard.component";
import { AdminActivitiesComponent } from "./admin-activities/admin-activities.component";
import { AdminParentsComponent } from "./admin-parents/admin-parents.component";
import { AdminOrganizersComponent } from "./admin-organizers/admin-organizers.component";
import { AdminViewComponent } from "./admin-view/admin-view.component";

const routes: Routes = [
  {
    path: 'admin', component: AdminViewComponent, children: [
      { path: 'admin-dashboard', component: AdminDashboardComponent },
      { path: 'admin-activities', component: AdminActivitiesComponent },
      { path: 'admin-parents', component: AdminParentsComponent },
      { path: 'admin-organizers', component: AdminOrganizersComponent }
    ]
  },
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
