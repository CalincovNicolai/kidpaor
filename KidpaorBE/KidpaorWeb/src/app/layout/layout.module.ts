import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicComponent } from './basic/basic.component';
import { CoreModule } from "../core/core.module";
import { RouterOutlet } from "@angular/router";
import { StartWindowComponent } from './start-window/start-window.component';

@NgModule({
  declarations: [
    BasicComponent,
    StartWindowComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    RouterOutlet
  ],
  exports: [StartWindowComponent]
})
export class LayoutModule {
}
