import { Component, Inject } from '@angular/core';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { Router } from '@angular/router';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';

@Component({
  selector: 'app-user-logout-component',
  templateUrl: './user-logout.component.html',
  styleUrls: ['./user-logout.component.scss']
})
export class UserLogoutComponent {
  constructor(
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
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
    this.router.navigateByUrl('/welcome').then(x => observer.complete());
  }
}
