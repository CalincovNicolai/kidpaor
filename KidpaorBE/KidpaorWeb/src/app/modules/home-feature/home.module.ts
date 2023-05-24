import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { TranslateModule } from '@ngx-translate/core';
import { TuiButtonModule } from '@taiga-ui/core';
import { LayoutModule } from '../../layout/layout.module';
import { NavbarModule } from '../navbar/navbar.module';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    TuiButtonModule,
    LayoutModule,
    NavbarModule
  ]
})
export class HomeModule {
}
