import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css']
})
export class CreateGroupComponent implements OnInit {
  @Input() user : customTypes.User;
  @Output() createGroup = new EventEmitter();
  public contacts : customTypes.contactInfo[];
  public participants : customTypes.contactInfo[];
  constructor() {}
  ngOnInit(){
    this.participants = [];
    this.contacts = this.user.contacts.slice();
  }
  submit(form){
    if(this.participants.length > 0){
      this.createGroup.emit({name: form.groupName, participants: this.participants});
    }
  }
  changeDetected(value: boolean, contact : customTypes.contactInfo){
    if(value){
      this.participants.push(contact);
    } else{
      let index = this.participants.indexOf(contact);
      if(index > -1) this.participants.splice(index, 1);
    }
    console.log(this.participants);
  }
}
