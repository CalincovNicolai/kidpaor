import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { finalize, retry, take } from "rxjs";
import { Location } from '@angular/common';
import { KidpaorApi, LoginDto } from '../../services/kidpaor-service';
import { TUI_VALIDATION_ERRORS } from '@taiga-ui/kit';
import { Router } from '@angular/router';
import { TuiAlertService, TuiNotification } from '@taiga-ui/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: {
        required: 'This field is required'
      }
    }
  ]
})
export class LoginComponent implements OnInit {
  formGroup!: FormGroup;
  loading = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private apiService: KidpaorApi,
    private cdr: ChangeDetectorRef,
    private location: Location,
    @Inject(TuiAlertService) private readonly alerts: TuiAlertService
  ) {
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
    this.cdr.detectChanges();

    this.apiService.login(
      new LoginDto({
        email: this.formGroup.value.email,
        password: this.formGroup.value.password
      })
    )
      .pipe(
        take(1),
        retry({ count: 5, delay: 200 }),
        finalize(() => {
          this.loading = false;
          this.cdr.detectChanges();
        }),
      )
      .subscribe((user: any) => {
        this.loading = false;
        localStorage.setItem('token', user.token);
        localStorage.setItem('role', user.role);
        localStorage.setItem('user', user.displayName);
        this.alerts
          .open(`Welcome!`, {
            label: 'Successfully logged in!',
            status: TuiNotification.Success,
            autoClose: true
          })
          .subscribe();
        this.redirectAfterLogin();
      })
  }

  private redirectAfterLogin(): void {
    let url = this.router.url;
    if (url.includes('/login')) {
      url = '/home';
    }
    this.router.navigateByUrl(url).then();
  }
}
