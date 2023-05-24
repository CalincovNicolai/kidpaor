import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { TuiButtonModule, TuiDataListModule, TuiHostedDropdownModule, TuiSvgModule } from '@taiga-ui/core';
import { TranslateModule } from '@ngx-translate/core';
import { UserLogoutModule } from '../../shared/user-logout/user-logout.module';
import { LanguageSwitcherModule } from '../../shared/language-switcher/language-switcher.module';

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
        TranslateModule,
        TuiSvgModule,
        TuiHostedDropdownModule,
        TuiDataListModule,
        UserLogoutModule,
        LanguageSwitcherModule
    ]
})
export class NavbarModule {
}
