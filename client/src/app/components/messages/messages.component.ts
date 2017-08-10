import { Component } from '@angular/core';
import { MessagesService } from '../../services/messages.service'

@Component({
  selector: 'messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent {
  constructor(public mService: MessagesService) {}
}
