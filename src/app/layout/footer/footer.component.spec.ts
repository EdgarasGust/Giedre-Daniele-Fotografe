import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { FooterComponent } from './footer.component';
import { AboutComponent } from 'src/app/pages/about/about.component';
import { ContactsComponent } from 'src/app/pages/contacts/contacts.component';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { Component } from '@angular/core';

@Component({ template: '' })
class DummyGalleryComponent {}

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  let router: Router;

  const routes = [
    { path: '', component: HomeComponent, title: 'Pradžia' },
    { path: 'apie', title: 'Apie mane', component: AboutComponent },
    { path: 'portfolio', title: 'Portfolio', component: DummyGalleryComponent },
    { path: 'kontaktai', title: 'Kontaktai', component: ContactsComponent },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)],
      declarations: [FooterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should be equal to currentYear`, () => {
    const currentYear = new Date().getFullYear();
    expect(component.currentYear).toEqual(currentYear);
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

  it('should navigate to contacts page on link click', fakeAsync(() => {
    const link = fixture.debugElement.query(
      By.css('a[routerLink="/kontaktai"]')
    ).nativeElement;

    link.click();
    tick();
    expect(router.url).toBe('/kontaktai');
  }));
});
