import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignupFormComponent } from './signup-form.component';
import { By } from '@angular/platform-browser';
import { Component, Input } from '@angular/core';
import { PasswordStrength } from '../models/password-strength.type';

@Component({
  selector: 'app-password-strength-indicator',
  template: '<div id="password-strength">{{ passwordStrength }}</div>'
})
class PasswordStrengthIndicatorStubComponent {
  @Input() passwordStrength: PasswordStrength | null = null;
}

describe('SignupFormComponent', () => {
  let component: SignupFormComponent;
  let fixture: ComponentFixture<SignupFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        SignupFormComponent,
        PasswordStrengthIndicatorStubComponent
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  function typePassword(password: string): void {
    const passwordInput = fixture.debugElement
      .query(By.css('#password-input'))
      .nativeElement as HTMLInputElement;

    passwordInput.value = password
    passwordInput.dispatchEvent(new Event('input'))
  }

  function passwordStrength(): PasswordStrength {
    const passwordStrengthDisplayDiv = fixture.debugElement.query(By.css('#password-strength'))
      .nativeElement as HTMLDivElement;
    const textContent = passwordStrengthDisplayDiv.textContent?.trim() ?? ''
    return Number(textContent) as PasswordStrength
  }

  it('should rate empty passwords as 0 strength', () => {
    typePassword('')
    fixture.detectChanges()
    expect(passwordStrength()).toBe(0)
  });

  it('should require at least one number', () => {
    typePassword('ABCDEF')
    fixture.detectChanges()
    expect(passwordStrength()).toBe(2)
  })

  it('should require at least one capital letter', () => {
    typePassword('123456')
    fixture.detectChanges()
    expect(passwordStrength()).toBe(2)
  })

  it('should require at least one six characters', () => {
    typePassword('1234A')
    fixture.detectChanges()
    expect(passwordStrength()).toBe(2)
  })
});
