import { Component } from '@angular/core';

import { UsersService } from '../../services/users.service'
import { AuthenticationService } from '../../services/authentication.service'
import { MessagesService } from '../../services/messages.service'

@Component({
  selector: 'app-pending-requests',
  templateUrl: './pending-requests.component.html',
  styleUrls: ['./pending-requests.component.css']
})
export class PendingRequestsComponent{
  requests: any[] =[]
  constructor(private usersServ: UsersService, private authService: AuthenticationService, private messageServ: MessagesService) {
    let requests: any[] = this.authService.getUser().pendingRequests;
    let context = this;
    for(let i =0; i < requests.length; i++){
      (function(){
        context.usersServ.searchUser(requests[i])
        .subscribe(function(data){
          data.id = requests[i]
          context.requests.push(data);
        });
      })();
    }
  }
  resolveFriendReq(id, res){
    let user = this.authService.getUser();
    let context =this;
    this.usersServ.resolveFriendshipRequest({userId: user._id, contactId: id, response: res})
      .subscribe(function(data){
        if(data.status){
          context.messageServ.emit({content: `You are now friends with ${data.contactInfo}`, type: "alert-info" });
        }else{
          context.messageServ.emit({content: `You have rejected the friendship request`, type: "alert-warning" });          
        }
    });
  }

}
