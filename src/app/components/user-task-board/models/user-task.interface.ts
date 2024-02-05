import { TaskStatus } from '../../../shared/models/types';

export interface UserTask {
  task_id: string,
  task_title: string,
  task_description: string,
  task_deadline: string,
  has_meet_deadline_benefit: boolean,
  task_status: TaskStatus,
}