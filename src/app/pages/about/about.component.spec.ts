import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AboutComponent } from './about.component';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AboutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have h3 tag with text "About me"', () => {
    const h3 = fixture.nativeElement.querySelector('#page-heading');
    expect(h3.textContent).toBe('Labas, aš Giedrė,');
  });

  it('should have a truthy image source', () => {
    const img = fixture.nativeElement.querySelector('img');
    expect(img.src).toBeTruthy();
  });
});
