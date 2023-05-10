import { Injectable } from '@angular/core';
import * as signalR  from '@microsoft/signalr'

@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  
  hubConnection:signalR.HubConnection;

  constructor(
  ) { 

  this.hubConnection = new signalR.HubConnectionBuilder().withUrl('https://localhost:4200/appUpdate').build();
  this.hubConnection.on("ReceiveMessage", function (user,message) {
    console.log(user);

  });
  this.hubConnection.start();

  }


}
