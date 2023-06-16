import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import {
  BreakpointObserver,
  BreakpointState,
  Breakpoints,
} from '@angular/cdk/layout';
import { Subject } from 'rxjs';
import { NgZone } from '@angular/core';
import { NavbarComponent } from './navbar.component';
import { Component } from '@angular/core';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { AboutComponent } from 'src/app/pages/about/about.component';
import { ContactsComponent } from 'src/app/pages/contacts/contacts.component';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

@Component({ template: '' })
class DummyGalleryComponent {}

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let breakpointObserverMock: Partial<BreakpointObserver>;
  let breakpointSubject: Subject<BreakpointState>;
  let router: Router;
  let ngZone: NgZone;

  const routes = [
    { path: '', component: HomeComponent, title: 'Pradžia' },
    { path: 'apie', title: 'Apie mane', component: AboutComponent },
    { path: 'portfolio', title: 'Portfolio', component: DummyGalleryComponent },
    { path: 'kontaktai', title: 'Kontaktai', component: ContactsComponent },
  ];

  beforeEach(async () => {
    breakpointSubject = new Subject<BreakpointState>();
    breakpointObserverMock = {
      observe: () => breakpointSubject.asObservable(),
    };

    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [NgbModule, RouterTestingModule.withRoutes(routes)],
      providers: [
        { provide: BreakpointObserver, useValue: breakpointObserverMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    ngZone = TestBed.inject(NgZone);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set mobileContainer to true when the breakpoint matches', () => {
    const breakpointState: BreakpointState = {
      breakpoints: {
        [Breakpoints.XSmall]: true,
      },
      matches: true,
    };
    breakpointSubject.next(breakpointState);
    fixture.detectChanges();

    expect(component.mobileContainer).toBe(true);
  });

  it('should set mobileContainer to false when the breakpoint does not match', () => {
    const breakpointState: BreakpointState = {
      breakpoints: {
        [Breakpoints.XSmall]: false,
      },
      matches: false,
    };
    breakpointSubject.next(breakpointState);

    fixture.detectChanges();

    expect(component.mobileContainer).toBe(false);
  });

  it('should navigate to "/" when "Pradžia" link is clicked', fakeAsync(() => {
    const link = fixture.debugElement.query(
      By.css('a[routerLink="/"]')
    ).nativeElement;

    link.click();
    tick();

    expect(router.url).toBe('/');
  }));

  it('should navigate to about-me page on link click', fakeAsync(() => {
    const link = fixture.debugElement.query(
      By.css('a[routerLink="/apie"]')
    ).nativeElement;

    link.click();
    tick();

    expect(router.url).toBe('/apie');
  }));

  it('should navigate to portfolio page on link click', fakeAsync(() => {
    const link = fixture.debugElement.query(
      By.css('a[routerLink="/portfolio"]')
    ).nativeElement;

    link.click();
    tick();

    expect(router.url).toBe('/portfolio');
  }));

  it('should navigate to comments on link click', fakeAsync(() => {
    ngZone.run(() => {
      component.goToComments('comments');
    });

    tick();
    expect(router.url).toBe('/#comments');
  }));

  it('should navigate to contacts page on link click', fakeAsync(() => {
    const link = fixture.debugElement.query(
      By.css('a[routerLink="/kontaktai"]')
    ).nativeElement;

    link.click();
    tick();

    fixture.detectChanges();
    expect(router.url).toBe('/kontaktai');
  }));
});
