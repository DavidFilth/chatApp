import { Component, Input, Output, EventEmitter } from '@angular/core';

import { SocketService } from '../../services/socket.service'

@Component({
  selector: 'conversations-list',
  templateUrl: './conversations-list.component.html',
  styleUrls: ['./conversations-list.component.css']
})
export class ConversationsListComponent{
  @Input() conversations : customTypes.conversationInfo[];
  @Input() user: customTypes.User;
  @Output() conversationSelected  = new EventEmitter();
  constructor(private socket: SocketService) {
    this.socket.incomingUserTyping()
      .subscribe((data: any)=>{
        let index = this.conversations.findIndex(conv => conv._id === data.conversation);
        if(index !== -1){
          let index2 = this.conversations[index].usersTyping.findIndex(cont => cont._id === data.contact._id);
          if(index2 === -1){
            this.conversations[index].usersTyping.push(data.contact);
          }
        }
      });
    this.socket.incomingUserStopTyping()
      .subscribe((data: any)=>{
        let index = this.conversations.findIndex(conv => conv._id === data.conversation);
        if(index !== -1){
          let index2 = this.conversations[index].usersTyping.findIndex(cont => cont._id === data.contact._id);
          if( index2 !== -1){
            this.conversations[index].usersTyping.splice(index2, 1);
          }
        }
      });
  }
  getTitle(conversation: customTypes.conversationInfo){
    if(conversation.name !== undefined) return conversation.name;
    let contacts = conversation.participants.filter(contact => { return contact._id !== this.user._id });
    return contacts[0].name;
  }

}
