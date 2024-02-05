import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppButtonComponent } from '../../shared/components/app-button/app-button.component';
import { RoutingPath } from '../../shared/models/enums';

@Component({
  selector: 'app-greeting-page',
  standalone: true,
  imports: [AppButtonComponent],
  templateUrl: './greeting-page.component.html',
  styleUrl: './greeting-page.component.scss',
})
export class GreetingPageComponent {

  constructor(private router: Router) {
  }

  onMovetoTaskBoardPage(): void {
    this.router.navigate([RoutingPath.UserTaskBoard]);
  }
}
