import { Injectable } from '@angular/core';
import { Item } from './item';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http:HttpClient) { }

  getTodoItems():Observable<Item[]>{
    return this.http.get<Item[]>("https://atesstodoapi.azurewebsites.net/api/item")
/*     let todoItems:Array<TodoItem>=[
    {"itemDescription":"Pick up Milk","itemCompleted":false},
    {"itemDescription":"Dr Appointment at 3:00pm","itemCompleted":false},
    {"itemDescription":"Cut the grass","itemCompleted":false},
    {"itemDescription":"Pick up Dog food","itemCompleted":false}
    ]; */
    //return todoItems
  }
 deleteTodoItem(index:number):Observable<Item[]>{
  return this.http.delete<Item[]>("https://atesstodoapi.azurewebsites.net/api/item/"+index);
  
 }
 addTodoItem(todoItem:Item){
  return this.http.post<Item>("https://atesstodoapi.azurewebsites.net/api/item",todoItem);

}
updateTodoItem(todoItem:Item):Observable<Item>{
  return this.http.put<Item>("https://atesstodoapi.azurewebsites.net/api/item/"+todoItem.itemId,todoItem);

}
}