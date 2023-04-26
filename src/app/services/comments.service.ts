import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
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
import { Comments } from './temporaryCommentFile';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  private apiServer = 'https://giedredanielephotography.lt/api/';
  private comment$ = new BehaviorSubject<Comment[]>([]);
  comments$: Observable<Comment[]> = this.comment$.asObservable();

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private http: HttpClient) {}

  getCommentsTemp() {
    return Comments;
  }

  getComments(): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.apiServer + '/get_comments.php/').pipe(
      tap((res: Comment[]) => {
        this.comment$.next(res);
      }),
      retry(3),
      catchError(this.handleError)
    );
  }

  postComments(data: Comment): Observable<Comment> {
    const json = JSON.stringify(data);
    return this.http
      .post<Comment>(
        this.apiServer + '/post_comments.php/',
        json,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
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
