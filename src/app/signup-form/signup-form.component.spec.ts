import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignupFormComponent } from './signup-form.component';
import { By } from '@angular/platform-browser';
import { first, noop } from 'rxjs';
import { Component, Input } from '@angular/core';
import { PasswordStrength } from '../models/password-strength.type';

@Component({
  selector: 'app-password-strength-indicator',
  template: ''
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

  it('should rate empty passwords as 0 strength', done => {
    component.passwordStrength.pipe(first()).subscribe(
      passwordStrength => expect(passwordStrength).toBe(0),
      noop,
      done
    )
    typePassword('')
  });

  it('should require at least one number', done => {
    component.passwordStrength.pipe(first()).subscribe(
      passwordStrength => expect(passwordStrength).toBe(2),
      noop,
      done
    )
    typePassword('ABCDEF')
  })

  it('should require at least one capital letter', done => {
    component.passwordStrength.pipe(first()).subscribe(
      passwordStrength => expect(passwordStrength).toBe(2),
      noop,
      done
    )
    typePassword('123456')
  })

  it('should require at least one six characters', done => {
    component.passwordStrength.pipe(first()).subscribe(
      passwordStrength => expect(passwordStrength).toBe(2),
      noop,
      done
    )
    typePassword('1234A')
  })
});
