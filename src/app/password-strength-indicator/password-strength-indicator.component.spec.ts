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

  function numberOfStrengthBoxes(): number {
    return fixture.debugElement.queryAll(By.css('div.strength-box')).length;
  }

  function strengthBoxIsColored(color: string): boolean {
    const strengthBox = fixture.debugElement.query(By.css('div.strength-box'))
      .nativeElement as HTMLDivElement;
    return strengthBox.classList.contains(color);
  }

  it('should render one strength box for each point of password strength', () => {
    component.passwordStrength = 2;
    fixture.detectChanges()
    expect(numberOfStrengthBoxes()).toBe(2);
  });

  it('should color the strength boxes red if password strength is 1', () => {
    component.passwordStrength = 1;
    fixture.detectChanges()
    expect(strengthBoxIsColored('red')).toBeTrue()
  })

  it('should color the strength boxes yellow if password strength is 2', () => {
    component.passwordStrength = 2;
    fixture.detectChanges()
    expect(strengthBoxIsColored('yellow')).toBeTrue()
  })

  it('should color the strength boxes green if password strength is 3', () => {
    component.passwordStrength = 3;
    fixture.detectChanges()
    expect(strengthBoxIsColored('green')).toBeTrue()
  })
});
