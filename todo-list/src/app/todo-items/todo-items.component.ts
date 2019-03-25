import { Component, OnInit } from '@angular/core';
import { HttpService } from './../services/http.service';
import { IToDoItem, ToDoItem } from '../interfaces/IToDoItem'
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-todo-items',
  templateUrl: './todo-items.component.html',
  styleUrls: ['./todo-items.component.css']
})
export class TodoItemsComponent implements OnInit {

  todoItems: IToDoItem[] = [];

  constructor(private http: HttpService) { }

  ngOnInit() {
    this.getItems();
  }

  onError(error: any) {
    console.error(error);
  }

  getItems() {
    this.http.get().subscribe((data: ToDoItem[]) => {
      this.todoItems = data;
    }, (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  setDone(item: IToDoItem) {
    if (item.done) {
      item.done = false;
    } else {
      item.done = true;
    }

    this.http.patch(item).subscribe(response => { },
      (res: HttpErrorResponse) => this.onError(res.message), () => this.getItems());
  }

  deleteItem(id: number) {
    this.http.delete(id).subscribe(response => { },
      (res: HttpErrorResponse) => this.onError(res.message), () => this.getItems());
  }

  editItem() {
    //TODO
  }

}
