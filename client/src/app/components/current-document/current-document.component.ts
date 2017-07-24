import { Component, Input } from '@angular/core';

import { SocketService } from '../../services/socket.service'

@Component({
  selector: 'current-document',
  templateUrl: './current-document.component.html',
  styleUrls: ['./current-document.component.css']
})
export class CurrentDocumentComponent{
  @Input() conversation : customTypes.Conversation;
  @Input() userId : string;
  constructor(private socket: SocketService) {
    this.socket.getMessage()
      .subscribe((data: any)=>{
        console.log(data);
        if(this.conversation._id === data.conversationId) this.conversation.messages.push(data.message);
      });
  }
  getName(id : string){
    if(this.conversation.participants[id] === undefined){
      return '';
    }
    return this.conversation.participants[id]['name'];
  }
  getPtoPName(){
    if(this.conversation.participants[this.userId] === undefined){
      return '';
    }
    for(let key in this.conversation.participants){
      if(key !== this.userId){
        return this.conversation.participants[key]['name'];
      }
    }
    return '';
  }
  setMessageClass(message: customTypes.Message){
    return message.from === this.userId ? 'pull-right arrow_box_right': 'pull-left arrow_box_left';
  }
}
