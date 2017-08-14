import { Component, Input, ElementRef, ViewChild, OnInit } from '@angular/core';

import { SocketService } from '../../services/socket.service';
import { CommonFunctionalityService } from '../../services/common-functionality.service';

@Component({
  selector: 'current-document',
  templateUrl: './current-document.component.html',
  styleUrls: ['./current-document.component.css']
})
export class CurrentDocumentComponent implements OnInit{
  @Input() conversation : customTypes.conversationItem;
  @Input() user : customTypes.User;
  @ViewChild('scrollMe') public myScrollContainer: ElementRef;
  constructor(public commonFn: CommonFunctionalityService, public socket: SocketService ) {
    this.socket.getMessage().subscribe((data)=>{
      if(data.conversationId === this.conversation.info._id){
        this.conversation.messages.push(data.message);
        setTimeout(()=>{this.scrollToBottom()},1); 
      }
    });
  }
  getTitle(){
    if(this.conversation.info.name) return this.conversation.info.name;
    return this.commonFn.contactFromPtoP(this.conversation.info.participants, this.user._id).name;
  }
  setMessageClass(message: customTypes.Message){
    return message.from._id === this.user._id ? 'pull-right arrow_box_right': 'pull-left arrow_box_left';
  }
  ngOnInit(){
    this.scrollToBottom();
  }
  scrollToBottom(): void {
    this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
  }
  checkStatus(){
    if(this.conversation.info.type === "ptop"){
      let contact = this.commonFn.contactFromPtoP(this.conversation.info.participants, this.user._id);
      let index = this.user.contacts.findIndex(c => c._id === contact._id);
      return index > -1 ? this.user.contacts[index].status : false;
    }
    return false;
  }
}
