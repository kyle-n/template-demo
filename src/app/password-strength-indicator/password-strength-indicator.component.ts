import { Component, Input } from '@angular/core';
import { PasswordStrength } from '../models/password-strength.type';

@Component({
  selector: 'app-password-strength-indicator',
  templateUrl: './password-strength-indicator.component.html',
  styleUrls: ['./password-strength-indicator.component.css']
})
export class PasswordStrengthIndicatorComponent {
  @Input() passwordStrength: PasswordStrength | null = null;

  get strengthColorCssClass(): string {
    switch (this.passwordStrength) {
      case 0:
        return 'red';
      case 1:
        return 'red'
      case 2:
        return 'yellow';
      case 3:
        return 'green'
      default:
        return '';
    }
  }

  get arrayForNgFor(): number[] {
    let numberOfBoxes = this.passwordStrength ?? 0;
    return new Array(numberOfBoxes).fill(0)
  }
}
