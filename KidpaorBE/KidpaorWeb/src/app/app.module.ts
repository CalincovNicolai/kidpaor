import { NgDompurifySanitizer } from "@tinkoff/ng-dompurify";
import { TUI_SANITIZER, TuiAlertModule, TuiDialogModule, TuiRootModule } from "@taiga-ui/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CoreModule } from "./core/core.module";
import { LayoutModule } from "./layout/layout.module";
import { RoutesModule } from "./routes/routes.module";
import { RouterModule } from "@angular/router";

// import ngx-translate and the http loader
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { KidpaorApi } from './services/kidpaor-service';
import { AccountModule } from './account/account.module';
import { HomeModule } from './modules/home-feature/home.module';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule,
    TuiRootModule,
    TuiAlertModule,
    CoreModule,
    AccountModule,
    HomeModule,
    LayoutModule,
    RoutesModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    TuiDialogModule
  ],
  providers: [
    KidpaorApi,
    {
      provide: TUI_SANITIZER,
      useClass: NgDompurifySanitizer
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
