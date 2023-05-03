import { AbstractControl } from '@angular/forms';
type DatePickerStartVeiw = 'month' | 'year' | 'multi-year';

export interface DatePickerConfig {
  touchUi: boolean;
  startView: DatePickerStartVeiw;
  clearButton: boolean;
  formControl: AbstractControl;
  maxLimit?: Date;
  minLimit?: Date;
}
