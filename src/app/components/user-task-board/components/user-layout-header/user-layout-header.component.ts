import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-user-layout-header',
  standalone: true,
  imports: [],
  templateUrl: './user-layout-header.component.html',
  styleUrl: './user-layout-header.component.scss'
})
export class UserLayoutHeaderComponent {
  @Output() exitApplication = new EventEmitter<boolean>();

  onExitApp(): void {
    this.exitApplication.emit();
  }
}
