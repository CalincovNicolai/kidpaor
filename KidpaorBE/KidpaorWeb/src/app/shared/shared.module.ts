import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageSwitcherModule } from './language-switcher/language-switcher.module';
import { TruncatePipe } from './utils/truncate.pipe';
import { CustomFilterPipe } from './utils/custom-filter.pipe';

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
