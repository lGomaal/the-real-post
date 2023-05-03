import { Component, Input, OnInit } from '@angular/core';
import { FormControl, UntypedFormControl } from '@angular/forms';
import { DatePickerConfig } from 'src/app/shared/types/date-picker.types';

@Component({
  selector: 'e-statment-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
})
export class DatePickerComponent implements OnInit {
  @Input() datePickerConfig: DatePickerConfig = {
    touchUi: false,
    startView: 'multi-year',
    clearButton: false,
    formControl: new UntypedFormControl(),
  };
  constructor() {}

  ngOnInit(): void {}

  get dateFormContorl() {
    return this.datePickerConfig.formControl as FormControl;
  }
}
