import { BehaviorSubject, skip, Subscription, take } from 'rxjs';
import {
  Injectable,
  OnDestroy,
  QueryList,
  ChangeDetectorRef,
} from '@angular/core';
import { OneTitleStepperStepComponent } from '../../components/one-title-stepper-step/one-title-stepper-step.component';

@Injectable()
export class OneTitleStepperService implements OnDestroy {
  private _currentStep$ = new BehaviorSubject<number>(1);
  private _loadingPercent$ = new BehaviorSubject<number>(0);

  public _stepComponentList$ = new BehaviorSubject<
    QueryList<OneTitleStepperStepComponent>
  >(new QueryList());

  public _StepTitle$ = new BehaviorSubject<string>('Step');
  public _numberOfSteps$ = new BehaviorSubject<number>(0);
  public currentStep$ = this._currentStep$.asObservable();
  public loadingPercent$ = this._loadingPercent$.asObservable();

  public subscriptions: Subscription[] = [];
  constructor(private changeDetectorRef: ChangeDetectorRef) {
    // listen to the incoming steps component list for the stepper and initialize the current step.
    this._stepComponentList$.pipe(skip(1), take(1)).subscribe(() => {
      this._numberOfSteps$.next(this._stepComponentList$.value.length);
      this.initialCurrentStep();
    });

    const currentStepSub = this._currentStep$.subscribe(currentStep => {
      this._stepComponentList$.value.forEach((element, index) => {
        if (index === currentStep - 1) {
          element.isActive = true;
          this._StepTitle$.next(element.stepName);
        } else {
          element.isActive = false;
        }
      });
    });

    this.subscriptions.push(currentStepSub);
  }

  nextPressed(): void {
    const currentStepValue = this._currentStep$.value;
    const numberOfSteps = this._numberOfSteps$.value;

    if (currentStepValue < numberOfSteps) {
      this.goToStep(currentStepValue + 1);
    } else {
      // todo: here we need some kind of refresh.
      this.goToStep(1);
    }
  }

  previousPressed(): void {
    const currentStepValue = this._currentStep$.value;
    if (currentStepValue > 1) {
      this.goToStep(currentStepValue - 1);
    }
  }

  goToStep(stepNumber: number): void {
    if (
      stepNumber <= this._stepComponentList$.value.length &&
      stepNumber >= 1
    ) {
      this._currentStep$.next(stepNumber);
      this.setLoadingPercentage();
    }
  }

  private initialCurrentStep(): void {
    const stepComponents = this._stepComponentList$.value;

    stepComponents.forEach((component, index) => {
      if (component.isActive) {
        this._currentStep$.next(index + 1);
        this._StepTitle$.next(component.stepName);
        this.setLoadingPercentage();

        // look at https://angular.io/errors/NG0100 for knowing why we do this
        this.changeDetectorRef.detectChanges();
      }
    });
  }

  private setLoadingPercentage(): void {
    const percent = 100 / this._numberOfSteps$.value;
    const actualCurrentPrecentage = percent * this._currentStep$.value;

    this._loadingPercent$.next(actualCurrentPrecentage);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
