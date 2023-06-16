import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { HomeComponent } from './home.component';
import { CommentsComponent } from '../comments/comments.component';
import { CommentsFormComponent } from '../comments/comments-form/comments-form.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent, CommentsComponent, CommentsFormComponent],
      imports: [
        HttpClientTestingModule,
        MatProgressSpinnerModule,
        ReactiveFormsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have truthy images array', () => {
    expect(component.images).toBeTruthy();
  });

  it('should only contain strings in the array', () => {
    expect(
      component.images.every((img) => {
        return (
          typeof img.imageDescription === 'string' &&
          typeof img.image === 'string'
        );
      })
    ).toBeTrue();
  });

  it('should toggle formHidden on button click', () => {
    const button = fixture.debugElement.nativeElement.querySelector('#button');
    expect(component.formHidden).toBe(true); // initial state
    button.click();
    fixture.detectChanges();
    expect(component.formHidden).toBe(false);
    button.click();
    fixture.detectChanges();
    expect(component.formHidden).toBe(true);
  });
});
