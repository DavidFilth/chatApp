import { Injectable } from '@angular/core';

import { UsersService } from './users.service'

@Injectable()
export class AuthenticationService {
  private auth: boolean;
  private user: customTypes.User;
  constructor(private userServ: UsersService) {
    this.user = null;
    this.auth = false;
  }
  getUser() : customTypes.User {
    return this.user;
  }
  logout(){
    this.auth = false;
  }
  authenticated() : boolean{
    return this.auth;
  }
  authenticate(user : customTypes.userSchema){
    this.user = {
      id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      password: user.password,
      contacts: [],
      conversations: [],
      pendingRequests: []
    }
    // Adding the contacts;
    for(let i = 0; i < user.contacts.length; i++){
      this.userServ.searchUser(user.contacts[i]).subscribe((res : customTypes.contactInfo)=>{
        this.user.contacts.push(res);
      });
    }
    // Adding the conversations
    for(let i = 0; i < user.conversations.length; i++){
      this.userServ.searchConversation(user.conversations[i]).subscribe((res : customTypes.Conversation )=>{
        this.user.conversations.push(res);
      })
    }

    // Adding the pending requests
    for(let i = 0; i < user.pendingRequests.length; i++){
      this.userServ.searchUser(user.pendingRequests[i]).subscribe((res : customTypes.contactInfo )=>{
        this.user.pendingRequests.push(res);
      })
    }
    this.auth = true;
  }
  updateUser(user : customTypes.User){
    this.user = user;
  }
}
