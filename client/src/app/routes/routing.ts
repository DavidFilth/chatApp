import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from "../components/login/login.component";
import { SignupComponent } from "../components/signup/signup.component";
import { HomeComponent } from '../components/home/home.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';

import { AuthGuard } from './auth.guard';

const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'signup', component: SignupComponent},
    {path: 'login', component: LoginComponent},
    {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]}
];
export const routing = RouterModule.forRoot(routes);