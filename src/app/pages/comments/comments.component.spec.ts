import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { CommentsComponent } from './comments.component';
import { CommentsService } from 'src/app/services/comments.service';

describe('CommentsComponent', () => {
  let component: CommentsComponent;
  let fixture: ComponentFixture<CommentsComponent>;
  let commentService: CommentsService;
  let spy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommentsComponent],
      imports: [HttpClientModule, MatProgressSpinnerModule],
      providers: [CommentsService],
    }).compileComponents();

    fixture = TestBed.createComponent(CommentsComponent);
    component = fixture.componentInstance;
    commentService = TestBed.inject(CommentsService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an empty comments array', () => {
    component.comments$.subscribe((comments) => {
      expect(comments).toEqual([]);
    });
  });

  it('should have an empty errorMsg string', () => {
    expect(component.errorMsg).toEqual('');
  });

  it('should handle error and set error message', () => {
    const errorMessage = 'Test error message';
    const error = { message: errorMessage };

    spyOn(commentService, 'getComments').and.returnValue(
      throwError(() => error)
    );

    component.getComments();

    expect(commentService.getComments).toHaveBeenCalled();

    expect(component.errorMsg).toContain('Įvyko klaida: Test error message');
  });

  it('should update comments$ observable', () => {
    const comments = [
      {
        id: 1,
        name: 'John',
        comment: 'Hello',
      },
    ];

    spy = spyOn(commentService, 'getComments').and.returnValue(of(comments));

    commentService.getComments().subscribe((comments) => {
      expect(comments).toEqual(comments);
    });

    expect(spy).toHaveBeenCalled();

    component.comments$
      .pipe(takeUntil(component.destroy$))
      .subscribe((comments) => {
        expect(comments).toEqual(comments);
      });

    component.destroy$.next(true);
    component.destroy$.subscribe((res) => {
      expect(res).toBeTrue();
    });
  });

  it('should call swiperConfig method', () => {
    spy = spyOn(component, 'swiperConfig');

    component.ngAfterViewChecked();

    expect(spy).toHaveBeenCalled();
  });
});
