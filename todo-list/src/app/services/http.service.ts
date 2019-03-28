import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { IToDoItem } from '../interfaces/IToDoItem';
import { IPerson } from '../interfaces/IPerson';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  url = 'http://localhost:8081/api/';

  postTodo(todoitem: IToDoItem): Observable<IToDoItem> {
    return this.http.post<IToDoItem>(`${this.url}todos/`, todoitem);
  }

  getToDo(): Observable<IToDoItem[]> {
    return this.http.get<IToDoItem[]>(`${this.url}todos/`);
  }

  deleteTodo(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.url}todos/${id}`);
  }

  patchTodo(todoitem: IToDoItem): Observable<HttpResponse<any>> {
    return this.http.patch<any>(`${this.url}todos/${todoitem.id}`, todoitem);
  }

  getPerson(): Observable<IPerson[]> {
    return this.http.get<IPerson[]>(`${this.url}people/`);
  }

}
