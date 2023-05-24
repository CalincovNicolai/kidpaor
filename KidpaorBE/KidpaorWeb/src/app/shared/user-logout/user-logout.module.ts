import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLogoutComponent } from './user-logout-component/user-logout.component';
import { TuiButtonModule, TuiSvgModule } from '@taiga-ui/core';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    UserLogoutComponent
  ],
  exports: [
    UserLogoutComponent
  ],
  imports: [
    CommonModule,
    TuiButtonModule,
    TranslateModule,
    TuiSvgModule
  ]
})
export class UserLogoutModule {
}
