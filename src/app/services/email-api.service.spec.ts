import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { EmailApiService } from './email-api.service';
import { CustomerDetails } from '../interfaces/customerDetails.interface';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

describe('EmailApiService', () => {
  let service: EmailApiService;
  let httpTestingController: HttpTestingController;
  const api = 'https://giedredanielephotography.lt/api/mail.php';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EmailApiService],
    });
    service = TestBed.inject(EmailApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should send email with customer details', () => {
    const customerDetails: CustomerDetails = {
      name: 'Ed',
      email: 'edgarasgustaitis@gmail.com',
      tel: +447413656777,
      message: 'Hello, this is a test message',
    };

    service.sendMail(customerDetails).subscribe((response) => {
      expect(response).toBe('Email sent successfully');
    });

    const request = httpTestingController.expectOne(api);
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual(customerDetails);

    request.flush('Email sent successfully');
  });
  /////////////////
  // it('should handle HttpErrorResponse with status code 0', () => {
  //   const errorResponse: HttpErrorResponse = {
  //     status: 0,
  //     error: new ErrorEvent('network error'),
  //   };

  //   const throwErrorSpy = spyOn(throwError(), 'subscribe');

  //   const result = service.handleError(errorResponse);

  //   expect(console.error).toHaveBeenCalledWith(
  //     'An error occurred:',
  //     errorResponse.error
  //   );
  //   expect(throwErrorSpy).toHaveBeenCalled();
  // });

  // it('should handle HttpErrorResponse with status code > 0', () => {
  //   const errorResponse: HttpErrorResponse = {
  //     status: 500,
  //     error: { message: 'Internal Server Error' },
  //   };

  //   const throwErrorSpy = spyOn(throwError(), 'subscribe');

  //   const result = service.handleError(errorResponse);

  //   expect(console.error).toHaveBeenCalledWith(`Backend returned code ${errorResponse.status}, body was: `, errorResponse.error);
  //   expect(throwErrorSpy).toHaveBeenCalled();
  // });
});
////////////////////////
// import { HttpErrorResponse } from '@angular/common/http';
// import { TestBed } from '@angular/core/testing';
// import { EmailApiService } from './email-api.service';
// import { throwError } from 'rxjs';

// describe('EmailApiService', () => {
//   let service: EmailApiService;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       providers: [EmailApiService],
//     });
//     service = TestBed.inject(EmailApiService);
//   });

//   it('should handle HttpErrorResponse with status code 0', () => {
//     const errorResponse: HttpErrorResponse = {
//       status: 0,
//       error: new ErrorEvent('network error'),
//     };

//     const throwErrorSpy = spyOn(throwError(), 'subscribe');

//     const result = service.handleError(errorResponse);

//     expect(console.error).toHaveBeenCalledWith('An error occurred:', errorResponse.error);
//     expect(throwErrorSpy).toHaveBeenCalled();
//   });

//   it('should handle HttpErrorResponse with status code > 0', () => {
//     const errorResponse: HttpErrorResponse = {
//       status: 500,
//       error: { message: 'Internal Server Error' },
//     };

//     const throwErrorSpy = spyOn(throwError(), 'subscribe');

//     const result = service.handleError(errorResponse);

//     expect(console.error).toHaveBeenCalledWith(`Backend returned code ${errorResponse.status}, body was: `, errorResponse.error);
//     expect(throwErrorSpy).toHaveBeenCalled();
//   });
// });
