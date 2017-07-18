import { Component } from '@angular/core';

@Component({
  selector: 'app-current-document',
  templateUrl: './current-document.component.html',
  styleUrls: ['./current-document.component.css']
})
export class CurrentDocumentComponent{
  private messages: {}[];
  constructor() {
    this.messages = [
      {user: 'Juan', content: 'Que le pasa a lupita'},
      {user: 'Jose', content: 'No se'},
      {user: 'Juan', content: 'Que le pasa a lupita'},
      {user: 'Jose', content: 'No se'},
      {user: 'Juan', content: 'Porque ya no baila'},
      {user: 'Jose', content: 'Su papa'},
      {user: 'Juan', content: 'Que le dice su papa'},
      {user: 'Jose', content: 'Que no!!'},
      {user: 'Juan', content: 'Que le dice su mama'},
      {user: 'Jose', content: 'Que si!!'},
    ]
  }
  sendMessage(data){
    console.log(data);
  }
}
