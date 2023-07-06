import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartWindowComponent } from "../layout/start-window/start-window.component";
import { LoginComponent } from '../account/login/login.component';
import { RegisterComponent } from '../account/register/register.component';
import { HomeComponent } from '../modules/home-feature/home/home.component';
import { ActivitiesComponent } from '../modules/activities-feature/activities-list/activities.component';
import { ActivityComponent } from '../modules/activities-feature/activity-detail/activity.component';
import { SupportPageComponent } from '../modules/support-feature/support-page/support-page.component';
import { AboutUsPageComponent } from '../modules/about-us-feature/about-us-page/about-us-page.component';
import { ExceptionPageComponent } from '../modules/exception-feature/exception-page/exception-page.component';
import { KidsComponent } from '../modules/kids-feature/kids/kids.component';

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
    path: 'kids',
    data: {
      title: 'Kids'
    },
    component: KidsComponent,
  },
  {
    path: 'activities/:id',
    data: {
      title: 'Activity'
    },
    component: ActivityComponent,
  },
  {
    path: 'support',
    data: {
      title: 'Support'
    },
    component: SupportPageComponent,
  },
  {
    path: 'about',
    data: {
      title: 'About Us'
    },
    component: AboutUsPageComponent,
  },
  {
    path: 'not-found',
    component: ExceptionPageComponent,
  },
  { path: '**', redirectTo: 'not-found' }
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
