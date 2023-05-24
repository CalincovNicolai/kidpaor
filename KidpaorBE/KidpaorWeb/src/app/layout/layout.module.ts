import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicComponent } from './basic/basic.component';
import { CoreModule } from "../core/core.module";
import { RouterLink, RouterOutlet } from "@angular/router";
import { StartWindowComponent } from './start-window/start-window.component';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageSwitcherModule } from '../shared/language-switcher/language-switcher.module';
import { KidpaorLayoutComponent } from './kidpaor-layout/kidpaor-layout.component';
import { NavbarModule } from '../modules/navbar/navbar.module';

@NgModule({
  declarations: [
    BasicComponent,
    StartWindowComponent,
    KidpaorLayoutComponent
  ],
    imports: [
        CommonModule,
        CoreModule,
        RouterOutlet,
        TranslateModule,
        LanguageSwitcherModule,
        RouterLink,
        NavbarModule
    ],
  exports: [StartWindowComponent, BasicComponent, KidpaorLayoutComponent]
})
export class LayoutModule {
}
