import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import * as io from 'socket.io-client';

@Injectable()
export class SocketService {
  private socket: SocketIOClient.Socket;
  private observables: {[key : string]: Observable<any> } = {};
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
  UserIsTyping(rooms: string[], conversation: string, contact: customTypes.contactInfo){
    this.socket.emit('typing',{rooms, conversation, contact});
  }
  UserStopTyping(rooms: string[], conversation: string, contact: customTypes.contactInfo){
    this.socket.emit('stopTyping', {rooms, conversation, contact});
  }
  newConversation(conversation: customTypes.conversationInfo, rooms: string[]){
    this.socket.emit('newConversation', {conversation, rooms});
  }
  sendMyStatus(rooms : string[], userId: string, status: boolean){
    this.socket.emit('sendStatus', {rooms, userId, status});
  }
  respondMyStatus(room: string, userId: string, status: boolean){
    this.socket.emit('respondStatus', {room, userId, status});
  }
  incomingConversation(){
    this.observables['incomingConversation'] = this.observables['incomingConversation'] ||
    this.createObservableForSocket('incomingConversation');
    return this.observables['incomingConversation'];
  }
  incomingFriendRequest(){
   this.observables['incomingFriendRequest'] = this.observables['incomingFriendRequest'] || 
   this.createObservableForSocket('incomingFriendRequest');
    return this.observables['incomingFriendRequest'];
  }
  incomingUserTyping(){
    this.observables['userIsTyping'] = this.observables['userIsTyping'] || 
    this.createObservableForSocket('userIsTyping');
    return this.observables['userIsTyping'];
  }
  incomingUserStopTyping(){
    this.observables['userStopTyping'] = this.observables['userStopTyping'] || 
    this.createObservableForSocket('userStopTyping');
    return this.observables['userStopTyping'];
  }
  incomingUserStatus(){
    this.observables['userStatus'] = this.observables['userStatus'] || 
    this.createObservableForSocket('userStatus');
    return this.observables['userStatus'];
  }
  responseUserStatus(){
    this.observables['statusResponse'] = this.observables['statusResponse'] || 
    this.createObservableForSocket('statusResponse');
    return this.observables['statusResponse'];
  }
  getMessage(){
    this.observables['message'] = this.observables['message'] ||
    this.createObservableForSocket('message');
    return this.observables['message'];
  }
  getAcceptedFriendRequests(){
    this.observables['acceptedFriendRequest'] = this.observables['acceptedFriendRequest'] || 
    this.createObservableForSocket('acceptedFriendRequest');
    return this.observables['acceptedFriendRequest'];
  }
  disconnect(){
    this.socket.disconnect();
  }
  private createObservableForSocket(event : string) : Observable<any>{
    return new Observable(observer =>{
      this.socket.on(event, data =>{
        observer.next(data);
      });
      return ()=>{
        this.socket.disconnect();
      }
    });
  }
}