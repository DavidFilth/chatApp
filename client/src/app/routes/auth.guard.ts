import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import { CanActivate } from '@angular/router';
import { UsersService } from '../services/users.service';

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private router: Router,
                private userServ: UsersService){
    }
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        return this.userServ.authenticated();
    }
}