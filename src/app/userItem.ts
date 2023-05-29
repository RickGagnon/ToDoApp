import { Category } from "./category";
import { Item } from "./item";

export class UserItem {
  categoryId:number;
  categoryName:string;
  
  items:Item[];
}