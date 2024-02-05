import { AfterViewChecked, ChangeDetectionStrategy, Component, forwardRef, Input } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input-checkbox',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './input-checkbox.component.html',
  styleUrl: './input-checkbox.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputCheckboxComponent),
      multi: true,
    },
  ],
})
export class InputCheckboxComponent implements ControlValueAccessor, AfterViewChecked {
  @Input() label!: string;
  @Input() small!: boolean;
  @Input() value = false;
  @Input() control!: FormControl<any> | AbstractControl<any, any> | null;
  @Input() controlName!: string;
  @Input() checked!: boolean;
  @Input() isDisabled = false;

  constructor() {}

  ngAfterViewChecked() {
    if (this.control?.disabled) {
      this.isDisabled = true;
    }
  }

  onChange = (e: boolean) => {};
  onTouch = () => {};

  registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }

  writeValue(value: boolean) {
    this.value = value;
  }

  onModelChange(e: boolean) {
    this.value = e;

    this.onChange(e);
  }
}
