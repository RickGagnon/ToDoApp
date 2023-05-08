import { Injectable } from '@angular/core';
import { Item } from './item';
import { Category } from './category';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserItem } from './userItem';
import { environment} from "../environments/environment"



  const httpOptions = {
    headers:new HttpHeaders({
      'Access-COntrol-Allow-Origin':'*'
     })
  }



@Injectable({
  providedIn: 'root'
})
export class TodoService {




  constructor(private http:HttpClient) { 

    
  }

getUserItems():Observable<UserItem[]>{
  //return this.http.get<UserItem[]>("https://atesstodoapi.azurewebsites.net/api/item/useritems")
  return this.http.get<UserItem[]>(environment.apiUrl + "item",httpOptions);
}


  getTodoItems():Observable<Item[]>{
    return this.http.get<Item[]>(environment.apiUrl + "item",httpOptions);//"https://atesstodoapi.azurewebsites.net/api/item")
/*     let todoItems:Array<TodoItem>=[
    {"itemDescription":"Pick up Milk","itemCompleted":false},
    {"itemDescription":"Dr Appointment at 3:00pm","itemCompleted":false},
    {"itemDescription":"Cut the grass","itemCompleted":false},
    {"itemDescription":"Pick up Dog food","itemCompleted":false}
    ]; */
    //return todoItems
  }
 deleteTodoItem(index:number):Observable<Item[]>{
  return this.http.delete<Item[]>(environment.apiUrl + "item"+index,httpOptions);
  
 }
 addTodoItem(todoItem:Item){
  return this.http.post<Item>(environment.apiUrl + "item",todoItem,httpOptions);

}



updateTodoItem(todoItem:Item):Observable<Item>{
  return this.http.put<Item>(environment.apiUrl + "item"+todoItem.itemId,todoItem,httpOptions);

}
}