import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AccountRoutingModule } from "./account-routing.module";
import { ReactiveFormsModule } from "@angular/forms";
import { TuiCheckboxLabeledModule, TuiFieldErrorPipeModule, TuiInputModule } from "@taiga-ui/kit";
import { TuiButtonModule, TuiErrorModule, TuiLoaderModule, TuiTextfieldControllerModule } from "@taiga-ui/core";

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiTextfieldControllerModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    TuiCheckboxLabeledModule,
    TuiLoaderModule,
    TuiButtonModule
  ]
})
export class AccountModule {
}
