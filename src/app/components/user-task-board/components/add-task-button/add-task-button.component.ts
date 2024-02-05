import { Component, EventEmitter, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-add-task-button',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './add-task-button.component.html',
  styleUrl: './add-task-button.component.scss'
})
export class AddTaskButtonComponent {
  @Output() createTask = new EventEmitter<boolean>;

  onCreateTask(): void {
    this.createTask.emit();
  }
}
