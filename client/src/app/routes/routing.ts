import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from "../components/login/login.component";
import { SignupComponent } from "../components/signup/signup.component";
import { HomeComponent } from '../components/home/home.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import {ContactListComponent} from '../components/contact-list/contact-list.component'
import { AddContactComponent } from '../components/add-contact/add-contact.component'
import { PendingRequestsComponent } from '../components/pending-requests/pending-requests.component'

import { AuthGuard } from './auth.guard';

const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'signup', component: SignupComponent},
    {path: 'login', component: LoginComponent},
    {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], children: [
        {path: '', component: ContactListComponent },
        {path: 'addcontact', component: AddContactComponent},
        {path: 'requests', component: PendingRequestsComponent}
    ]}
];
export const routing = RouterModule.forRoot(routes);