import { Component, Inject, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IToDoItem } from '../interfaces/IToDoItem';
import { IPerson } from '../interfaces/IPerson';
import { HttpService } from '../services/http.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent {
  todoItem: IToDoItem;
  personItems: IPerson[];
  selectedPerson: string;
  desc: string;

  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>, private http: HttpService,
    @Inject(MAT_DIALOG_DATA) public data: IToDoItem) {
    this.todoItem = data[0];
    this.personItems = data[1];
    this.selectedPerson = data[0].assignedTo;
    this.desc = data[0].description;
  }

  updateItem() {
    this.todoItem.assignedTo = this.selectedPerson;
  }

  saveToDo(desc: string) {
    this.todoItem.description = desc;
    this.updateToDo(this.todoItem);
    this.dialogRef.close();
  }

  onError(error: any) {
    console.error(error);
  }

  setdesc(value: string) {
    console.log(value);
    this.desc = value;
  }

  updateToDo(item: IToDoItem) {
    this.http.patchTodo(item).subscribe(response => { },
      (res: HttpErrorResponse) => this.onError(res.message));
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
