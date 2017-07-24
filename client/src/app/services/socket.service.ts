import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import * as io from 'socket.io-client';

@Injectable()
export class SocketService {
  private socket: SocketIOClient.Socket;
  constructor() {
  }
  connect(user){
    this.socket = io('http://192.168.1.86:3000', {query: {userId:user}});
  }
  sendMessage(rooms: string[], message : customTypes.Message, conversation: string){
    this.socket.emit('sendMessage', {rooms, message, conversation});
  }
  acceptFriendRequest(contactId : string, user: customTypes.contactInfo){
    this.socket.emit('acceptFriendRequest',{room: contactId, contact: user});
  }
  sendFriendRequest(contactId: string, user: customTypes.contactInfo){
    this.socket.emit('sendFriendRequest', {room: contactId, contact: user});
  }
  UserIsTyping(participants: string[], conversation: string, contact: customTypes.contactInfo){
    this.socket.emit('typing',{rooms: participants, info:{conversation, contact}});
  }
  UserStopTyping(participants: string[], conversation: string, contact: customTypes.contactInfo){
    this.socket.emit('stopTyping', {rooms: participants, info:{conversation, contact}});
  }
  incomingFriendRequest(){
    let observable : Observable<any> = new Observable(observer =>{
      this.socket.on('incomingFriendRequest',(data)=>{
        observer.next(data);
      });
      return ()=>{
        this.socket.disconnect();
      }
    });
    return observable;
  }
  incomingUserTyping(){
    let observable : Observable<any> = new Observable(observer =>{
      this.socket.on('userIsTyping',(data)=>{
        observer.next(data);
      });
      return ()=>{
        this.socket.disconnect();
      }
    });
    return observable;
  }
  incomingUserStopTyping(){
    let observable : Observable<any> = new Observable(observer =>{
      this.socket.on('userStopTyping',(data)=>{
        observer.next(data);
      });
      return ()=>{
        this.socket.disconnect();
      }
    });
    return observable;
  }
  getMessage(){
    let observable : Observable<any> = new Observable(observer =>{
      this.socket.on('message', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }
  getAcceptedFriendRequests(){
    let observable : Observable<any> = new Observable(observer =>{
      this.socket.on('acceptedFriendRequest',(data : customTypes.contactInfo)=>{
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }
  disconnect(){
    this.socket.disconnect();
  }
}