import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  private _userRole$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  public data = {
    userRole$: this._userRole$.asObservable()
  };

  setUserRole(role: string) {
    this._userRole$.next(role);
  }

  isParent(): boolean {
    return this._userRole$.value === 'Parent';
  }

  isOrganizer(): boolean {
    return this._userRole$.value === 'Organizer';
  }
}
