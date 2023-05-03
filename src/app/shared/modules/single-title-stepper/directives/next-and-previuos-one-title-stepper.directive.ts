import { OneTitleStepperService } from './../services/one-title-stepper-service/one-title-stepper.service';
import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[autocopsOneTitleStepNext], [autocopsOneTitleStepPrev]',
})
export class NextAndPreviuosOneTitleStepperDirective {
  @Input('autocopsOneTitleStepNext') next: any;
  @Input('autocopsOneTitleStepPrev') prev: any;

  constructor(private oneTitleStepperService: OneTitleStepperService) {}

  @HostListener('click', ['$event']) listen(e: any) {
    if ('next' in this) {
      this.oneTitleStepperService.nextPressed();
    }

    if ('prev' in this) {
      this.oneTitleStepperService.previousPressed();
    }
  }
}
