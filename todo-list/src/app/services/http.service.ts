import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { IToDoItem } from '../interfaces/IToDoItem'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  url = 'http://localhost:8081/api/';

  post(todoitem: IToDoItem): Observable<IToDoItem> {
    return this.http.post<IToDoItem>(`${this.url}todos/${todoitem.id}`, todoitem);
  } 

  get(): Observable<IToDoItem[]>{
    let todoitem;
    todoitem = this.http.get<IToDoItem[]>(`${this.url}todos/`);
    return todoitem;
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.url}todos/${id}`);
  }

  patch(todoitem: IToDoItem): Observable<HttpResponse<any>>{
    return this.http.patch<any>(`${this.url}todos/${todoitem.id}`, todoitem);
  }

}
