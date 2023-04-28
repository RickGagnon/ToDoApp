import { Component, OnInit } from '@angular/core';
import { TodoItem } from './todo';
import { TodoService } from './todo.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ToDoApp';
  todoItems:TodoItem[];
 
  constructor( private todoService:TodoService){
  
     
  }
ngOnInit(){
  this.todoItems = this.todoService.getTodoItems();
}
add(){
  
  var todoItem = new TodoItem(); 
  todoItem.itemDescription=(document.getElementById("newtodo") as HTMLInputElement).value;
  todoItem.itemCompleted=false;
  this.todoItems = this.todoService.addTodoItem(todoItem,this.todoItems);
  (document.getElementById("newtodo") as HTMLInputElement).value="";
  
}
delete(idx:number){
  this.todoItems = this.todoService.deleteTodoItem(idx,this.todoItems);
}
complete(idx:number){
  if (this.todoItems[idx].itemCompleted==false)
  {
    this.todoItems[idx].itemCompleted=true;
  }
  else {
    this.todoItems[idx].itemCompleted=false;
  }
}
}
