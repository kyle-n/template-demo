import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasswordStrengthIndicatorComponent } from './password-strength-indicator.component';
import { By } from '@angular/platform-browser';

describe('PasswordStrengthIndicatorComponent', () => {
  let component: PasswordStrengthIndicatorComponent;
  let fixture: ComponentFixture<PasswordStrengthIndicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasswordStrengthIndicatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordStrengthIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render one strength box for each point of password strength', () => {
    component.passwordStrength = 2;
    fixture.detectChanges()
    const strengthBoxes = fixture.debugElement.queryAll(By.css('div.strength-box'));
    expect(strengthBoxes.length).toBe(2);
  });

  it('should color the strength boxes red if password strength is 1', () => {
    component.passwordStrength = 1;
    fixture.detectChanges()
    const strengthBox = fixture.debugElement.query(By.css('div.strength-box'))
      .nativeElement as HTMLDivElement;
    expect(strengthBox.classList.contains('red')).toBeTrue()
  })

  it('should color the strength boxes yellow if password strength is 2', () => {
    component.passwordStrength = 2;
    fixture.detectChanges()
    const strengthBox = fixture.debugElement.query(By.css('div.strength-box'))
      .nativeElement as HTMLDivElement;
    expect(strengthBox.classList.contains('yellow')).toBeTrue()
  })

  it('should color the strength boxes green if password strength is 3', () => {
    component.passwordStrength = 3;
    fixture.detectChanges()
    const strengthBox = fixture.debugElement.query(By.css('div.strength-box'))
      .nativeElement as HTMLDivElement;
    expect(strengthBox.classList.contains('green')).toBeTrue()
  })
});
