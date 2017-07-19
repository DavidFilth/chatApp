import { Component, Input } from '@angular/core';

@Component({
  selector: 'current-document',
  templateUrl: './current-document.component.html',
  styleUrls: ['./current-document.component.css']
})
export class CurrentDocumentComponent{
  @Input() conversation : customTypes.Conversation;
  constructor() {}
}
