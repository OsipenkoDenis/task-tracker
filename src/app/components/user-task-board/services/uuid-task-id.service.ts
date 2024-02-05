import { Injectable } from '@angular/core';
import { UUID } from 'angular2-uuid';

@Injectable({
  providedIn: 'root',
})

export class UUIDTaskIdService {

  getUniqueTaskId(): string {
    return UUID.UUID();
  }
}