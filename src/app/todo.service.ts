import { Injectable } from '@angular/core';
import { TodoItem } from './todo';
@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor() { }

  getTodoItems():Array<TodoItem>{
    let todoItems:Array<TodoItem>=[
    {"itemDescription":"Pick up Milk","itemCompleted":false},
    {"itemDescription":"Dr Appointment at 3:00pm","itemCompleted":false},
    {"itemDescription":"Cut the grass","itemCompleted":false},
    {"itemDescription":"Pick up Dog food","itemCompleted":false}
    ];
    return todoItems
  }
 deleteTodoItem(index:number, todoItems:Array<TodoItem>){
      todoItems.splice(index,1)
      return todoItems;
 }
 addTodoItem(todoItem:TodoItem,todoItems:Array<TodoItem>){
  todoItems.push(todoItem);
  return todoItems;
}
}