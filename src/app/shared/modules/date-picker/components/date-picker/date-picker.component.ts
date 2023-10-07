import { Component, Input } from '@angular/core';
import { FormControl, UntypedFormControl } from '@angular/forms';
import { DatePickerConfig } from 'src/app/shared/types/date-picker.types';

@Component({
  selector: 'trp-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
})
export class DatePickerComponent {
  @Input() datePickerConfig: DatePickerConfig = {
    touchUi: false,
    startView: 'multi-year',
    clearButton: false,
    formControl: new UntypedFormControl(),
  };

  get dateFormContorl() {
    return this.datePickerConfig.formControl as FormControl;
  }
}
