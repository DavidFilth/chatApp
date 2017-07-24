import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css']
})
export class CreateGroupComponent implements OnInit {
  @Input() user : customTypes.User;
  @Output() createGroup = new EventEmitter();
  private contacts : customTypes.contactInfo[];
  private participants : customTypes.contactInfo[];
  constructor() {}
  addParticipant(contact : customTypes.contactInfo){
    this.participants.push(contact);
    let index = this.contacts.indexOf(contact);
    if(index !== -1) this.contacts.splice(index, 1);
  }
  ngOnInit(){
    this.contacts = this.user.contacts.slice();
    this.participants=[];
  }
  removeParticipant(contact : customTypes.contactInfo){
    this.contacts.push(contact);
    let index = this.participants.indexOf(contact);
    if(index !== -1) this.participants.splice(index, 1);
  }
  submit(form){
    this.createGroup.emit({name: form.groupName, participants: this.participants});
  }
}
