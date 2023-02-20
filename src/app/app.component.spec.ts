import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Template Demo'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges()
    const title = fixture.debugElement.query(By.css('h1')).nativeElement.textContent;
    expect(title).toEqual('Template Demo');
  });
});
