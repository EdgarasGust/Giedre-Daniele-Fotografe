import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ContactsComponent } from './contacts.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EmailApiService } from 'src/app/services/email-api.service';
import { of, throwError } from 'rxjs';

describe('ContactsComponent', () => {
  let component: ContactsComponent;
  let fixture: ComponentFixture<ContactsComponent>;
  let emailService: EmailApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContactsComponent],
      imports: [HttpClientModule, ReactiveFormsModule],
      providers: [EmailApiService],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactsComponent);
    emailService = TestBed.inject(EmailApiService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit and validate the contact form, call the sendEmail() method and the name to be form name', () => {
    component.contactForm.controls['name'].setValue('Ed');
    component.contactForm.controls['email'].setValue('edgaras@gmail.com');
    component.contactForm.controls['tel'].setValue + '447413656777';
    component.contactForm.controls['question'].setValue('Test message');
    component.contactForm.controls['termsConditions'].setValue(true);

    const sendButton =
      fixture.debugElement.nativeElement.querySelector('#send-button');

    sendButton.click();
    expect(component.contactForm.valid).toBeTruthy();

    spyOn(component, 'sendEmail');
    component.onSubmit();
    expect(component.name).toBe('Ed');
    expect(component.sendEmail).toHaveBeenCalled();
    expect(component.sendEmail).toHaveBeenCalledTimes(1);
  });

  it('should be Falsy form', () => {
    component.contactForm.controls.name.setValue('');
    component.contactForm.controls.email.setValue('');
    component.contactForm.controls.tel.setValue(null);
    component.contactForm.controls.question.setValue('');
    expect(component.contactForm.valid).toBeFalsy();
  });

  it('should set is loading to true then formSubmitted to true and isLoading to false on successful email send', () => {
    component.sendEmail();
    expect(component.isLoading).toBe(true);

    spyOn(emailService, 'sendMail').and.returnValue(
      of('Email sent successfully')
    );
    component.sendEmail();

    expect(component.formSubmitted).toBeTrue();
    expect(component.isLoading).toBeFalse();
    expect(component.message).toEqual(
      'Ačių už Jūsų laišką. Į Jūsų klausimus atsakysime, kaip galėdami greičiau!'
    );
  });

  it('should set formSubmitted to true and isLoading to false on email send error', () => {
    spyOn(emailService, 'sendMail').and.returnValue(
      throwError(() => new Error('error'))
    );
    component.sendEmail();

    expect(component.formSubmitted).toBeTrue();
    expect(component.isLoading).toBeFalse();
    expect(component.message).toEqual(
      'Atsiprašome įvyko klaida. Bandykite dar kartą.'
    );
  });
});
