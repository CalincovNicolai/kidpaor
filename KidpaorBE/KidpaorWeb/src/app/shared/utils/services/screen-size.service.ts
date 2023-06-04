import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScreenSizeService {
  private screenSizeSubject: BehaviorSubject<number> = new BehaviorSubject<number>(window.innerWidth);
  public screenSize$: Observable<number> = this.screenSizeSubject.asObservable();

  constructor() {
    this.initialize();
  }

  private initialize() {
    window.addEventListener('resize', () => {
      this.screenSizeSubject.next(window.innerWidth);
    });
  }
}
