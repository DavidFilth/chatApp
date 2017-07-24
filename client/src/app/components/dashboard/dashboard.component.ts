import { Component } from '@angular/core';

import { AuthenticationService } from '../../services/authentication.service';
import { UsersService } from '../../services/users.service';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent{
  private tool: customTypes.tool;
  private myUser : customTypes.User;
  private conversation : customTypes.Conversation;
  constructor(private auth: AuthenticationService, private userServ : UsersService, private socket: SocketService){
    this.myUser = this.auth.getUser();
    this.tool = {value: 'conversation-list'};
    this.socket.connect(this.myUser._id);
    this.socket.getMessage()
      .subscribe(data =>{
        console.log('inside getmessage: ', data);
      });
    this.socket.getAcceptedFriendRequests()
      .subscribe((data: customTypes.contactInfo)=>{
        this.myUser.contacts.push(data);
      });
    this.socket.incomingFriendRequest()
      .subscribe((data : customTypes.contactInfo)=>{
        this.myUser.pendingRequests.push(data);
      });
  }
  changeConversation(conversation : customTypes.conversationSchema){
    this.conversation = {
      _id: conversation._id,
      participants: {},
      messages: [],
      type: conversation.type,
      name: conversation.name
    };
    for(let i = 0; i < conversation.messages.length; i++){
      this.userServ.searchMessage(conversation.messages[i])
        .subscribe((data : customTypes.Message)=>{
          this.conversation.messages.push(data);
        });
    }
    for(let i = 0; i < conversation.participants.length; i++){
      this.userServ.searchUser(conversation.participants[i])
        .subscribe((data : customTypes.contactInfo)=>{
          this.conversation.participants[data._id] = {name: data.name, email: data.email};
        });
    }
  }
  sendMessageHandler(form: customTypes.messageForm){
    let message: customTypes.Message = {
      _id: undefined,
      date: (new Date()).getTime(),
      from: this.myUser._id,
      content: form.message,
      type: 'text'
    }
    if(this.conversation.messages.length === 0 && this.conversation.type === 'ptop'){
      this.myUser.conversations.push({
        _id: this.conversation._id,
        participants: Object.keys(this.conversation.participants),
        messages: [],
        type: 'ptop',
        usersTyping: []  
      });
    }
    this.conversation.messages.push(message);
    this.userServ.postMessage({message, conversationId: this.conversation._id}).subscribe((data : customTypes.Message)=>{
      let index = this.myUser.conversations.findIndex(conv=>conv._id === this.conversation._id);
      if(index != -1) this.myUser.conversations[index].messages.push(data._id);
    });
    this.socket.sendMessage(Object.keys(this.conversation.participants), message, this.conversation._id);
  }
  createGroupHandler(data: customTypes.groupForm){
    let conv : customTypes.conversationSchema = {
      _id: undefined,
      name: data.name,
      type: 'group',
      participants: data.participants.map((data)=>data._id),
      messages: []
    }
    conv.participants.push(this.myUser._id);
    this.userServ.createConversation(conv)
      .subscribe((res : customTypes.conversationSchema)=>{
        res.usersTyping = [];
        this.myUser.conversations.push(res);
      });
      this.tool.value = 'conversation-list';
  }
  privateConversation(contact: customTypes.contactInfo){
    // Search for the chat in the conversations of the user
    let index = this.myUser.conversations.findIndex((chat)=>chat.type === 'ptop' && chat.participants.includes(contact._id));
    if(index !== -1) return this.changeConversation(this.myUser.conversations[index]);    
    let conv : customTypes.conversationSchema ={
      _id: undefined,
      participants: [this.myUser._id, contact._id],
      type: 'ptop',
      messages: [],
    };
    this.userServ.createConversation(conv)
      .subscribe((data : customTypes.conversationSchema)=>{
        this.changeConversation(data);
      });
  }
  typingHandler(){
    this.socket.UserIsTyping(Object.keys(this.conversation.participants), this.conversation._id, {
      _id: this.myUser._id,
      name: this.myUser.name,
      username: this.myUser.username,
      email: this.myUser.email
    });
  }
  stopTypingHandler(){
    this.socket.UserStopTyping(Object.keys(this.conversation.participants), this.conversation._id, {
      _id: this.myUser._id,
      name: this.myUser.name,
      username: this.myUser.username,
      email: this.myUser.email
    });
  }
}
