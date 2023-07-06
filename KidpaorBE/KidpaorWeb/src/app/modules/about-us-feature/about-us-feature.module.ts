import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutUsPageComponent } from './about-us-page/about-us-page.component';
import { LayoutModule } from '../../layout/layout.module';

@NgModule({
  declarations: [
    AboutUsPageComponent
  ],
    imports: [
        CommonModule,
        LayoutModule
    ]
})
export class AboutUsFeatureModule { }
