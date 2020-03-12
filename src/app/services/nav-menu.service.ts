import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavMenuService {
  isExpanded = false;

  constructor() { }

  NavbarClicked() {
    this.isExpanded = !this.isExpanded;
  }

  ReturnIsExpanded() {
    return this.isExpanded;
  }
}
