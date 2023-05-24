import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { CustomerDetails } from '../interfaces/customerDetails.interface';

@Injectable({
  providedIn: 'root',
})
export class EmailApiService {
  private api: string = 'https://giedredanielephotography.lt/api/mail.php';

  constructor(private http: HttpClient) {}

  sendMail(emailDetails: CustomerDetails) {
    return this.http
      .post(this.api, emailDetails, {
        responseType: 'text',
      })
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

