import { Component, Inject } from '@angular/core';
import { TuiAlertService, TuiDialogContext, TuiDialogService, TuiNotification } from '@taiga-ui/core';
import { Router } from '@angular/router';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-user-logout-component',
  templateUrl: './user-logout.component.html',
  styleUrls: ['./user-logout.component.scss']
})
export class UserLogoutComponent {
  constructor(
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(TuiAlertService) private readonly alerts: TuiAlertService,
    private translate: TranslateService,
    protected router: Router,
  ) {
  }

  handleLogoutClick(content: PolymorpheusContent<TuiDialogContext>): void {
    this.dialogService.open(content, {
      size: 'l'
    }).subscribe();
  }

  logOut(observer: any) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    let label = '';
    let content = '';
    this.translate.get('SuccessfullyLogOut').subscribe(translation => {
      label = translation;
    });
    this.translate.get('SuccessfullyLogOutContent').subscribe(translation => {
      content = translation;
    });
    this.alerts
      .open(`${ content }`, {
        label: `${ label }`,
        status: TuiNotification.Success,
        autoClose: true
      })
      .subscribe();
    this.router.navigateByUrl('/welcome').then(x => observer.complete());
  }
}
