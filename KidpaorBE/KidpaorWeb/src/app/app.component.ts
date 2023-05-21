import { Component, OnInit } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'KidpaorWeb';

  constructor(private translate: TranslateService) {
    translate.addLangs(['en', 'ro']);
    translate.setDefaultLang('en');
    translate.use('en');
  }

  ngOnInit() {
  }
}
