import { Component, Output, EventEmitter, ViewChild, OnInit, Input } from '@angular/core';

import { CommonFunctionalityService } from '../../services/common-functionality.service';
import {CanvasComponent} from '../canvas/canvas.component';

@Component({
  selector: 'send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.css']
})
export class SendMessageComponent{
  @Input() user : customTypes.User;
  @Input() conversation : customTypes.conversationItem;
  @ViewChild(CanvasComponent) myCanvas : CanvasComponent;
  @Output() send = new EventEmitter();
  @Output() typing = new EventEmitter();
  @Output() stopTyping = new EventEmitter();
  @Output() focus = new EventEmitter();
  constructor(public commonFn: CommonFunctionalityService) {}
  beforeSend(content, type){
    if(!content) return;
    let message = this.commonFn.newMessageObject(new Date(), this.user.getUserInfo(), content, type, this.conversation.info._id);
    this.myCanvas.dropDraw();
    this.send.emit(message);
  }
}
