import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneTitleStepperStepComponent } from './one-title-stepper-step.component';

describe('OneTitleStepperStepComponent', () => {
  let component: OneTitleStepperStepComponent;
  let fixture: ComponentFixture<OneTitleStepperStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OneTitleStepperStepComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OneTitleStepperStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
