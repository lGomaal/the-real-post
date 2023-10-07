import { Component, Input } from '@angular/core';

@Component({
  selector: 'trp-one-title-stepper-step',
  templateUrl: './one-title-stepper-step.component.html',
  styleUrls: ['./one-title-stepper-step.component.scss'],
})
export class OneTitleStepperStepComponent {
  @Input() isActive = false;
  @Input() stepName = '';
}
