import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicComponent } from "./layout/basic/basic.component";

const routes: Routes = [
  {
    path: '',
    component: BasicComponent,
    children: [
      { path: '', redirectTo: '', pathMatch: 'full' },
      { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
      { path: 'account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule) }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
