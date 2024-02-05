import { AfterViewChecked, ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input-select',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './input-select.component.html',
  styleUrl: './input-select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputSelectComponent),
      multi: true,
    },
  ],
})
export class InputSelectComponent implements ControlValueAccessor, AfterViewChecked {
  @Input() list: string[] = [];
  @Input() style: 'filled' | 'underline' = 'filled';
  @Input() label!: string;
  @Input() placeholder!: string;
  @Input() value!: string;
  @Input() control!: FormControl;
  @Input() initialTouched = false;
  @Input() disabled = false;
  @Input() allowEmptyValue = false;

  status: 'success' | 'danger' = 'success';

  constructor(private cdr: ChangeDetectorRef) {}

  statusChange() {
    this.status = this.control?.errors === null ? 'success' : 'danger';
  }

  ngAfterViewChecked() {
    if (this.initialTouched) this.onControlTouch();
  }

  public onChange: Function = () => {};
  public onTouched: Function = () => {
  };

  public registerOnChange(fn: Function): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: Function): void {
    this.onTouched = fn;
  }

  public writeValue(value: string) {
    this.value = value;
    this.cdr.markForCheck();
  }

  public onModelChange(e: string) {
    this.value = e;

    this.onTouched();
    this.onChange(this.value);
    this.statusChange();
  }

  public onControlTouch() {
    this.onTouched();
    this.statusChange();
  }

  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }
}
