import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageSwitcherModule } from './language-switcher/language-switcher.module';
import { TruncatePipe } from './utils/pipes/truncate.pipe';
import { CustomFilterPipe } from './utils/pipes/custom-filter.pipe';

@NgModule({
  declarations: [
    TruncatePipe,
    CustomFilterPipe
  ],
  exports: [
    TruncatePipe,
    CustomFilterPipe
  ],
  imports: [
    LanguageSwitcherModule,
    CommonModule
  ]
})
export class SharedModule {
}
