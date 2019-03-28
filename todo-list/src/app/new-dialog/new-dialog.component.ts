import { Component, Inject, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IToDoItem } from '../interfaces/IToDoItem';
import { IPerson } from '../interfaces/IPerson';
import { HttpService } from '../services/http.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-new-dialog',
  templateUrl: './new-dialog.component.html',
  styleUrls: ['./new-dialog.component.css']
})
export class NewDialogComponent {
  todoItem: IToDoItem = {assignedTo: 'none', description: '', done: false};
  personItems: IPerson[];
  selectedPerson: string = 'none';
  desc: string = '';
  done: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<NewDialogComponent>, private http: HttpService,
    @Inject(MAT_DIALOG_DATA) public data: IToDoItem) {
    this.personItems = data[0];
  }

  saveToDo(desc: string) {
    console.log(this.todoItem);
    this.todoItem.assignedTo = this.selectedPerson;
    this.todoItem.description = desc;
    this.todoItem.done=this.done;
    this.postToDo(this.todoItem);
    this.dialogRef.close();
  }

  onError(error: any) {
    console.error(error);
  }

  setdesc(value: string) {
    console.log(value);
    this.desc = value;
  }

  postToDo(item: IToDoItem) {
    this.http.postTodo(item).subscribe(response => { },
      (res: HttpErrorResponse) => this.onError(res.message));
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
