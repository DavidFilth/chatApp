import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

@Injectable()
export class SocketService {
  private socket: SocketIOClient.Socket;
  constructor() {
  }
  connect(user){
    this.socket = io('http://localhost:3000', {query: user});

  }
  sendMessage(data){
    this.socket.emit('send message', data);
  }
  disconnect(){
    this.socket.disconnect();
  }
}