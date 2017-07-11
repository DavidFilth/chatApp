import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import { CanActivate } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private router: Router,
                private authService: AuthenticationService){
    }
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        return this.authService.authenticated();
    }
}