import { Injectable } from '@angular/core';
import { Item } from './item';
import { Category } from './category';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserItem } from './userItem';
import { environment} from "../environments/environment"
import { CategoryItem } from './categoryItem';


@Injectable({
  providedIn: 'root'
})
export class TodoService {
  constructor(private http:HttpClient) { 
  }

  getTodoItems():Observable<Item[]>{
    return this.http.get<Item[]>(environment.apiUrl + "item");//"https://atesstodoapi.azurewebsites.net/api/item")
  }
 deleteTodoItem(item:Item):Observable<Item[]>{
  return this.http.delete<Item[]>(environment.apiUrl + "item/"+item.itemId);
 }
 addTodoItem(todoItem:Item){
  return this.http.post<Item>(environment.apiUrl + "item",todoItem);
}
updateTodoItem(todoItem:Item):Observable<Item>{
  return this.http.put<Item>(environment.apiUrl + "item/"+todoItem.itemId,todoItem);
}
getCategoryItems():Observable<CategoryItem[]>{
  //return this.http.get<UserItem[]>("https://atesstodoapi.azurewebsites.net/api/item/useritems")
  return this.http.get<CategoryItem[]>(environment.apiUrl + "category/categoryitems");
}
getCategories():Observable<Category[]>{
  return this.http.get<Category[]>(environment.apiUrl + "category");//"https://atesstodoapi.azurewebsites.net/api/item")
}
addCategory(category:Category){
  return this.http.post<Category>(environment.apiUrl + "category",category);
}
deleteCategory(cat:Category):Observable<Category>{
  return this.http.delete<Category>(environment.apiUrl + "category/"+cat.categoryId);
 }

}