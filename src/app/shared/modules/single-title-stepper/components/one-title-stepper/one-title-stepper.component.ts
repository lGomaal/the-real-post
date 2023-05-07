import { OneTitleStepperService } from './../../services/one-title-stepper-service/one-title-stepper.service';
import {
  AfterViewInit,
  Component,
  ContentChildren,
  Input,
  QueryList,
} from '@angular/core';
import { OneTitleStepperStepComponent } from '../one-title-stepper-step/one-title-stepper-step.component';

@Component({
  selector: 'e-statment-one-title-stepper',
  templateUrl: './one-title-stepper.component.html',
  styleUrls: ['./one-title-stepper.component.scss'],
  providers: [OneTitleStepperService],
})
export class OneTitleStepperComponent implements AfterViewInit {
  @ContentChildren(OneTitleStepperStepComponent)
  stepperSteps: QueryList<OneTitleStepperStepComponent> = new QueryList<OneTitleStepperStepComponent>();

  @Input() backLink = '';
  @Input() set goTo(stepNumber: number) {
    this.oneTitleStepperService.goToStep(stepNumber);
  }

  constructor(public oneTitleStepperService: OneTitleStepperService) {}

  ngAfterViewInit() {
    if (this.stepperSteps) {
      this.oneTitleStepperService._stepComponentList$.next(this.stepperSteps);
    }
  }
}
