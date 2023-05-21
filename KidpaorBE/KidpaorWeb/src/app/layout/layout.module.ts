import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicComponent } from './basic/basic.component';
import { CoreModule } from "../core/core.module";
import { RouterLink, RouterOutlet } from "@angular/router";
import { StartWindowComponent } from './start-window/start-window.component';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageSwitcherModule } from '../shared/language-switcher/language-switcher.module';

@NgModule({
  declarations: [
    BasicComponent,
    StartWindowComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    RouterOutlet,
    TranslateModule,
    LanguageSwitcherModule,
    RouterLink
  ],
  exports: [StartWindowComponent, BasicComponent]
})
export class LayoutModule {
}
