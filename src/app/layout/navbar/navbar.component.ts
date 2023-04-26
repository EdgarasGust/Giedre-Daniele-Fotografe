import { ViewportScroller } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  isMenuCollapsed = false;

  constructor(private router: Router) {}

  goToComments() {
    this.router.navigate(['/'], { fragment: 'atsiliepimai' });
  }
}
