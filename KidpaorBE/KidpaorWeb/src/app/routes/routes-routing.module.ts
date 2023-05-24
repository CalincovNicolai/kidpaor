import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartWindowComponent } from "../layout/start-window/start-window.component";
import { LoginComponent } from '../account/login/login.component';
import { RegisterComponent } from '../account/register/register.component';
import { HomeComponent } from '../modules/home-feature/home/home.component';
import { ActivitiesComponent } from '../modules/activities-feature/activities-list/activities.component';
import { ActivityComponent } from '../modules/activities-feature/activity-detail/activity.component';

const routes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: "full" },
  {
    path: 'welcome',
    data: {
      title: 'Welcome to Kidpaor'
    },
    component: StartWindowComponent
  },
  {
    path: 'login',
    data: {
      title: 'Login to Kidpaor'
    },
    component: LoginComponent
  },
  {
    path: 'register',
    data: {
      title: 'Register to Kidpaor'
    },
    component: RegisterComponent
  },
  {
    path: 'home',
    data: {
      title: 'Kidpaor Home'
    },
    component: HomeComponent,
  },
  {
    path: 'activities',
    data: {
      title: 'Activities'
    },
    component: ActivitiesComponent,
  },
  {
    path: 'activities/:id',
    component: ActivityComponent,
  },
  { path: '**', redirectTo: 'exception/404' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      paramsInheritanceStrategy: 'always'
    })
  ],
  exports: [RouterModule]
})
export class RouteRoutingModule {
}
