import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupportPageComponent } from './support-page/support-page.component';
import { LayoutModule } from '../../layout/layout.module';


@NgModule({
  declarations: [
    SupportPageComponent
  ],
  imports: [
    CommonModule,
    LayoutModule,
  ]
})
export class SupportFeatureModule {
}
