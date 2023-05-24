import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from "@angular/forms";
import {
  TuiCheckboxLabeledModule,
  TuiFieldErrorPipeModule,
  TuiInputModule,
  TuiInputPasswordModule
} from "@taiga-ui/kit";
import { TuiButtonModule, TuiErrorModule, TuiLoaderModule, TuiTextfieldControllerModule } from "@taiga-ui/core";
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { LayoutModule } from '../layout/layout.module';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiTextfieldControllerModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    TuiCheckboxLabeledModule,
    TuiLoaderModule,
    TuiButtonModule,
    TranslateModule,
    RouterLink,
    LayoutModule,
    TuiInputPasswordModule
  ]
})
export class AccountModule {
}
