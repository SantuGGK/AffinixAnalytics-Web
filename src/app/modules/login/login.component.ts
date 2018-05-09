import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import {SharedService} from '@shared/services/shared.service';
//import {DashboardService} from '@dashboard/services/dashboard.service';
import {messages} from '@messages/messages';
import {UserDetails} from '@dashboard/interfaces/user.details';
import { UserLoginService } from '@login/services/user-login.service';
import {roles} from '@dashboard/roles.mapping';
import { DashboardSharedService } from '@dashboard/services/dashboard-shared.service';
import { Utils } from '@login/utils';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private _router: Router, private _sharedService: SharedService,
  private _userLoginService: UserLoginService, private _dashboardSharedService: DashboardSharedService) { }

  ngOnInit() {
    const login_token = this._sharedService.getAccessToken();
    console.log("login_token",login_token);
    if (login_token) {
       if (this._sharedService.getAccessToken()) {		
         // Getting details for authenticated user		
        this._sharedService.getAuthenticateUserDetails(login_token).subscribe(		
             (data: UserDetails) => {
               if(data.services.length) {
                 //For billing-user // For billing-user 
                    let paidServices = [];
                    if((<any>data).services[0].isbilling) {
                        (<any>data).services.forEach((element, index) => {
                          if((element.payment_id && element.subscription_id || element.is_waived && element.payment_id)) {
                            paidServices.push(element);
                          }
                    });
                    (<any>data).services = paidServices;
                  }
                  
                  // For SCHI users login
                  this._sharedService.setCurrentLoggedInRole(data.services[0].id);
                  this._sharedService.setUserRole(data.services[0].role_code);
                  Utils.navigateBasedOnRole(data,0, this._dashboardSharedService,this._sharedService, this._router);
                  // For admin and employee
                } else {
                    this._sharedService.setUserRole(data.role_code);
                    this._router.navigate([roles[data.role_code.toLowerCase()].firstPage]);
                }
             },
             (err) => {
               console.log('Failed to get authorization details');
             });		
       }		
     } else {		
        this._router.navigate([this._router.url]);
     }
  }

}
