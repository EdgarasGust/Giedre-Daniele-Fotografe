import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { EmailApiService } from 'src/app/services/email-api.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent {
  formSubmitted = false;
  isLoading = false;
  message = '';
  name = '';

  contactForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', { validators: [Validators.required, Validators.email] }],
    tel: [null],
    message: ['', Validators.required],
    termsConditions: [false, Validators.pattern('true')],
  });
  constructor(
    private emailService: EmailApiService,
    private fb: NonNullableFormBuilder
  ) {}

  onSubmit() {
    if (this.contactForm.invalid) {
      this.contactForm.reset();
      return;
    } else {
      this.name = this.contactForm.value.name ?? '';
      this.sendEmail();
      this.contactForm.reset();
    }
  }

  sendEmail() {
    this.isLoading = true;
    this.emailService.sendMail(this.contactForm.value).subscribe({
      next: () => {
        this.formSubmitted = true;
        this.isLoading = false;
        this.message = `Ačių ${this.contactForm.controls.name.value} už Jūsų laišką. Į Jūsų klausimus atsakysime, kaip galėdami greičiau!`;
      },
      error: (err) => {
        this.formSubmitted = true;
        this.isLoading = false;
        console.error(err);
        this.message = 'Atsiprašome įvyko klaida. Bandykite dar kartą.';
      },
    });
  }
}
