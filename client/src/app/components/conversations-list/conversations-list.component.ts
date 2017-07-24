import { Component, Input, Output, EventEmitter } from '@angular/core';

import { SocketService } from '../../services/socket.service'

@Component({
  selector: 'conversations-list',
  templateUrl: './conversations-list.component.html',
  styleUrls: ['./conversations-list.component.css']
})
export class ConversationsListComponent{
  @Input() conversations : customTypes.conversationSchema[];
  @Input() user: customTypes.User;
  @Output() conversationSelected  = new EventEmitter();
  constructor(private socket: SocketService) {
    this.socket.incomingUserTyping()
      .subscribe((info: any)=>{
        let index = this.conversations.findIndex(conv => conv._id === info.conversation);
        if(index !== -1){
          let index2 = this.conversations[index].usersTyping.findIndex((cont)=> cont._id === info.contact._id)
          if(index2 === -1){
            this.conversations[index].usersTyping.push(info.contact);
          }
        }
      });
    this.socket.incomingUserStopTyping()
      .subscribe((info: any)=>{
        let index = this.conversations.findIndex(conv => conv._id === info.conversation);
        if(index !== -1){
          let index2 = this.conversations[index].usersTyping.findIndex((cont)=> cont._id === info.contact._id);
          if(index2 !== -1){
            this.conversations[index].usersTyping.splice(index2, 1);
          }
        }
      });
  }
  getTitle(conversation: customTypes.conversationSchema){
    if(conversation.name !== undefined) return conversation.name;
    let index = conversation.participants.indexOf(this.user._id);
    let contactId = conversation.participants[Math.abs(index - 1)];
    index = this.user.contacts.findIndex((contact)=>contact._id === contactId);
    if(index !== -1) return this.user.contacts[index]['name'];
    return contactId;
  }

}
