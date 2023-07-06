import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExceptionPageComponent } from './exception-page/exception-page.component';
import { LayoutModule } from '../../layout/layout.module';
import { TranslateModule } from '@ngx-translate/core';
import { TuiButtonModule } from '@taiga-ui/core';
import { RouterLink } from '@angular/router';



@NgModule({
  declarations: [
    ExceptionPageComponent
  ],
  imports: [
    CommonModule,
    LayoutModule,
    TranslateModule,
    TuiButtonModule,
    RouterLink
  ]
})
export class ExceptionFeatureModule { }
