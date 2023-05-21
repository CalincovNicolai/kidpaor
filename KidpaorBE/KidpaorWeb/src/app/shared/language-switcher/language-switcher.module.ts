import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageSwitcherComponent } from './language-switcher-component/language-switcher.component';
import { TuiButtonModule, TuiDataListModule, TuiHostedDropdownModule } from '@taiga-ui/core';



@NgModule({
  declarations: [
    LanguageSwitcherComponent
  ],
  exports: [
    LanguageSwitcherComponent
  ],
  imports: [
    CommonModule,
    TuiHostedDropdownModule,
    TuiButtonModule,
    TuiDataListModule
  ]
})
export class LanguageSwitcherModule { }
