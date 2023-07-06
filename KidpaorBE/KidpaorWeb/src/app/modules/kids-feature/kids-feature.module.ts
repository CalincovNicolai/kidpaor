import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KidsComponent } from './kids/kids.component';
import { LayoutModule } from '../../layout/layout.module';



@NgModule({
  declarations: [
    KidsComponent
  ],
    imports: [
        CommonModule,
        LayoutModule
    ]
})
export class KidsFeatureModule { }
