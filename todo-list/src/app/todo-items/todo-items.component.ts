import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { HttpService } from './../services/http.service';
import { IToDoItem } from '../interfaces/IToDoItem';
import { IPerson } from '../interfaces/IPerson';
import { HttpErrorResponse } from '@angular/common/http';
import { EditDialogComponent } from './../edit-dialog/edit-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-todo-items',
  templateUrl: './todo-items.component.html',
  styleUrls: ['./todo-items.component.css']
})
export class TodoItemsComponent implements OnInit {

  todoItems: IToDoItem[] = [];
  todoItemsFiltered: IToDoItem[] = [];
  personItems: IPerson[] = [];
  personfilter = 'none';
  donefilter = 'true';

  constructor(private http: HttpService, public dialog: MatDialog) { }

  ngOnInit() {
    this.getItems();
  }

  filterToDoItems(personfilter: string, donefilter: string) {
    this.personfilter = personfilter;
    this.donefilter = donefilter;
    const args = [];
    args[0] = this.personfilter;
    args[1] = this.donefilter;
    this.todoItemsFiltered = this.todoItems.filter(this.todoFilter, args);
  }

  todoFilter(value) {
    const args = String(this);
    const arge = args.split(',');
    const name = `${value.assignedTo}`;
    const done = `${value.done}`;
    console.log();
    if (arge[0] === name && done === arge[1]) {
      console.log('1: ' + arge[0] + name + ' ' + arge[1] + done);
      return value;
    } else if (arge[0] === 'none' && done === arge[1]) {
      console.log('2: ' + arge[0] + name + ' ' + arge[1] + done);
      return value;
    }

  }

  onError(error: any) {
    console.error(error);
  }

  getItems() {
    this.http.getToDo().subscribe((data: IToDoItem[]) => {
      this.todoItems = data;
    }, (res: HttpErrorResponse) => this.onError(res.message), () => this.filterToDoItems(this.personfilter, this.donefilter)
    );
    this.http.getPerson().subscribe((data: IPerson[]) => {
      this.personItems = data;
    }, (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  openDialog(todo: IToDoItem, people: IPerson[]): void {
    const dialogData = [todo, people];
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '250px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe((result: IToDoItem) => {
      this.getItems();
    });
  }

  setDone(item: IToDoItem) {
    if (item.done) {
      item.done = false;
    } else {
      item.done = true;
    }

    this.http.patchTodo(item).subscribe(response => { },
      (res: HttpErrorResponse) => this.onError(res.message), () => this.getItems());
  }

  deleteItem(id: number) {
    this.http.deleteTodo(id).subscribe(response => { },
      (res: HttpErrorResponse) => this.onError(res.message), () => { this.getItems(); });
  }

  editItem(todo: IToDoItem) {
    this.openDialog(todo, this.personItems);
  }

}
