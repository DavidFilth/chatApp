import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.css']
})
export class SendMessageComponent {
  @Output() send = new EventEmitter();
  constructor() { }
  
}
