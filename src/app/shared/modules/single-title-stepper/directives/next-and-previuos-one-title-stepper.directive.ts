import { OneTitleStepperService } from './../services/one-title-stepper-service/one-title-stepper.service';
import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[trpOneTitleStepNext], [trpOneTitleStepPrev]',
})
export class NextAndPreviuosOneTitleStepperDirective {
  @Input('trpOneTitleStepNext') next: unknown;
  @Input('trpOneTitleStepPrev') prev: unknown;

  constructor(private oneTitleStepperService: OneTitleStepperService) {}

  @HostListener('click', ['$event']) listen() {
    if ('next' in this) {
      this.oneTitleStepperService.nextPressed();
    }

    if ('prev' in this) {
      this.oneTitleStepperService.previousPressed();
    }
  }
}
