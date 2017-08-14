import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { SocketService } from '../../services/socket.service'

@Component({
  selector: 'conversations-list',
  templateUrl: './conversations-list.component.html',
  styleUrls: ['./conversations-list.component.css']
})
export class ConversationsListComponent implements OnInit{
  public conversations : customTypes.conversationItem[];
  @Input() user: customTypes.User;
  @Output() conversationSelected  = new EventEmitter();
  constructor(public socket: SocketService) {
    this.socket.incomingUserTyping()
      .subscribe((data: any)=>{
        let index = this.conversations.findIndex(conv => conv.info._id === data.conversation);
        if(index !== -1){
          let index2 = this.conversations[index].info.usersTyping.findIndex(cont => cont._id === data.contact._id);
          if(index2 === -1){
            this.conversations[index].info.usersTyping.push(data.contact);
          }
        }
      });
    this.socket.incomingUserStopTyping()
      .subscribe((data: any)=>{
        let index = this.conversations.findIndex(conv => conv.info._id === data.conversation);
        if(index !== -1){
          let index2 = this.conversations[index].info.usersTyping.findIndex(cont => cont._id === data.contact._id);
          if( index2 !== -1){
            this.conversations[index].info.usersTyping.splice(index2, 1);
          }
        }
      });
  }
  ngOnInit(){
    this.conversations = this.user.conversations;
  }
  getTitle(conversation: customTypes.Conversation){
    if(conversation.name !== undefined) return conversation.name;
    let contacts = conversation.participants.filter(contact => { return contact._id !== this.user._id });
    return contacts[0].name;
  }
}
