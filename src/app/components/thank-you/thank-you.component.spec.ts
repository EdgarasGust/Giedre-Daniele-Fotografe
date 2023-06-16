import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ThankYouComponent } from './thank-you.component';

describe('ThankYouComponent', () => {
  let component: ThankYouComponent;
  let fixture: ComponentFixture<ThankYouComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ThankYouComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ThankYouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set name and message inputs correctly', () => {
    component.name = 'John';
    component.message = 'Thank you for your feedback';
    fixture.detectChanges();

    const nameElement = fixture.debugElement.query(
      By.css('#name')
    ).nativeElement;
    const messageElement = fixture.debugElement.query(
      By.css('#message')
    ).nativeElement;

    expect(nameElement.textContent).toBe('John');
    expect(messageElement.textContent).toBe('Thank you for your feedback');
  });

  it('should emit false when onClose is called', () => {
    spyOn(component.close, 'next');
    component.onClose();

    expect(component.close.next).toHaveBeenCalledWith(false);
    expect(component.name).toBe('');
    expect(component.message).toBe('');
  });
});
