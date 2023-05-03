import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { Item } from './item';
import { TodoService } from './todo.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  
})
export class AppComponent {
  title = 'ToDoApp';
  todoItems?:Item[]=[];
 
  constructor( private todoService:TodoService){
  this.todoItems=[];
     
  }
ngOnInit(){
  this.todoService.getTodoItems().subscribe(p=>this.todoItems=p);
  this.resetfocus();
}
add(){
  
  var todoItem = new Item(); 
  todoItem.itemDescription=(document.getElementById("newtodo") as HTMLInputElement).value;
  todoItem.itemCompleted=false;
  this.todoItems = this.todoService.addTodoItem(todoItem,this.todoItems);
  (document.getElementById("newtodo") as HTMLInputElement).value="";
  this.resetfocus()
  
}
delete(item:Item){
  
  this.todoService.deleteTodoItem(item.itemId).subscribe(p=>this.todoItems=p);
  this.resetfocus();
}
complete(idx:number){
 if (this.todoItems[idx].itemCompleted==false)
  {
    this.todoItems[idx].itemCompleted = true;
  }
 else {
    this.todoItems[idx].itemCompleted=false;
  }
  this.resetfocus();
}



resetfocus(){
  document.getElementById("newtodo").focus();
}
}
