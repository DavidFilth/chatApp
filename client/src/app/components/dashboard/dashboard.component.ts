import { Component } from '@angular/core';

import { AuthenticationService } from '../../services/authentication.service'

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent{
  private tool: {value: string};
  private myUser : customTypes.User;
  private conversation : customTypes.Conversation;
  constructor(private auth: AuthenticationService){
    this.myUser = this.auth.getUser();
    this.tool = { value: 'conversation-list'};
  }
  changeConversation(conversation : customTypes.Conversation){
    this.conversation = conversation;
  }
  sendMessageHandler(message){
    console.log('message send: ', message);
  }
}
