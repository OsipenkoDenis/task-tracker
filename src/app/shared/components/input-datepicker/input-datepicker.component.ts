import { AfterViewChecked, ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import moment from 'moment/moment';

@Component({
  selector: 'app-input-datepicker',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './input-datepicker.component.html',
  styleUrl: './input-datepicker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputDatepickerComponent),
      multi: true,
    },
  ],
})
export class InputDatepickerComponent implements ControlValueAccessor, AfterViewChecked {
  @Input() style: 'filled' | 'underline' = 'filled';
  @Input() label!: string;
  @Input() value!: string;
  @Input() control!: FormControl;
  @Input() initialTouched = false;
  @Input() hasError = false;
  @Input() minDate = '';

  disabled = false;
  status: 'success' | 'danger' = 'success';

  maxDate: string;

  constructor(private cdr: ChangeDetectorRef) {
    const currentDate = new Date();
    this.minDate = moment(currentDate).format('YYYY-MM-DD');
  }

  ngAfterViewChecked() {
    if (this.initialTouched) this.onControlTouch();
  }

  statusChange() {
    this.status = this.control?.errors === null ? 'success' : 'danger';
  }

  onChange: Function = () => {};
  onTouched: Function = () => {};

  registerOnChange(fn: Function): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: Function): void {
    this.onTouched = fn;
  }

  writeValue(value: string) {
    this.value = value;
    this.cdr.markForCheck();
  }

  onModelChange(e: Event) {
    this.value = (e.target as HTMLInputElement).value;

    this.onChange(this.value);
    this.statusChange();
  }

  onControlTouch() {
    this.onTouched();
    this.statusChange();
  }

  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }
}
