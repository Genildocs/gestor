import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ManipularDomService {
  private stateSideBar = new BehaviorSubject<boolean>(true);
  constructor() {}

  getStateSideBar() {
    return this.stateSideBar.asObservable();
  }

  updateStateSideBar(state: boolean) {
    this.stateSideBar.next(state);
  }

  getCurrentStateSideBar(): boolean {
    return this.stateSideBar.getValue();
  }
}
