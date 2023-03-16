import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, catchError, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl = environment.apiUrl;
  private _parentsAll$ = new BehaviorSubject<any | null>(null);
  private _activitiesAll$ = new BehaviorSubject<any | null>(null);
  private _organizersAll$ = new BehaviorSubject<any | null>(null);
  private _usersAll$ = new BehaviorSubject<any | null>(null);
  private _requestsAll$ = new BehaviorSubject<any | null>(null);

  public data = {
    parentsAll$: this._parentsAll$.asObservable(),
    activitiesAll$: this._activitiesAll$.asObservable(),
    organizersAll$: this._organizersAll$.asObservable(),
    usersAll$: this._usersAll$.asObservable(),
    requestsAll$: this._requestsAll$.asObservable()
  }

  constructor(private http: HttpClient) {
  }

  getParents() {
    this.http.get(this.baseUrl + 'Parents')
      .pipe(
        catchError(err => {
          return of('');
        })
      )
      .subscribe(parents => {
          this._parentsAll$.next(parents);
        }
      )
  }

  getActivities() {
    this.http.get(this.baseUrl + 'Activities')
      .pipe(
        catchError(err => {
          return of('');
        })
      )
      .subscribe(activities => {
          this._activitiesAll$.next(activities);
        }
      )
  }

  addActivity(activity: any) {
    this.http.post(this.baseUrl + 'Activities', activity)
      .pipe(
        catchError(err => {
          return of('');
        })
      )
      .subscribe(() => {
          this.getActivities();
        }
      )
  }

  updateActivity(id: string, activity: any) {
    this.http.put(this.baseUrl + `Activities/${ id }`, id, activity)
      .pipe(
        catchError(err => {
          return of('');
        })
      )
      .subscribe(() => {
          this.getActivities();
        }
      )
  }

  deleteActivity(id: string) {
    this.http.delete(this.baseUrl + `Activities/${ id }`)
      .pipe(
        catchError(err => {
          return of('');
        })
      )
      .subscribe(() => {
          this.getActivities();
        }
      )
  }

  getOrganizers() {
    this.http.get(this.baseUrl + 'Organizers')
      .pipe(
        catchError(err => {
          return of('');
        })
      )
      .subscribe(organizers => {
          this._parentsAll$.next(organizers);
        }
      )
  }

  getUsers() {
    this.http.get(this.baseUrl + 'Users')
      .pipe(
        catchError(err => {
          return of('');
        })
      )
      .subscribe(users => {
          this._usersAll$.next(users);
        }
      )
  }

  deleteUser(id: string) {
    this.http.get(this.baseUrl + `Users/${ id }`)
      .pipe(
        catchError(err => {
          return of('');
        })
      )
      .subscribe(() => {
          this.getUsers();
        }
      )
  }

  getRequests() {
    this.http.get(this.baseUrl + 'Request')
      .pipe(
        catchError(err => {
          return of('');
        })
      )
      .subscribe(requests => {
          this._requestsAll$.next(requests);
        }
      )
  }
}
