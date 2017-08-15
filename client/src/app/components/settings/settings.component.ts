import { Component, Input, Output, EventEmitter, OnInit} from '@angular/core';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit{
  @Input() user: customTypes.User;
  @Output() updateUserData = new EventEmitter();
  public username : customTypes.editableProperty;
  public language : customTypes.editableProperty;
  constructor() {}
  ngOnInit(){
    this.username={
      disableEdition: true,
      value: this.user.username,
      default: this.user.username
    };
    this.language={
      disableEdition: true,
      value: this.user.language,
      default: this.user.language
    };
  }
  disableOrEnable(obj: customTypes.editableProperty){
    obj.disableEdition = !obj.disableEdition;
    obj.value = obj.default;
  }
}
