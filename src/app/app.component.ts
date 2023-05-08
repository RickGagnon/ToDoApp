import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { Item } from './item';
import { Category } from './category';
import { UserItem } from './userItem';
import { TodoService } from './todo.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  
})
export class AppComponent {
  title = 'ToDoApp';
  todoItems:Item[]=[];
  categories:Category[]=[];
  userItems:UserItem[] = []
 
  constructor( private todoService:TodoService){
  
     
  }
ngOnInit(){
  //this.getItems();
  this.getUserItems();
  
}
getUserItems(){
  this.todoService.getUserItems().subscribe(p=>this.userItems=p);

}
getItems(){
  this.todoService.getTodoItems().subscribe(p=>this.todoItems=p);
  
}
add(){
  
  var todoItem = new Item(); 
  todoItem.itemDescription=(document.getElementById("newtodo") as HTMLInputElement).value;
  todoItem.itemCompleted=false;
  this.todoService.addTodoItem(todoItem).subscribe(p=>this.todoItems.push(p));
  (document.getElementById("newtodo") as HTMLInputElement).value="";
  this.getUserItems();
  
  
}
delete(item:Item){
  
  this.todoService.deleteTodoItem(item.itemId).subscribe(()=>this.getItems());
  
}
update(idx:number,item:Item){
 if (this.todoItems[idx].itemCompleted==false)
  {
    this.todoItems[idx].itemCompleted = true;
    
  }
 else {
    this.todoItems[idx].itemCompleted=false;
  }
  this.todoService.updateTodoItem(this.todoItems[idx]).subscribe(()=>this.getItems());
  
}
}
