import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { of, throwError } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { CommentsService } from 'src/app/services/comments.service';
import { CommentsFormComponent } from './comments-form.component';
import { ThankYouComponent } from 'src/app/components/thank-you/thank-you.component';

describe('CommentsFormComponent', () => {
  let component: CommentsFormComponent;
  let fixture: ComponentFixture<CommentsFormComponent>;
  let commentService: CommentsService;
  let sendButton: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommentsFormComponent, ThankYouComponent],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        MatProgressSpinnerModule,
      ],
      providers: [CommentsService],
    }).compileComponents();

    fixture = TestBed.createComponent(CommentsFormComponent);
    component = fixture.componentInstance;
    commentService = TestBed.inject(CommentsService);
    sendButton =
      fixture.debugElement.nativeElement.querySelector('#send-button');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit and validate the comment form, call the postComment() method and the name to be form name', () => {
    component.commentForm.controls['name'].setValue('Ed');
    component.commentForm.controls['comment'].setValue('Test comment');
    component.commentForm.controls['termsConditions'].setValue(true);

    sendButton.click();
    expect(component.commentForm.valid).toBeTruthy();

    spyOn(component, 'postComment');
    component.onSubmit();

    expect(component.name).toBe('Ed');
    expect(component.postComment).toHaveBeenCalled();
    expect(component.postComment).toHaveBeenCalledTimes(1);
  });

  it('should reset the form if the form is invalid', () => {
    component.commentForm.controls['name'].setValue('Ed');
    component.commentForm.controls['comment'].setValue('Test comment');
    component.commentForm.controls['termsConditions'].setValue(false);

    component.onSubmit();

    expect(component.commentForm.valid).toBeFalsy();
    expect(component.commentForm.value.name).toBe('');
    expect(component.commentForm.value.comment).toBe('');
    expect(component.commentForm.value.termsConditions).toBe(false);
  });

  it('should update the form submitted state and message', () => {
    expect(component.formSubmitted).toBe(false);
    expect(component.message).toBe('');

    spyOn(commentService, 'postComments').and.returnValue(of('success'));
    spyOn(component, 'updateComments');
    component.postComment();

    expect(component.formSubmitted).toBe(true);
    expect(component.message).toBe('Ačiū už Jūsų paliktą atsiliepimą');
    expect(component.updateComments).toHaveBeenCalled();
  });

  it('should set isLoading to true when postComment is called and then to false on success', () => {
    expect(component.isLoading).toBe(false);

    component.postComment();
    expect(component.isLoading).toBe(true);

    spyOn(commentService, 'postComments').and.returnValue(of('success'));
    component.postComment();

    expect(component.isLoading).toBe(false);
  });

  it('should set isLoading to true when postComment is called and then to false on error', () => {
    const errorMessage =
      'Tinklo klaida, bandykite dar kartą. Atsiprašome už nepatogumus.';

    component.postComment();
    expect(component.isLoading).toBe(true);

    spyOn(commentService, 'postComments').and.returnValue(
      throwError(() => errorMessage)
    );
    component.postComment();

    expect(component.isLoading).toBe(false);
    expect(component.message).toBe(
      'Tinklo klaida, bandykite dar kartą. Atsiprašome už nepatogumus.'
    );
  });

  it('should next true to close Obs, set formSubmitted to false and clear the strings ', () => {
    spyOn(commentService, 'postComments').and.returnValue(of('success'));
    component.postComment();
    expect(component.formSubmitted).toBe(true);

    component.close.subscribe((val: boolean) => {
      expect(val).toBe(true);
    });

    component.onThankYouComponentClose();
    expect(component.formSubmitted).toBe(false);
    expect(component.message).toBe('');
    expect(component.name).toBe('');
    component.close.next(true);
    component.close.unsubscribe();
  });
});
