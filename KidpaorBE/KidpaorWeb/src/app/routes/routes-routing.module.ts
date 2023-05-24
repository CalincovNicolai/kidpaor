import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartWindowComponent } from "../layout/start-window/start-window.component";
import { LoginComponent } from '../account/login/login.component';
import { RegisterComponent } from '../account/register/register.component';
import { HomeComponent } from '../modules/home-feature/home/home.component';
import { ActivitiesComponent } from '../modules/activities-feature/activities/activities.component';

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
    loadChildren: () => import('../account/account.module').then(x => x.AccountModule),
    data: {
      title: 'Login to Kidpaor'
    },
    component: LoginComponent
  },
  {
    path: 'register',
    loadChildren: () => import('../account/account.module').then(x => x.AccountModule),
    data: {
      title: 'Register to Kidpaor'
    },
    component: RegisterComponent
  },
  {
    path: 'home',
    loadChildren: () => import('../modules/home-feature/home.module').then(x => x.HomeModule),
    data: {
      title: 'Kidpaor Home'
    },
    component: HomeComponent,
  },
  {
    path: 'activities',
    loadChildren: () => import('../modules/activities-feature/activities.module').then(x => x.ActivitiesModule),
    data: {
      title: 'Activities'
    },
    component: ActivitiesComponent,
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
