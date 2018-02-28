import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(private _authService: AuthService) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean {
        if(this._authService.isAuthenticated()){
            return true;    
        }
        return false;
    }
}
