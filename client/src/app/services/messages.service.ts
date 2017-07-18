import { Injectable } from '@angular/core';

@Injectable()
export class MessagesService {
  private message: {
    content: string,
    type: string
  };
  constructor() {
    this.clearMessage();
  }
  emit(message){
    this.message = message;
    setTimeout(()=>{
      this.clearMessage();
    },3000);
  }
  clearMessage(){
     this.message = {
      content: '',
      type: ''
    }
  }
  getContent(){
    return this.message.content
  }
  getType(){
    return this.message.type
  }
}
