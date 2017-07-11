import { Component } from '@angular/core';

import { AuthenticationService } from '../../services/authentication.service'

@Component({
  selector: 'app-user-tools',
  templateUrl: './user-tools.component.html',
  styleUrls: ['./user-tools.component.css']
})
export class UserToolsComponent {
  user: {};
  constructor(private authService: AuthenticationService){

    this.user = this.authService.getUser();
  }

}
