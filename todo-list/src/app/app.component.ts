import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from './services/http.service';
import { IPerson } from './interfaces/IPerson';
import { HttpErrorResponse } from '@angular/common/http';
import { TodoItemsComponent } from './todo-items/todo-items.component';
import { NewDialogComponent } from './new-dialog/new-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  personItems: IPerson[] = [];
  selectedPerson = 'none';
  selectedDone = 'true';

  constructor(private http: HttpService, public dialog: MatDialog) { }

  @ViewChild(TodoItemsComponent) child: TodoItemsComponent;

  updateList() {
    this.child.filterToDoItems(this.selectedPerson, this.selectedDone);
  }

  ngOnInit() {
    this.getItems();
  }

  onError(error: any) {
    console.error(error);
  }

  openDialog(): void {
    const dialogData = [this.personItems];
    const dialogRef = this.dialog.open(NewDialogComponent, {
      width: '250px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe((result: IPerson) => {
    },(res: HttpErrorResponse) => this.onError(res.message), () => this.updateList());
  }

  getItems() {
    this.http.getPerson().subscribe((data: IPerson[]) => {
      this.personItems = data;
    }, (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

}
