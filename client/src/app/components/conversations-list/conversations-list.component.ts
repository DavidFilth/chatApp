import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'conversations-list',
  templateUrl: './conversations-list.component.html',
  styleUrls: ['./conversations-list.component.css']
})
export class ConversationsListComponent{
  @Input() conversations : customTypes.Conversation[];
  @Output() conversationSelected  = new EventEmitter();
  constructor() {}

}
