import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { OneTitleStepperComponent } from './components/one-title-stepper/one-title-stepper.component';
import { OneTitleStepperStepComponent } from './components/one-title-stepper-step/one-title-stepper-step.component';
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { NextAndPreviuosOneTitleStepperDirective } from './directives/next-and-previuos-one-title-stepper.directive';

@NgModule({
  declarations: [
    OneTitleStepperComponent,
    OneTitleStepperStepComponent,
    NextAndPreviuosOneTitleStepperDirective,
  ],
  imports: [CommonModule, NgbProgressbarModule, RouterModule],
  exports: [
    OneTitleStepperComponent,
    OneTitleStepperStepComponent,
    NextAndPreviuosOneTitleStepperDirective,
  ],
})
export class SingleTitleStepperModule {}
