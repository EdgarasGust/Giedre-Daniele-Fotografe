import { ChangeDetectorRef, Component } from '@angular/core';
import { Observable, takeUntil, Subject } from 'rxjs';
import { Swiper } from 'swiper';

import { Comment } from 'src/app/interfaces/comments.interface';
import { CommentsService } from 'src/app/services/comments.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent {
  comments$: Observable<Comment[]> = this.commentService.comments$;
  loadingComments: boolean;
  destroy$ = new Subject<boolean>();

  constructor(
    private commentService: CommentsService,
    private changeDetection: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getComments();
  }

  ngAfterViewChecked(): void {
    this.swiperConfig();
  }

  // ngAfterViewInit(): void {
  // Doesn`t work without timer
  // this.swiperConfig();
  // }

  getComments() {
    this.loadingComments = true;
    this.commentService
      .getComments()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.changeDetection.markForCheck();
          this.loadingComments = false;
        },
        error: (err) => {
          console.error(err);
          this.loadingComments = false;
        },
      });
  }

  swiperConfig() {
    const swiper = new Swiper('.swiper-one', {
      slidesPerView: 1,
      autoHeight: true,
      spaceBetween: 20,
      grabCursor: true,
      breakpoints: {
        769: {
          slidesPerView: 2,
        },
        1000: {
          slidesPerView: 3,
        },
        1300: {
          slidesPerView: 4,
        },
        1600: {
          slidesPerView: 5,
        },
        1900: {
          slidesPerView: 6,
        },
      },
    });
  }

  trackById(index: number, comment: Comment) {
    return comment.id;
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
