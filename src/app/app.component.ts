import { Component, OnInit,ViewEncapsulation,ViewChild } from '@angular/core';
import { Item } from './item';
import { Category } from './category';
import { UserItem } from './userItem';
import { TodoService } from './todo.service';
import { HttpClient } from '@angular/common/http';
import { CategoryItem } from './categoryItem';
import { environment} from "../environments/environment"


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
  

  constructor( private todoService:TodoService){
  this.listPage=true;
  }

  ngOnInit(){
      this.getCategoryItems()
      this.getCategories();
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
  this.todoService.addCategory(category).subscribe(()=>this.getCategories());
  (document.getElementById("newtodo") as HTMLInputElement).value="";
}
getCategories(){
  this.todoService.getCategories().subscribe(p=>this.categories=p);
}
deleteCategory(category:Category){
  this.todoService.deleteCategory(category).subscribe(()=>this.getCategories());
}
getItems(){
  this.todoService.getTodoItems().subscribe(p=>this.todoItems=p);
  
}
trackByIndexFn(index: any, item: any) {
  return index
}




// Operations to Add/Update/Remove Items
add(catId:number){
  
  var todoItem = new Item(); 
  todoItem.itemDescription=(document.getElementById("newtodo") as HTMLInputElement).value;
  todoItem.itemCompleted=false;
  todoItem.categoryId=catId
  
  this.todoService.addTodoItem(todoItem).subscribe(()=>this.getCategoryItems());
  (document.getElementById("newtodo") as HTMLInputElement).value="";
}
delete(item:Item){

  this.todoService.deleteTodoItem(item).subscribe(()=>this.getCategoryItems());
}

update(item:Item){

 if (item.itemCompleted==false)
  {
    item.itemCompleted = true;

  }
 else {
    item.itemCompleted=false;
  }
  this.todoService.updateTodoItem(item).subscribe(()=>this.getCategoryItems());
  
}




}
