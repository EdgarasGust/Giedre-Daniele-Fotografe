import { Component, Output } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { CommentsService } from 'src/app/services/comments.service';

@Component({
  selector: 'app-comments-form',
  templateUrl: './comments-form.component.html',
  styleUrls: ['./comments-form.component.scss'],
})
export class CommentsFormComponent {
  @Output() close = new Subject<boolean>();
  formSubmitted = false;
  isLoading = false;
  message = '';
  name = '';
  commentSbs: Subscription;

  commentForm = this.fb.group({
    name: ['', Validators.required],
    comment: ['', Validators.required],
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
    this.commentService.postComments(this.commentForm.value).subscribe({
      next: () => {
        this.formSubmitted = true;
        this.message = 'Ačiū už Jūsų paliktą atsiliepimą';
        this.isLoading = false;
        this.updateComments();
      },
      error: (err) => {
        this.formSubmitted = true;
        this.message =
          'Tinklo klaida, bandykite dar karta. Atsiprašome už nepatogumus.';
        console.error(err);
        this.isLoading = false;
      },
    });
  }

  updateComments() {
    // this.commentSbs = this.commentService.getComments().subscribe();
    console.log('updateComments called');
  }

  onThankYouComponentClose() {
    this.close.next(true);
    this.formSubmitted = false;
    this.message = '';
    this.name = '';
  }

  ngOnDestroy(): void {
    // this.commentSbs.unsubscribe();
  }
}
