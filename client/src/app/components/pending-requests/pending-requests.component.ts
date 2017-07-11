import { Component } from '@angular/core';
import { UsersService } from '../../services/users.service'

@Component({
  selector: 'app-pending-requests',
  templateUrl: './pending-requests.component.html',
  styleUrls: ['./pending-requests.component.css']
})
export class PendingRequestsComponent{
  requests: any[] =[]
  constructor(private usersServ: UsersService) {
    let requests: any[] = this.usersServ.getUser().pendingRequests;
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
    let user = this.usersServ.getUser();
    this.usersServ.resolveRequest({userId: user._id, contactId: id, response: res})
      .subscribe(function(data){
        console.log(data);
    });
  }

}
