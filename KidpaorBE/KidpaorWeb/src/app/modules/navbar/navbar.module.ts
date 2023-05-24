import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { TuiButtonModule } from '@taiga-ui/core';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    NavBarComponent
  ],
  exports: [
    NavBarComponent
  ],
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    TuiButtonModule,
    TranslateModule
  ]
})
export class NavbarModule {
}
