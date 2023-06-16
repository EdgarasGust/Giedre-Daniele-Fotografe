import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http';

import { EmailApiService } from './email-api.service';
import { CustomerDetails } from '../interfaces/customerDetails.interface';

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

  it('should log an error message when status is 0', () => {
    const consoleErrorSpy = spyOn(console, 'error');
    const errorResponse: HttpErrorResponse = new HttpErrorResponse({
      error: 'network error',
      status: 0,
    });

    service.handleError(errorResponse);

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'An error occurred:',
      'network error'
    );
  });

  it('should log an error message when status is 500', () => {
    const consoleErrorSpy = spyOn(console, 'error');
    const errorResponse: HttpErrorResponse = new HttpErrorResponse({
      error: 'some error',
      status: 500,
    });

    service.handleError(errorResponse);

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Backend returned code 500, body was: ',
      'some error'
    );
  });

  it('should return a throwError observable', () => {
    const errorResponse: HttpErrorResponse = new HttpErrorResponse({
      error: 'some error',
      status: 500,
    });

    spyOn(service, 'handleError').and.callThrough();

    service.handleError(errorResponse).subscribe({
      error: (error) =>
        expect(error).toEqual(
          new Error('Something bad happened; please try again later.')
        ),
    });
  });
});
