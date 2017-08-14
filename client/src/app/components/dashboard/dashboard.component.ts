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
  public selectedConv : customTypes.conversationItem;
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
      .subscribe((data: customTypes.conversationItem)=>{
      if(data.info.type === 'group'){
        this.messages.emit({content: `You have been added to ${data.info.name}`, type: 'alert-info'});
      } 
      this.myUser.conversations.push(data);
    });
    this.socket.getMessage()
      .subscribe(data =>{
      for(let i = 0; i < this.myUser.conversations.length; i++){
        if(this.myUser.conversations[i].info._id === data.conversationId){
          this.myUser.conversations[i].unreadMessages++;
          this.myUser.conversations[i].info.lastMessage = data.message;
        }
      }
    });
    this.socket.getAcceptedFriendRequests()
      .subscribe((data: customTypes.contact)=>{
        this.myUser.contacts.push(data);
        this.messages.emit({content: `${data.name} has accepted your friendRequest`, type:'alert-info'});
      });
    this.socket.incomingFriendRequest()
      .subscribe((data : customTypes.contact)=>{
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
  changeConversation(incomingConv : customTypes.conversationItem){
    this.selectedConv = incomingConv;
    this.selectedConv.unreadMessages = 0;
    this.userServ.clearUnreadMessages(this.myUser._id, this.selectedConv.info._id)
    .subscribe(res => res);
    this.userServ.getMessages(this.selectedConv.info._id)
      .subscribe((data: customTypes.Message[])=>{
        this.selectedConv.messages = data;
        setTimeout(()=>this.document.scrollToBottom(),1);
      });
    
  }
  sendMessageHandler(form: customTypes.messageForm){
    let message = this.commonFn.newMessageObject(new Date(), this.myUser.getUserInfo(), form.message, 'text', this.selectedConv.info._id);
    if(this.selectedConv.messages.length === 0 && this.selectedConv.info.type === 'ptop'){
      this.myUser.conversations.push(this.selectedConv);
      this.socket.newConversation(this.selectedConv, [this.commonFn.contactFromPtoP(this.selectedConv.info.participants, this.myUser._id)._id]);
    }
    this.selectedConv.messages.push(message);
    setTimeout(()=>this.document.scrollToBottom(),1);
    this.userServ.postMessage({message, conversationId: this.selectedConv.info._id}).subscribe((data : customTypes.Message)=>{
      this.selectedConv.info.lastMessage = message;
    });
    this.socket.sendMessage(this.selectedConv.info.participants.map(contact => contact._id), message, this.selectedConv.info._id);
  }
  createGroupHandler(data: customTypes.groupForm){
    let conv = this.commonFn.newConversationObject(data.name, 'group', [...data.participants, this.myUser.getUserInfo()], this.myUser.getUserInfo());
    this.userServ.createConversation(conv)
      .subscribe((res : customTypes.Conversation)=>{
        let convItem : customTypes.conversationItem = {unreadMessages: 1, info: res}
        this.myUser.conversations.push(convItem);
        this.socket.newConversation(convItem, data.participants.map(contact => contact._id));
      });
      this.tool.value = 'conversation-list';
  }
  privateConversation(contact: customTypes.contact){
    let index = this.myUser.conversations.findIndex((conv)=>conv.info.type === 'ptop' &&
    conv.info.participants.findIndex(participant => participant._id === contact._id) !== -1);
    if(index !== -1) return this.changeConversation(this.myUser.conversations[index]);
    let conv = this.commonFn.newConversationObject(undefined, 'ptop', [contact, this.myUser.getUserInfo()]);
    this.userServ.createConversation(conv)
      .subscribe((data : customTypes.Conversation)=>{
        this.changeConversation({unreadMessages: 0, info: data});
      });
  }
  typingHandler(){
    this.socket.UserIsTyping(this.selectedConv.info.participants.map(contact => contact._id), this.selectedConv.info._id, this.myUser.getUserInfo());
  }
  stopTypingHandler(){
    this.socket.UserStopTyping(this.selectedConv.info.participants.map(contact => contact._id), this.selectedConv.info._id, this.myUser.getUserInfo());
  }
  onFocus(){
    if(this.selectedConv){
      this.selectedConv.unreadMessages = 0;
      this.userServ.clearUnreadMessages(this.myUser._id, this.selectedConv.info._id).subscribe(res =>res);
    }
  }
}
