import { TestBed } from '@angular/core/testing';
import { CommentsService } from './comments.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { of } from 'rxjs';

import { Comment } from '../interfaces/comments.interface';

describe('CommentsService', () => {
  let service: CommentsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CommentsService],
    });
    service = TestBed.inject(CommentsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be empty array', () => {
    service.comments$.subscribe((response) => {
      expect(response).toEqual([]);
    });
  });

  it('should emit comments array', () => {
    const testComments: Comment[] = [
      {
        id: 1,
        name: 'John',
        comment: 'Hello',
      },
      {
        id: 2,
        name: 'Jane',
        comment: 'Hi',
      },
    ];

    let spy = spyOn(service, 'getComments').and.returnValue(of(testComments));

    service.getComments().subscribe({
      next: (comments) => {
        service['comment$'].next(comments);
      },
    });

    service.comments$.subscribe((comments) => {
      expect(comments).toEqual(testComments);
    });

    expect(service.getComments).toHaveBeenCalledTimes(1);
  });

  it('should post comment', () => {
    const comment: Comment = {
      name: 'Ed',
      comment: 'Hello, this is a test message',
    };

    service.postComments(comment).subscribe((response) => {
      expect(response).toBe('Comment posted successfully');
    });

    const request = httpTestingController.expectOne(
      'https://giedredanielephotography.lt/api/post_comments.php'
    );
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual(comment);

    request.flush('Comment posted successfully');
  });

  it('should get comments', () => {
    const comment: Comment = {
      id: 1,
      name: 'Ed',
      comment: 'Hello, this is a test message',
    };

    service.getComments().subscribe((response) => {
      expect(response).toEqual([comment]);
    });

    const request = httpTestingController.expectOne(
      'https://giedredanielephotography.lt/api/get_comments.php'
    );

    expect(request.request.method).toBe('GET');

    request.flush([comment]);
  });
});
