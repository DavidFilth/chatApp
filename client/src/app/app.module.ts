import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common'

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component'
import { routing } from './routes/routing'
import { AuthGuard } from './routes/auth.guard';
import { UsersService } from './services/users.service';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { CurrentDocumentComponent } from './components/current-document/current-document.component';
import { UserToolsComponent } from './components/user-tools/user-tools.component';
import { AddContactComponent } from './components/add-contact/add-contact.component';
import { ValidatorsService } from './services/validators.service'
import {CommonFunctionalityService} from './services/common-functionality.service'
import { MessagesService } from './services/messages.service';
import { MessagesComponent } from './components/messages/messages.component';
import { PendingRequestsComponent } from './components/pending-requests/pending-requests.component'
import { AuthenticationService } from './services/authentication.service';
import { ConversationsListComponent } from './components/conversations-list/conversations-list.component'
import { SocketService } from './services/socket.service';
import { SendMessageComponent } from './components/send-message/send-message.component';
import { CreateGroupComponent } from './components/create-group/create-group.component';
import { CustomPipe } from './pipes/custom.pipe';
import { SettingsComponent } from './components/settings/settings.component';
import { CanvasComponent } from './components/canvas/canvas.component'

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    routing
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    DashboardComponent,
    ContactListComponent,
    CurrentDocumentComponent,
    UserToolsComponent,
    AddContactComponent,
    MessagesComponent,
    PendingRequestsComponent,
    ConversationsListComponent,
    SendMessageComponent,
    CreateGroupComponent,
    CustomPipe,
    SettingsComponent,
    CanvasComponent
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy }, 
    AuthGuard,
    UsersService,
    ValidatorsService,
    MessagesService,
    AuthenticationService,
    SocketService,
    CommonFunctionalityService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
