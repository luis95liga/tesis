import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  private sidebarOpened = new BehaviorSubject<boolean>(false);
  sidebarOpened$ = this.sidebarOpened.asObservable();

  openSidebar(value: boolean): void {
    this.sidebarOpened.next(value);
  }

  year(): any[] {
    const max = new Date().getFullYear()
    const min = max - 33
    const years = []

    for (let i = max; i >= min; i--) {
      years.push(i)
    }
    return years;
  }
}
