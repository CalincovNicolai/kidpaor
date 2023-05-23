import { ChangeDetectorRef, Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { KidpaorApi, RegisterDto } from '../../services/kidpaor-service';
import { Location } from '@angular/common';
import { finalize } from 'rxjs';
import { TUI_VALIDATION_ERRORS } from '@taiga-ui/kit';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: {
        required: 'This field is required'
      }
    }
  ],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({transform: 'translateY(-30%)', opacity: 0}),
        animate('300ms ease-in', style({transform: 'translateY(0%)', opacity: 1}))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({transform: 'translateY(-30%)', opacity: 0}))
      ])
    ])
  ]
})
export class RegisterComponent {
  formGroup!: FormGroup;
  loading = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private apiService: KidpaorApi,
    private cdr: ChangeDetectorRef,
    private location: Location,
  ) {
  }

  returnToPreviousPage(): void {
    this.location.back();
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      fullName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
    }, { validator: this.validatePassword });
  }

  validatePassword(control: AbstractControl): { validatePassword: { valid: boolean; error: string } } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password?.value !== confirmPassword?.value) {
      return {
        validatePassword: {
          valid: false,
          error: `Passwords do not match`
        }
      };
    }
    return null;
  }

  submit(): void {
    if (!this.formGroup.valid) return;

    this.loading = true;
    this.cdr.detectChanges();

    this.apiService.register(
      new RegisterDto({
        displayName: this.formGroup.value.fullName,
        email: this.formGroup.value.email,
        role: this.formGroup.value.role,
        password: this.formGroup.value.password
      })
    )
      .pipe(
        finalize(() => {
          this.loading = false;
          this.cdr.detectChanges();
        }),
      )
      .subscribe((user: any) => {
        this.loading = false;
        console.log(user);
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
