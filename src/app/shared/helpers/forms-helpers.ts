import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import moment from 'moment/moment';

export const getControl = (form: FormGroup | AbstractControl, control: string): FormControl => {
  return form.get(control) as FormControl;
};

export const convertDate = (date: string): string => {
  return moment(date, 'YYYY-MM-DD').format('DD-MM-YYYY');
};

export const convertDateToISO = (date: string): string => {
  return moment(date, 'DD-MM-YYYY').format('YYYY-MM-DD');
};