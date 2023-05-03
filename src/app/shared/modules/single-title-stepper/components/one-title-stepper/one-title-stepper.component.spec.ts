import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneTitleStepperComponent } from './one-title-stepper.component';

describe('OneTitleStepperComponent', () => {
  let component: OneTitleStepperComponent;
  let fixture: ComponentFixture<OneTitleStepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OneTitleStepperComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OneTitleStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
