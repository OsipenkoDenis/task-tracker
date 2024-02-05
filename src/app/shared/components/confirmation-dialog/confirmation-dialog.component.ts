import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { AppButtonComponent } from '../app-button/app-button.component';

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [AppButtonComponent, MatDialogModule, MatIcon],
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.scss'
})
export class ConfirmationDialogComponent {
  public time = 0;
  private interval: any;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      messageOne: string;
      confirmButton: boolean;
      delayTime: number;
      buttonTitle: string;
    },
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
  ) {}

  ngOnInit(): void {
    if (this.data.delayTime) {
      this.startTimer();
    }
  }

  startTimer() {
    this.time = this.data.delayTime;

    this.interval = setInterval(() => {
      this.time--;
      if (this.time === 0) {
        this.time = 0;
        clearInterval(this.interval);
      }
    }, 1000);
  }

  onConfirmAction() {
    this.dialogRef.close({ event: 'submit' });
  }
}
