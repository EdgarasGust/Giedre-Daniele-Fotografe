import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';

import { Categories } from 'src/app/interfaces/categories.enum';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  Categories = Categories;
  isMenuCollapsed = false;
  isSecondaryMenuCollapsed = true;
  mobileContainer = true;
  obsSubscription: Subscription;

  constructor(
    public breakpointObserver: BreakpointObserver,
    private router: Router,
    private ngbConfig: NgbDropdownConfig
  ) {
    ngbConfig.placement = 'auto';
  }

  ngOnInit() {
    this.breakpointObs();
  }

  breakpointObs() {
    this.obsSubscription = this.breakpointObserver
      .observe(['(max-width:769px)'])
      .subscribe((state: BreakpointState) => {
        state.matches
          ? (this.mobileContainer = true)
          : (this.mobileContainer = false);
      });
  }

  goToComments(fragment: string) {
    const urlTree = this.router.parseUrl(this.router.url);
    if (urlTree.fragment === fragment) {
      // The fragment is already in the URL, so scroll to it
      const element = document.getElementById(fragment);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Navigate to the root route with the fragment
      this.router.navigate(['/'], { fragment: fragment });
    }
  }

  ngOnDestroy(): void {
    this.obsSubscription.unsubscribe();
  }
}
