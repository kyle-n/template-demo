import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { PasswordStrength } from '../models/password-strength.type';
import { fromEvent, map, Observable, tap } from 'rxjs';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements AfterViewInit {

  passwordStrength!: Observable<PasswordStrength>;

  @ViewChild('password') private readonly passwordInput!: ElementRef<HTMLInputElement>;

  constructor() { }

  ngAfterViewInit() {
    this.passwordStrength = fromEvent(this.passwordInput.nativeElement, 'input').pipe(
      map(event => {
        console.log(event)
        const passwordInput = event.target as HTMLInputElement
        return passwordInput.value
      }),
      map(password => SignupFormComponent.judgePasswordStrength(password)),
      tap(x => console.log(x, 'str'))
    )
  }

  private static judgePasswordStrength(password: string): PasswordStrength {
    let passwordStrength = 0;
    if (password.match(/\d/g)) passwordStrength++;
    if (password.match(/[A-Z]/g)) passwordStrength++;
    if (password.length >= 6) passwordStrength++;
    return passwordStrength as PasswordStrength;
  }
}
