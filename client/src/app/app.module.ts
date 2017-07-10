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
import { MessagesService } from './services/messages.service';
import { MessagesComponent } from './components/messages/messages.component'

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
    MessagesComponent
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy }, 
    AuthGuard,
    UsersService,
    ValidatorsService,
    MessagesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
