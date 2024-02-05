import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Input } from '@angular/core';
import { FormControl, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-textarea-basic',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './textarea-basic.component.html',
  styleUrl: './textarea-basic.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextareaBasicComponent),
      multi: true,
    },
  ]
})
export class TextareaBasicComponent {
  @Input() style: 'filled' | 'underline' = 'filled';
  @Input() label!: string;
  @Input() value!: string;
  @Input() titleCasePipe!: boolean;
  @Input() control!: FormControl;
  @Input() controlName!: string;
  @Input() initialTouched = false;
  @Input() rows: string = '7';

  disabled = false;
  status: 'success' | 'danger' = 'success';

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewChecked() {
    if (this.initialTouched) this.onControlTouch();
  }

  statusChange() {
    this.status = this.control?.errors === null ? 'success' : 'danger';
  }

  public onChange: Function = () => {};
  public onTouched: Function = () => {};

  public registerOnChange(fn: Function): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: Function): void {
    this.onTouched = fn;
  }

  public writeValue(value: string) {
    this.value = value || +value === 0 ? value : this.value;
    this.cdr.markForCheck();
  }

  public onModelChange(e: Event) {
    this.value = (e.target as HTMLInputElement).value;

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
