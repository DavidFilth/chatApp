import { Component, Input} from '@angular/core';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  public editUsername : boolean = true;
  public editLanguage : boolean = true;
  @Input() user: customTypes.User;
  constructor() {
  }
}
