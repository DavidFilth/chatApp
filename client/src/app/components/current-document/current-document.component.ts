import { Component, Input, ElementRef, ViewChild, OnInit } from '@angular/core';

import { SocketService } from '../../services/socket.service';
import { CommonFunctionalityService } from '../../services/common-functionality.service';

@Component({
  selector: 'current-document',
  templateUrl: './current-document.component.html',
  styleUrls: ['./current-document.component.css']
})
export class CurrentDocumentComponent implements OnInit{
  @Input() conversation : customTypes.conversationInfo;
  @Input() userId : string;
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  private switch : boolean = false;
  constructor(private commonFn: CommonFunctionalityService, private socket: SocketService ) {
    this.socket.getMessage().subscribe((data)=>{
      if(data.conversationId === this.conversation._id){
        this.conversation.messages.push(data.message);
        setTimeout(()=>{
          this.scrollToBottom();
        },1); 
      }
    });
  }
  getTitle(){
    if(this.conversation.name) return this.conversation.name;
    return this.commonFn.contactFromPtoP(this.conversation, this.userId).name;
  }
  setMessageClass(message: customTypes.Message){
    return message.from._id === this.userId ? 'pull-right arrow_box_right': 'pull-left arrow_box_left';
  }
  ngOnInit(){
    this.scrollToBottom();
  }
  scrollToBottom(): void {
        try {
            this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
        } catch(err) { }                 
  }
  checkStatus(){
    if(this.conversation.type === "ptop"){
      return this.commonFn.contactFromPtoP(this.conversation, this.userId).status; 
    }
    return false;
  }
}
