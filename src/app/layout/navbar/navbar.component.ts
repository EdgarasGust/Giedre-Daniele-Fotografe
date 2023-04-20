import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';
import { Categories } from 'src/app/interfaces/categories';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  isMenuCollapsed = false;
  isSecondaryMenuCollapsed = true;
  mobileContainer = false;
  vestuves = Categories.vestuves;
  ivairios = Categories.ivairios;
  obsSubscription: Subscription;

  constructor(public breakpointObserver: BreakpointObserver) {}
  ngOnInit() {
    this.obsSubscription = this.breakpointObserver
      .observe(['(min-width:769px)'])
      .subscribe((state: BreakpointState) => {
        state.matches
          ? (this.mobileContainer = false)
          : (this.mobileContainer = true);
      });
  }
  ngOnDestroy(): void {
    this.obsSubscription.unsubscribe();
  }
}
