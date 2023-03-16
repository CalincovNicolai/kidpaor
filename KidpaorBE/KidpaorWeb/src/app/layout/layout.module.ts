import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicComponent } from './basic/basic.component';
import { CoreModule } from "../core/core.module";
import { RouterOutlet } from "@angular/router";

@NgModule({
  declarations: [
    BasicComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    RouterOutlet
  ]
})
export class LayoutModule { }
