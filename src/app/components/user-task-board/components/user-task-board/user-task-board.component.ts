import { CommonModule } from '@angular/common';
import { AfterContentChecked, ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { AppButtonComponent } from '../../../../shared/components/app-button/app-button.component';
import { ConfirmationDialogComponent } from '../../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { InputBasicComponent } from '../../../../shared/components/input-basic/input-basic.component';
import { InputCheckboxComponent } from '../../../../shared/components/input-checkbox/input-checkbox.component';
import { InputDatepickerComponent } from '../../../../shared/components/input-datepicker/input-datepicker.component';
import { InputSelectComponent } from '../../../../shared/components/input-select/input-select.component';
import { TextareaBasicComponent } from '../../../../shared/components/textarea-basic/textarea-basic.component';
import { TASK_STATUSES } from '../../../../shared/consts';
import { convertDate, convertDateToISO, getControl } from '../../../../shared/helpers/forms-helpers';
import { UserTask } from '../../models/user-task.interface';
import { StorageService } from '../../services/storage.service';
import { UserService } from '../../services/user.service';
import { UUIDTaskIdService } from '../../services/uuid-task-id.service';
import { AddTaskButtonComponent } from '../add-task-button/add-task-button.component';

@Component({
  selector: 'app-user-task-board',
  standalone: true,
  imports: [CommonModule, AddTaskButtonComponent, ReactiveFormsModule, InputBasicComponent,
    InputDatepickerComponent, InputCheckboxComponent, InputSelectComponent, AppButtonComponent, ConfirmationDialogComponent, TextareaBasicComponent],
  templateUrl: './user-task-board.component.html',
  styleUrl: './user-task-board.component.scss'
})
export class UserTaskBoardComponent implements AfterContentChecked {
  taskParametersForm!: FormGroup;
  selectedTask!: UserTask;
  taskId = '';
  userTasks$: Observable<UserTask[]>;
  hasMeetDeadlineBenefit = false;
  TASK_STATUSES = [...TASK_STATUSES];
  isCreatingTask = false;
  delayDeleteTask = 5;

  getControl = getControl;
  convertDate = convertDate;
  convertDateToISO = convertDateToISO;

  taskParametersFormReadOnly = new BehaviorSubject(false);

   constructor(private fb: FormBuilder,
               private userService: UserService,
               private UUIDTaskIdService: UUIDTaskIdService,
               private storageService: StorageService,
               private cdr: ChangeDetectorRef,
               private dialog: MatDialog,) {
     this.userTasks$ = this.storageService.getTasksData();

     this.taskParametersForm = this.fb.group({
       task_title: [null, [Validators.required, Validators.maxLength(20)]],
       task_description: [null, [Validators.required, Validators.maxLength(200)],
       ],
       task_deadline: [null, Validators.required],
       has_meet_deadline_benefit: [null],
       task_status: [null, [Validators.required]],
     });
   }

  onSelectTask(task: UserTask): void {
    this.taskParametersFormReadOnly.next(true);
    this.selectedTask = { ...task };
    this.selectedTask.task_deadline = convertDateToISO(this.selectedTask.task_deadline);
    this.taskId = this.selectedTask?.task_id as string;

    this.taskParametersForm.patchValue(this.selectedTask, { emitEvent: false });
    this.hasMeetDeadlineBenefit = this.selectedTask.has_meet_deadline_benefit;
    this.taskParametersForm.updateValueAndValidity({ emitEvent: false });
  }

  onCreateTask(): void {
    const dialog = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        messageOne:
          'Вы действительно хотите добавить новую задачу?',
        confirmButton: true,
      },
      maxWidth: 500,
    });

    dialog.afterClosed().pipe(take(1)).subscribe((result) => {
      if (result.event === 'submit') {
        this.isCreatingTask = true;
        this.taskParametersFormReadOnly.next(true);
      }
    });
  }

  onUpdateTask(): void {
    const task: UserTask = { ...this.taskParametersForm.value, task_id: this.selectedTask?.task_id };
    task.task_deadline = this.convertDate(task.task_deadline);
    this.storageService.updateTask(task);

    this.userTasks$ = this.storageService.getTasksData();
    this.taskParametersFormReadOnly.next(false);
    this.resetForm();
    this.selectedTask = null;
  }

  deleteTask(taskId: string, event: Event) {
    event.stopPropagation();
    const dialog = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        messageOne:
          'Вы действительно хотите удалить задачу?',
        confirmButton: true,
        delayTime: this.delayDeleteTask,
      },
      maxWidth: 500,
    });

    dialog.afterClosed().pipe(take(1),
    ).subscribe((result) => {
      if (result.event === 'submit') {
        this.storageService.deleteTask(taskId);
        this.userTasks$ = this.storageService.getTasksData();
        this.taskParametersFormReadOnly.next(false);
        this.resetForm();
        this.selectedTask = null;
      }
    });
  }

  toggleMeetDeadlineBenefit(e: Event): void {
    this.hasMeetDeadlineBenefit = (e.target as HTMLInputElement).checked;
  }

  ngAfterContentChecked() {
    this.cdr.detectChanges();
  }

  createTask() {
     const createdTask: UserTask = {...this.taskParametersForm.value, task_id: this.UUIDTaskIdService.getUniqueTaskId()};
     createdTask.task_deadline = this.convertDate(createdTask.task_deadline);
     this.storageService.addTask(createdTask);
     this.userTasks$ = this.storageService.getTasksData();
     this.taskParametersFormReadOnly.next(false);
     this.isCreatingTask = false;
     this.resetForm();
     this.selectedTask = null;
   }

  onCanselProcessingTaskParams(): void {
    this.taskParametersFormReadOnly.next(false);
    this.resetForm();
    this.selectedTask = null;
    this.isCreatingTask = false;
  }

  resetForm(): void {
    this.taskParametersForm.reset();
    this.taskParametersForm.updateValueAndValidity({emitEvent: false});
  }
}
