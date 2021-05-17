import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Subscription } from 'rxjs';
import { Todo } from '../_models/todo';
import { TodoService } from '../_services/todo.service';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';



@Component({
  selector: 'app-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.css']
})
export class TodoCardComponent implements OnInit {

  todos:Todo[]=[];
  completedTodos:Todo[]=[];
  todoForm: FormGroup;
  countTodo:number=0;
  isCompleted=false;
  editTodo=false;
  selectedIndex=null;

  constructor(
    private fb:FormBuilder,
    private todoService:TodoService,
    private toastr:ToastrService) { }

  ngOnInit(): void {
    this.todoForm=this.fb.group({
      todoNote: ["",Validators.required]
    });
    this.getTodos();
  }

  //Gets all Todos
  getTodos()
  {
    this.todoService.getTodos().subscribe(todos=>
      {
        this.todos=todos;
        this.countTodo=this.todos.length;
      });
  }

  //Adds a new Todo
  addTodo()
  {
    var val={
      id:0,
      todoNote:this.todoForm.value.todoNote,
    }
    console.log(val);
    
    this.todoService.addTodo(val).subscribe(()=>
     {  
        this.getTodos();
        console.log(this.todos);
        this.toastr.success('Todo added successfully');
        this.todoForm.reset();
     });
    
  }

  editToggle(i)
  {
    this.selectedIndex=i;
    console.log(i);
    this.editTodo=!this.editTodo;
  }

  //Updates a Todo
  updateTodo(todo,i)
  {
    this.selectedIndex=i;
    var val={
      id:todo.id,
      todoNote:todo.todoNote,
    }  
    
    this.todoService.editTodo(val).subscribe(()=>
    {
      this.getTodos();
      console.log(todo.todoNote);
      this.toastr.success('Todo updated successfully');
      this.editTodo=!this.editTodo;
    })
  }

  //Deletes a Todo
  delete(id)
  {
    
    if(confirm("Are you sure?")){
     this.todoService.deleteTodo(id).subscribe(()=>{
      this.getTodos();
      console.log("deleted");
      this.toastr.success('Todo deleted successfully');
     });} 
  }

  //Adds Todos to completedTodos array if check marked as completed.
  completeTodo(event:MatCheckboxChange,todo,i)
  {
    if(event.checked){
      this.completedTodos.push(todo);
      this.isCompleted=true;
    }
    else{
      this.completedTodos.pop();
      this.isCompleted=false;
    }
    
    console.log(this.completedTodos);
    console.log(event.checked);
  }

}
