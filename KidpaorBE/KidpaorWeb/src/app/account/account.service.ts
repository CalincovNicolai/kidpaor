import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { BehaviorSubject, map, of } from "rxjs";
import { IUserModel } from "../models/account.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.api.baseUrl;
  private _currentUserSource$ = new BehaviorSubject<IUserModel | null>(null);

  public data = {
    currentUser$: this._currentUserSource$.asObservable()
  }

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
  }

  loadCurrentUser(token: string) {
    if (token == null) {
      this._currentUserSource$.next(null);
      return of(null);
    }

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${ token }`);

    return this.http.get(this.baseUrl + 'account', { headers }).pipe(
      map((user: any) => {
        if (user) {
          localStorage.setItem('token', user.token);
          this._currentUserSource$.next(user);
        }
      })
    )
  }

  // login(values: any) {
  //   this.apiService.login(values).pipe(
  //     map((user: any) => {
  //       if (user) {
  //         localStorage.setItem('token', user.token);
  //         this._currentUserSource$.next(user);
  //       }
  //     })
  //   ).subscribe();
  // }

  register(values: any) {
    return this.http.post(this.baseUrl + 'account/register', values).pipe(
      map((user: any) => {
        if (user) {
          localStorage.setItem('token', user.token);
          this._currentUserSource$.next(user);
        }
      })
    )
  }

  logout() {
    localStorage.removeItem('token');
    this._currentUserSource$.next(null);
    this.router.navigateByUrl('/');
  }

  checkEmailExists(email: string) {
    return this.http.get(this.baseUrl + 'account/emailexists?email=' + email);
  }
}
