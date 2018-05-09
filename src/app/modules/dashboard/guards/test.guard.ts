import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { SharedService } from '@shared/services/shared.service';
import { Router } from '@angular/router';
import {roles} from '@dashboard/roles.mapping';

@Injectable()
export class TestGuard implements CanActivate {
  login_token = this._sharedService.getAccessToken();
   userDetails;
   constructor(private _sharedService: SharedService, private _router : Router) {
  }
  canActivate(): boolean {
    if(this.login_token) {
        const role =  this._sharedService.getUserRole(roles.admin.name);
         
        if(role) {
          return true;
        } else {
          this._router.navigate(['/login']);
          return false;
        }
    }
  }
  canActivateChild() : boolean {
    return this.canActivate();
  }
}
