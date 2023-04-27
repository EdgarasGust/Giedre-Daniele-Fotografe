import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import Swiper from 'swiper';

import { Comment } from 'src/app/interfaces/comments.interface';
import { CommentsService } from 'src/app/services/comments.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentsComponent {
  comments: Comment[];

  constructor(private commentService: CommentsService) {}

  ngOnInit(): void {
    this.getComments();
  }

  ngAfterViewInit(): void {
    this.swiperConfig();
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

  getComments() {
    this.comments = this.commentService.getCommentsTemp();
  }

  trackById(index: number, comment: any) {
    return comment.id;
  }
}
