import { Component } from '@angular/core';
import { UserLayoutHeaderComponent } from './components/user-layout-header/user-layout-header.component';
import { UserTaskBoardComponent } from './components/user-task-board/user-task-board.component';
import { UserService } from './services/user.service';

@Component({
  selector: 'user-task-board-layout',
  standalone: true,
  imports: [UserLayoutHeaderComponent, UserTaskBoardComponent],
  templateUrl: './user-task-board-layout.component.html',
  styleUrl: './user-task-board-layout.component.scss'
})
export class UserTaskBoardLayoutComponent {
  constructor(private userService: UserService) {
  }

  onAppExit(): void {
    this.userService.signOut();
  }
}
