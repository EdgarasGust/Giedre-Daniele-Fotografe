import { Component, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.scss'],
})
export class ThankYouComponent {
  @Input() name: string = '';
  @Input() message: string = '';
  @Output() close = new Subject<boolean>();

  onClose() {
    this.close.next(false);
    this.name = '';
    this.message = '';
  }
}
