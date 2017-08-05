import { Injectable } from '@angular/core';
import { Router } from '@angular/router'

import { UsersService } from './users.service';
import { SocketService } from './socket.service';


@Injectable()
export class AuthenticationService {
  private auth: boolean;
  private user: customTypes.User;
  constructor(private userServ: UsersService, private socket: SocketService, private router: Router) {
    this.user = null;
    this.auth = false;
  }
  getUser() : customTypes.User {
    return this.user;
  }
  logout(){
    this.auth = false;
    this.socket.sendMyStatus(this.user.contacts.map(contact => contact._id),this.user.getUserInfo(), false);
    this.socket.disconnect();
    this.user = null;
    this.router.navigateByUrl('/login');
  }
  authenticated() : boolean{
    return this.auth;
  }
  authenticate(user : customTypes.User){
    this.user = user;
    this.user.getUserInfo = ()=>{
      return {
        _id: this.user._id,
        name: this.user.name,
        username: this.user.username,
        email: this.user.email
      }
    }
    this.user.countUnreadMessages = () =>{
      let res = 0;
      for(let i = 0; i < this.user.conversations.length; i++){
        res+=this.user.conversations[i].unreadMessages;
      }
      return res;
    }
    for(let i = 0 ; i < this.user.conversations.length; i++){
      this.userServ.getLastMessage(this.user.conversations[i]._id)
        .subscribe((data: customTypes.Message)=>{
          this.user.conversations[i].lastMessage = data;
        });
      this.user.conversations[i].unreadMessages = 0;
      this.user.conversations[i].usersTyping = [];
    }
    this.auth = true;
  }
  updateUser(user : customTypes.User){
    this.user = user;
  }
}
