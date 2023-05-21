import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { AccountService } from "../account.service";
import { catchError, of } from "rxjs";
import { Location } from '@angular/common';
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formGroup!: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private location: Location,
    private translate: TranslateService
  ) {
    const language = localStorage.getItem('language')
    translate.use('en');
  }

  returnToPreviousPage(): void {
    this.location.back();
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    })
  }

  submit(): void {
    if (!this.formGroup.valid) return;

    this.loading = true;
    this.accountService.login(this.formGroup.value)
      .pipe(catchError(err => {
        this.loading = false;
        return of('');
      })).subscribe(user => {
      this.loading = false;
      console.log(user);
    })
  }
}
