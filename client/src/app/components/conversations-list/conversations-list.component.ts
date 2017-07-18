import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { AuthenticationService } from '../../services/authentication.service'

@Component({
  selector: 'app-conversations-list',
  templateUrl: './conversations-list.component.html',
  styleUrls: ['./conversations-list.component.css']
})
export class ConversationsListComponent{
  conversations: customTypes.Conversation[];
  constructor( private usersServ: UsersService, private authService: AuthenticationService) {
    this.conversations = this.authService.getUser().conversations;
  }

}
