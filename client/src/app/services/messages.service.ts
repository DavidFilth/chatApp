import { Injectable } from '@angular/core';

@Injectable()
export class MessagesService {
  private show: boolean = false;
  private message: {
    content: string,
    type: string
  };
  constructor() {
    this.clearMessage();
  }
  emit(message){
    let context = this;
    this.message = message;
    context.show = true;
    setTimeout(function(){
      context.show = false;
      context.clearMessage();
    },3000);
  }
  emiting(){
    return this.show;
  }
  clearMessage(){
    this.message = {
        content: '',
        type: ''
    };
  }
  getContent(){return this.message.content}
  getType(){return 'alert ' + this.message.type}

}
