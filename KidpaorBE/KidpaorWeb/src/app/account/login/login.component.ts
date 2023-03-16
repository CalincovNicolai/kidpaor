import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { AccountService } from "../account.service";
import { catchError, of } from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formGroup!: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder, private accountService: AccountService) {
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
