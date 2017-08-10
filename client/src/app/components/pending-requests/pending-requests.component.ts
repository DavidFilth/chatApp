import { Component, Input } from '@angular/core';

import { UsersService } from '../../services/users.service';
import { MessagesService } from '../../services/messages.service';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'pending-requests',
  templateUrl: './pending-requests.component.html',
  styleUrls: ['./pending-requests.component.css']
})
export class PendingRequestsComponent{
  @Input() user : customTypes.User;
  constructor(public usersServ: UsersService, public messageServ: MessagesService, public socket: SocketService) {}
  resolveFriendRequest( contact : customTypes.contactInfo , res : boolean){
    this.usersServ.resolveFriendshipRequest({userId: this.user._id, contactId: contact._id, response: res})
      .subscribe((data) =>{
        if(data.status){
          this.messageServ.emit({content: `You are now friends with ${contact.name}`, type: "alert-info" });
          this.user.contacts.push(contact);
          this.socket.acceptFriendRequest(contact._id, {
            _id: this.user._id, 
            name: this.user.name,
            email: this.user.email,
            username: this.user.username
          });
        }else{
          this.messageServ.emit({content: `You have rejected the friendship request of ${ contact.name }`, type: "alert-warning" });
        }
        let index = this.user.pendingRequests.indexOf(contact);
        if(index != -1) this.user.pendingRequests.splice(index,1);
    });
  }

}
