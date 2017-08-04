import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.css']
})
export class SendMessageComponent {
  @Output() send = new EventEmitter();
  @Output() typing = new EventEmitter();
  @Output() stopTyping = new EventEmitter();
  @Output() focus = new EventEmitter();
  constructor() { }
}
