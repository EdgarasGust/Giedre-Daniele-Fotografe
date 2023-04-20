import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { CustomerDetails } from '../interfaces/customerDetails';

@Injectable({
  providedIn: 'root',
})
export class EmailApiService {
  constructor(private http: HttpClient) {}
  api = 'https://giedredanielefotografe.lt';

  sendMail(emailDetails: CustomerDetails) {
    return this.http
      .post<CustomerDetails>(this.api, emailDetails)
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
