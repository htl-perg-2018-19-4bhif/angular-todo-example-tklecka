import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatToolbarModule,
  MatCardModule,
  MatSidenavModule,
  MatButtonModule,
  MatIconModule,
  MatFormFieldModule,
  MatSelectModule,
  MatDialogModule
} from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TodoItemsComponent } from './todo-items/todo-items.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { NewDialogComponent } from './new-dialog/new-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoItemsComponent,
    EditDialogComponent,
    NewDialogComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatCardModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    NgbModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule
  ],
  exports: [MatToolbarModule],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [EditDialogComponent,NewDialogComponent]
})
export class AppModule { }
