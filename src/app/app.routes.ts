import { Routes } from '@angular/router';
import { RoutingPath } from './shared/models/enums';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./components/greeting-page/greeting-page.component').then((m) => m.GreetingPageComponent),
  },
  {
    path: RoutingPath.UserTaskBoard,
    loadComponent: () =>
      import('./components/user-task-board/user-task-board-layout.component').then((m) => m.UserTaskBoardLayoutComponent),
  },
];
