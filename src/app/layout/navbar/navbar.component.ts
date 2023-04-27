import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';
import { Categories } from 'src/app/interfaces/categories.enum';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';

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
    this.obsSubscription = this.breakpointObserver
      .observe(['(max-width:769px)'])
      .subscribe((state: BreakpointState) => {
        state.matches
          ? (this.mobileContainer = true)
          : (this.mobileContainer = false);
      });
  }

  goToComments() {
    this.router.navigate(['/'], { fragment: 'atsiliepimai' });
  }

  ngOnDestroy(): void {
    this.obsSubscription.unsubscribe();
  }
}
