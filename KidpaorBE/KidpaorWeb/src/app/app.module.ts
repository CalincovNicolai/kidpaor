import { NgDompurifySanitizer } from "@tinkoff/ng-dompurify";
import { TUI_SANITIZER, TuiAlertModule, TuiRootModule } from "@taiga-ui/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import { CoreModule } from "./core/core.module";
import { LayoutModule } from "./layout/layout.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TuiRootModule,
    TuiAlertModule,
    CoreModule,
    LayoutModule
  ],
  providers: [{ provide: TUI_SANITIZER, useClass: NgDompurifySanitizer }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
