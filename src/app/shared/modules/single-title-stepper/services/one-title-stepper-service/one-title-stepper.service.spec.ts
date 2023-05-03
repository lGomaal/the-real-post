import { TestBed } from '@angular/core/testing';

import { OneTitleStepperService } from './one-title-stepper.service';

describe('OneTitleStepperService', () => {
  let service: OneTitleStepperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OneTitleStepperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
