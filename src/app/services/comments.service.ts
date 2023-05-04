import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  Observable,
  retry,
  tap,
  throwError,
} from 'rxjs';
import { Comment } from '../interfaces/comments.interface';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  private apiServer = 'https://giedredanielephotography.lt/api/';
  private comment$ = new BehaviorSubject<Comment[]>([]);
  comments$: Observable<Comment[]> = this.comment$.asObservable();

  constructor(private http: HttpClient) {}

  getComments(): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.apiServer + 'get_comments.php').pipe(
      tap((res: Comment[]) => {
        const reverseArray = res.reverse();
        this.comment$.next(reverseArray);
      }),
      retry(3),
      catchError(this.handleError)
    );
  }

  postComments(data: Comment) {
    return this.http
      .post(this.apiServer + 'post_comments.php', data, {
        responseType: 'text',
      })
      .pipe(retry(3), catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
