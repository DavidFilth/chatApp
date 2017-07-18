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
  private user : customTypes.User;
  constructor(private usersServ: UsersService, private authService: AuthenticationService, private messageServ: MessagesService) {
    this.user = this.authService.getUser();
  }
  resolveFriendRequest( contact : customTypes.contactInfo , res : boolean){
    this.usersServ.resolveFriendshipRequest({userId: this.user.id, contactId: contact.id, response: res})
      .subscribe((data) =>{
        this.authService.removeRequest(contact);
        if(data.status){
          this.authService.pushContacts(contact);
          this.messageServ.emit({content: `You are now friends with ${contact.name}`, type: "alert-info" });
        }else{
          this.messageServ.emit({content: `You have rejected the friendship request of ${ contact.name }`, type: "alert-warning" });
        }
        this.user = this.authService.getUser();
    });
  }

}
