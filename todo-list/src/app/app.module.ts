import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatCardModule, MatSidenavModule, MatButtonModule, MatIconModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TodoItemsComponent } from './todo-items/todo-items.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoItemsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatCardModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [MatToolbarModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
