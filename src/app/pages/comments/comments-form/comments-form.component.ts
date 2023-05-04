import { Component, OnDestroy, Output } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { NonNullableFormBuilder, Validators } from '@angular/forms';

import { CommentsService } from 'src/app/services/comments.service';

@Component({
  selector: 'app-comments-form',
  templateUrl: './comments-form.component.html',
  styleUrls: ['./comments-form.component.scss'],
})
export class CommentsFormComponent implements OnDestroy {
  private destroy$ = new Subject<boolean>();
  @Output() close = new Subject<boolean>();
  formSubmitted = false;
  isLoading = false;
  message = '';
  name = '';

  commentForm = this.fb.group({
    name: ['', Validators.required],
    comment: ['', Validators.required],
    termsConditions: [false, Validators.pattern('true')],
  });

  constructor(
    private fb: NonNullableFormBuilder,
    private commentService: CommentsService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.commentForm.invalid) {
      this.commentForm.reset();
      return;
    } else {
      this.name = this.commentForm.value.name ?? '';
      this.postComment();
      this.commentForm.reset();
    }
  }

  postComment() {
    this.isLoading = true;
    this.commentService
      .postComments(this.commentForm.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.formSubmitted = true;
          this.message = 'Ačiū už Jūsų paliktą atsiliepimą';
          this.isLoading = false;
          this.updateComments();
        },
        error: (err) => {
          this.formSubmitted = true;
          this.message =
            'Tinklo klaida, bandykite dar kartą. Atsiprašome už nepatogumus.';
          console.error(err);
          this.isLoading = false;
        },
      });
  }

  updateComments() {
    this.commentService
      .getComments()
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  onThankYouComponentClose() {
    this.close.next(true);
    this.formSubmitted = false;
    this.message = '';
    this.name = '';
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
