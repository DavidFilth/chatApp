import { Component, Input } from '@angular/core';

@Component({
  selector: 'user-tools',
  templateUrl: './user-tools.component.html',
  styleUrls: ['./user-tools.component.css']
})
export class UserToolsComponent {
  @Input() selectedTool : {value: string};
  @Input() user : customTypes.User;
  constructor(){
  }
  changeTool(value : string){this.selectedTool.value = value}

}
