import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartWindowComponent } from "../layout/start-window/start-window.component";
import { LoginComponent } from '../account/login/login.component';
import { RegisterComponent } from '../account/register/register.component';

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
