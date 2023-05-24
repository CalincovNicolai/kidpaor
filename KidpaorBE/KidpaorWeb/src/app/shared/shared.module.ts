import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageSwitcherModule } from './language-switcher/language-switcher.module';
import { TruncatePipe } from './utils/truncate.pipe';

@NgModule({
    declarations: [
        TruncatePipe
    ],
    exports: [
        TruncatePipe
    ],
    imports: [
        LanguageSwitcherModule,
        CommonModule
    ]
})
export class SharedModule {
}
