import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Todo } from '../_models/todo';
import {map, take, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  // todo = new BehaviorSubject<Todo[]>([])
  // todo$=this.todo.asObservable();

  todoList : Todo[]; 
  
  constructor(
    private http:HttpClient) { }

  readonly APIUrl="https://localhost:44334/api";

  //Get All TODOS
  
  getTodos()
  {
    return this.http.get<Todo[]>(this.APIUrl+'/Todo');
  }

  //POST a Todo
  addTodo(todo:any)
  {
    return this.http.post<Todo>(this.APIUrl+'/Todo',todo)  
  }

  //PUT a Todo
  editTodo(todo:any)
  {
    return this.http.put<Todo>(this.APIUrl+'/Todo/'+todo.id,todo);
  }

  //DELETE a Todo
  deleteTodo(id:any){
    return this.http.delete<Todo>(this.APIUrl+'/Todo/'+id)
  }
}
