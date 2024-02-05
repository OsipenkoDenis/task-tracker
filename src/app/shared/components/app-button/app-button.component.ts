import { Component, Input } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { ButtonColor } from '../../models/types';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [MatButton],
  templateUrl: './app-button.component.html',
  styleUrl: './app-button.component.scss'
})
export class AppButtonComponent {
  @Input() title!: string | number;
  @Input() color: ButtonColor = 'primary';
  @Input() disabled = false;
}
