import { Component, ViewChild } from '@angular/core';

import { CurrentDocumentComponent } from '../current-document/current-document.component';
import { AuthenticationService } from '../../services/authentication.service';
import { UsersService } from '../../services/users.service';
import { SocketService } from '../../services/socket.service';
import { MessagesService } from '../../services/messages.service';
import { CommonFunctionalityService } from '../../services/common-functionality.service';


@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent{
  @ViewChild(CurrentDocumentComponent) public document : CurrentDocumentComponent;
  public tool: customTypes.tool;
  public myUser : customTypes.User;
  public conversation : customTypes.conversationInfo;
  constructor(public auth: AuthenticationService, 
    public userServ : UsersService,
    public socket: SocketService, 
    public commonFn: CommonFunctionalityService,
    public messages: MessagesService){
    this.myUser = this.auth.getUser();
    this.tool = {value: 'conversation-list'};
    this.socket.connect(this.myUser._id);
    this.socket.sendMyStatus(this.myUser.contacts.map(contact => contact._id), this.myUser._id, true);
    this.socket.incomingConversation()
      .subscribe((data: customTypes.conversationInfo)=>{
      if(data.type === 'group'){
        this.messages.emit({content: `You have been added to ${data.name}`, type: 'alert-info'});
      } 
      this.myUser.conversations.push(data);
    });
    this.socket.getMessage()
      .subscribe(data =>{
      for(let i = 0; i < this.myUser.conversations.length; i++){
        if(this.myUser.conversations[i]._id === data.conversationId){
          this.myUser.conversations[i].unreadMessages++;
          this.myUser.conversations[i].lastMessage = data.message;
        }
      }
    });
    this.socket.getAcceptedFriendRequests()
      .subscribe((data: customTypes.contactInfo)=>{
        this.myUser.contacts.push(data);
        this.messages.emit({content: `${data.name} has accepted your friendRequest`, type:'alert-info'});
      });
    this.socket.incomingFriendRequest()
      .subscribe((data : customTypes.contactInfo)=>{
        this.myUser.pendingRequests.push(data);
        this.messages.emit({content: `You have a new friendship request from ${data.name}`, type: 'alert-info' });
      });
    this.socket.incomingUserStatus()
      .subscribe((data) =>{
        this.socket.respondMyStatus(data.userId, this.myUser._id, true);
        let index = this.myUser.contacts.findIndex(contact => contact._id === data.userId);
        if(index > -1) this.myUser.contacts[index].status = data.status;
      });
    this.socket.responseUserStatus()
      .subscribe((data)=>{
        let index = this.myUser.contacts.findIndex(contact => contact._id === data.userId);
        if(index > -1) this.myUser.contacts[index].status = data.status;
      });
  }
  changeConversation(conversation : customTypes.conversationInfo){
    this.conversation = conversation;
    conversation.unreadMessages = 0;
    this.userServ.searchConversation(conversation._id)
      .subscribe((data: customTypes.conversationInfo )=>{
        this.conversation.messages = data.messages;
        setTimeout(()=>this.document.scrollToBottom(),1);
      });
  }
  sendMessageHandler(form: customTypes.messageForm){
    let message = this.commonFn.newMessageObject(new Date(), this.myUser.getUserInfo(), form.message, 'text');
    if(this.conversation.messages.length === 0 && this.conversation.type === 'ptop'){
      this.myUser.conversations.push(this.conversation);
      this.socket.newConversation(this.conversation, [this.commonFn.contactFromPtoP(this.conversation.participants, this.myUser._id)._id]);
    }
    this.conversation.messages.push(message);
    setTimeout(()=>this.document.scrollToBottom(),1);
    this.userServ.postMessage({message, conversationId: this.conversation._id}).subscribe((data : customTypes.Message)=>{
      this.conversation.lastMessage = message;
    });
    this.socket.sendMessage(this.conversation.participants.map(contact => contact._id), message, this.conversation._id);
  }
  createGroupHandler(data: customTypes.groupForm){
    let conv = this.commonFn.newConversationObject(data.name, 'group', [...data.participants, this.myUser.getUserInfo()]);
    this.userServ.createConversation(conv)
      .subscribe((res : customTypes.conversationInfo)=>{
        conv._id = res._id;
        this.myUser.conversations.push(conv);
        this.socket.newConversation(conv, data.participants.map(contact => contact._id));
      });
      this.tool.value = 'conversation-list';
  }
  privateConversation(contact: customTypes.contactInfo){
    // Search for the chat in the conversations of the user
    let index = this.myUser.conversations.findIndex((chat)=>chat.type === 'ptop' && -1 !== chat.participants.findIndex(participant => participant._id === contact._id));
    if(index !== -1) return this.changeConversation(this.myUser.conversations[index]);
    let conv = this.commonFn.newConversationObject(undefined, 'ptop', [contact, this.myUser.getUserInfo()]);
    this.userServ.createConversation(conv)
      .subscribe((data : customTypes.conversationInfo)=>{
        conv._id = data._id;
        this.changeConversation(conv);
      });
  }
  typingHandler(){
    this.socket.UserIsTyping(this.conversation.participants.map(contact => contact._id), this.conversation._id, this.myUser.getUserInfo());
  }
  stopTypingHandler(){
    this.socket.UserStopTyping(this.conversation.participants.map(contact => contact._id), this.conversation._id, this.myUser.getUserInfo());
  }
  onFocus(){
    if(this.conversation){
      this.conversation.unreadMessages = 0;
    }
  }
}
