import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { TodoItem } from './todo';
import { TodoService } from './todo.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  
})
export class AppComponent {
  title = 'ToDoApp';
  todoItems?:TodoItem[]=[];
 
  constructor( private todoService:TodoService){
  this.todoItems=[];
     
  }
ngOnInit(){
  this.todoService.getTodoItems().subscribe(p=>this.todoItems=p);
}
add(){
  
  var todoItem = new TodoItem(); 
  todoItem.itemDescription=(document.getElementById("newtodo") as HTMLInputElement).value;
  todoItem.itemCompleted=false;
  //this.todoItems = this.todoService.addTodoItem(todoItem,this.todoItems?);
  
}
delete(idx:number){
  //this.todoItems = this.todoService.deleteTodoItem(idx,this.todoItems);
}
complete(idx:number){
  //if (this.todoItems?[idx]?.itemCompleted==false)
  {
    //this.todoItems[idx].itemCompleted=true;
  }
  //else {
    //this.todoItems[idx].itemCompleted=false;
  //}
}
}
