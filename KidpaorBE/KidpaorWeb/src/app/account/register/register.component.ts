import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { KidpaorApi, RegisterDto } from '../../services/kidpaor-service';
import { Location } from '@angular/common';
import { finalize } from 'rxjs';
import { TUI_VALIDATION_ERRORS } from '@taiga-ui/kit';
import { animate, style, transition, trigger } from '@angular/animations';
import { TuiAlertService, TuiNotification } from '@taiga-ui/core';
import { TranslateService } from '@ngx-translate/core';

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
        style({ transform: 'translateY(-30%)', opacity: 0 }),
        animate('300ms ease-in', style({ transform: 'translateY(0%)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateY(-30%)', opacity: 0 }))
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
    @Inject(TuiAlertService) private readonly alerts: TuiAlertService,
    private translate: TranslateService
  ) {
  }

  returnToPreviousPage(): void {
    this.location.back();
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      fullName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      roleParent: new FormControl({ value: true, disabled: false }, Validators.required),
      roleOrganizer: new FormControl({ value: false, disabled: true }, Validators.required),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
    }, { validator: this.validatePassword });
    console.log(this.formGroup);
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

  disableParentRole() {
    this.formGroup.get('roleParent')?.disable();
    this.formGroup.get('roleParent')?.setValue(false);
    this.formGroup.get('roleOrganizer')?.enable();
    this.formGroup.get('roleOrganizer')?.setValue(true);
  }

  disableOrganizerRole() {
    this.formGroup.get('roleOrganizer')?.disable();
    this.formGroup.get('roleOrganizer')?.setValue(false);
    this.formGroup.get('roleParent')?.enable();
    this.formGroup.get('roleParent')?.setValue(true);
  }

  submit(): void {
    if (!this.formGroup.valid) return;

    this.loading = true;
    this.cdr.detectChanges();

    this.apiService.register(
      new RegisterDto({
        displayName: this.formGroup.value.fullName,
        email: this.formGroup.value.email,
        role: this.formGroup.value.roleParent ? 'Parent' : 'Organizer',
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
        localStorage.setItem('token', user.token);
        localStorage.setItem('role', user.role);
        localStorage.setItem('user', user.displayName);
        let label = '';
        let content = '';
        this.translate.get('SuccessfullyRegistered').subscribe(translation => {
          label = translation;
        });
        this.translate.get('PleaseLogin').subscribe(translation => {
          content = translation;
        });
        this.alerts
          .open(`${ content }`, {
            label: `${ label }`,
            status: TuiNotification.Success,
            autoClose: true
          })
          .subscribe();
        this.redirectAfterLogin();
      })
  }

  private redirectAfterLogin(): void {
    let url = this.router.url;
    if (url.includes('/register')) {
      url = '/login';
    }
    this.router.navigateByUrl(url).then();
  }
}
