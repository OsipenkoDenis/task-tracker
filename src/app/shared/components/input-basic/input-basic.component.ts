import { CommonModule } from '@angular/common';
import { AfterViewChecked, ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input-basic',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './input-basic.component.html',
  styleUrl: './input-basic.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputBasicComponent),
      multi: true,
    },
    ]
})
export class InputBasicComponent implements ControlValueAccessor, AfterViewChecked {
  @Input() style: 'filled' | 'underline' = 'filled';
  @Input() label!: string;
  @Input() value!: string;
  @Input() titleCasePipe!: boolean;
  @Input() control!: FormControl;
  @Input() controlName!: string;
  @Input() initialTouched = false;
  @Input() type: string = 'text';

  disabled = false;
  status: 'success' | 'danger' = 'success';

  constructor(private cdr: ChangeDetectorRef) {}

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
    this.value = value || +value === 0 ? value : this.value;
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
