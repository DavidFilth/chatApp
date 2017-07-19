import { Component, Input } from '@angular/core';

import { UsersService } from '../../services/users.service'
import { MessagesService } from '../../services/messages.service'

@Component({
  selector: 'pending-requests',
  templateUrl: './pending-requests.component.html',
  styleUrls: ['./pending-requests.component.css']
})
export class PendingRequestsComponent{
  @Input() user : customTypes.User;
  constructor(private usersServ: UsersService, private messageServ: MessagesService) {}
  resolveFriendRequest( contact : customTypes.contactInfo , res : boolean){
    this.usersServ.resolveFriendshipRequest({userId: this.user.id, contactId: contact.id, response: res})
      .subscribe((data) =>{
        if(data.status){
          this.messageServ.emit({content: `You are now friends with ${contact.name}`, type: "alert-info" });
          this.user.contacts.push(contact);
        }else{
          this.messageServ.emit({content: `You have rejected the friendship request of ${ contact.name }`, type: "alert-warning" });
        }
        let index = this.user.pendingRequests.indexOf(contact);
        if(index != -1) this.user.pendingRequests.splice(index);
    });
  }

}
