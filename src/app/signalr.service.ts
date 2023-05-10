import { Injectable } from '@angular/core';
import * as signalR  from '@microsoft/signalr'

@Injectable({
  providedIn: 'root'
})
export class SignalrService {

  constructor() { }


  hubConnection:signalR.HubConnection;

  startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder().withUrl('https://localhost:4200/appUpdate',{
      skipNegotiation:true,transport:signalR.HttpTransportType.WebSockets}).build();

      this.hubConnection.start().then(()=> {
        console.log("hub connection started")}).catch(err=> console.log('Error while starting connection' + err));
      
    
  }
}
