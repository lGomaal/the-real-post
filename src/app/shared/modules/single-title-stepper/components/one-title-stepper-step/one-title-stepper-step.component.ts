import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'autocops-one-title-stepper-step',
  templateUrl: './one-title-stepper-step.component.html',
  styleUrls: ['./one-title-stepper-step.component.scss'],
})
export class OneTitleStepperStepComponent implements OnInit {
  @Input() isActive: boolean = false;
  @Input() stepName: string;

  constructor() {}

  ngOnInit(): void {}
}
