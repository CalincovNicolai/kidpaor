import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
import { TuiHostedDropdownComponent } from '@taiga-ui/core';

@Component({
  selector: 'app-language-switcher-component',
  templateUrl: './language-switcher.component.html',
  styleUrls: ['./language-switcher.component.scss']
})
export class LanguageSwitcherComponent implements OnInit {
  @ViewChild(TuiHostedDropdownComponent)
  component?: TuiHostedDropdownComponent;
  language: string | null = 'EN';
  open = false;

  constructor(private translate: TranslateService) {
  }

  ngOnInit() {
    if (localStorage.getItem('language') !== null) {
      this.language = localStorage.getItem('language');
    } else this.language = 'EN';
    this.setLanguage(this.language as string);
  }

  setLanguage(lang: string) {
    this.open = false;
    this.component?.nativeFocusableElement?.focus();
    this.translate.use(lang.toLowerCase());
    this.language = lang;
    localStorage.setItem('language', lang);
  }
}
