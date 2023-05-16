import { Component, OnInit,ViewEncapsulation,ViewChild } from '@angular/core';
import { Item } from './item';
import { Category } from './category';
import { UserItem } from './userItem';
import { TodoService } from './todo.service';
import { HttpClient } from '@angular/common/http';
import { CategoryItem } from './categoryItem';
import { environment} from "../environments/environment"
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';


import  * as signalR from '@microsoft/signalr';
import { connect } from 'rxjs';



@Component({
  selector: 'app-root', 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  
})
export class AppComponent {




  title = 'ToDoApp';
  todoItems:Item[]=[];
  categories:Category[]=[];
  categoryItems:CategoryItem[] = []
  listPage:boolean;
  private hubConnectionBuilder!: HubConnection;

  constructor( private todoService:TodoService){
  this.listPage=true;
  }

  ngOnInit(){
      this.getCategoryItems();
      this.getCategories();
      this.hubConnectionBuilder = new HubConnectionBuilder().withUrl(environment.apiUrl + "todohub").configureLogging(LogLevel.Information).build();
        this.hubConnectionBuilder.start().then(() => console.log('Connection started.......!')).catch(err => console.log('Error while connect with server'));
        this.hubConnectionBuilder.on('ReceiveNewTodoItem', (result: any) => {
          console.log("activated function");
          this.getCategoryItems();
          this.getCategories();
        });
  }


getCategoryItems(){
  this.todoService.getCategoryItems().subscribe(p=>this.categoryItems=p);
}


// allow to show different page using same doc
showList(){
  this.getCategoryItems();
  this.listPage=true; 
}
showCategories(){
  this.listPage=false;
this.getCategories();
}


// Operations for Add/Remove Category
addCategory(){
  var category = new Category(); 
  
  category.categoryName=(document.getElementById("newtodo") as HTMLInputElement).value;
  category.categoryId=0;
  category.items=[]; 
  this.todoService.addCategory(category).subscribe(() => (this.refreshUsers()));
  (document.getElementById("newtodo") as HTMLInputElement).value="";
}
getCategories(){
  this.todoService.getCategories().subscribe(p=>this.categories=p);
}
deleteCategory(category:Category){
  this.todoService.deleteCategory(category).subscribe(() => (this.refreshUsers()));
}
getItems(){
  this.todoService.getTodoItems().subscribe(p=>this.todoItems=p);
  
}
trackByIndexFn(index: any, item: any) {
  return index
}
 refreshUsers(){
  this.hubConnectionBuilder.send("NotifyNewTodoItem").then(() => (console.log("sent notification")));
 }


// Operations to Add/Update/Remove Items
add(catItems:CategoryItem){
  
  var todoItem = new Item(); 
  todoItem.itemDescription=(document.getElementById("newtodo") as HTMLInputElement).value;
  todoItem.itemCompleted=false;
  todoItem.categoryId=catItems.categoryId
  
  this.todoService.addTodoItem(todoItem).subscribe(() => (this.refreshUsers()));
  (document.getElementById("newtodo") as HTMLInputElement).value="";
}
delete(item:Item){

  this.todoService.deleteTodoItem(item).subscribe(() => (this.refreshUsers()));
}

update(item:Item){

 if (item.itemCompleted==false)
  {
    item.itemCompleted = true;

  }
 else {
    item.itemCompleted=false;
  }
  this.todoService.updateTodoItem(item).subscribe(() => (this.refreshUsers()));
  
}




}
