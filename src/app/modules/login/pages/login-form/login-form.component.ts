import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators  } from '@angular/forms';
import { Router } from '@angular/router';
import { Utils } from '@login/utils';
import { UserLoginService } from '@login/services/user-login.service';
import { Login } from '@login/interfaces/login.interface';
import {environment} from '@environments/environment';
import { SharedService } from '@shared/services/shared.service';
import {messages} from '@messages/messages';
import {UserDetails} from '@dashboard/interfaces/user.details';
import {roles} from '@dashboard/roles.mapping';
import { DashboardSharedService } from '@dashboard/services/dashboard-shared.service';
import {ErrorMessageService} from '@app/error.message.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
   loginForm: FormGroup;
   errorMessage: string;
   validationMessages = {
     email: messages.EMAIL,
     password: messages.PASSWORD
   };
  constructor(private _router: Router, private _formBuilder: FormBuilder, private _userLoginService: UserLoginService,
  private _sharedService: SharedService, private _dashboardSharedService: DashboardSharedService, private _errorMessageService: ErrorMessageService) { }
  /**
   * Function executes when login component is created
   */
  ngOnInit() {
      this.loginForm = this._formBuilder.group({
        username: new FormControl('', [Validators.email, Validators.required]),
        password: new FormControl('', [Validators.required])
      });

      this.errorMessage = this._errorMessageService.getMessage();
      this._errorMessageService.setMessage(null);
  }
  /**
   * Function to check the validity of fields in login form
   * @param  {string} field - Field name
   */
  isFieldValid (field: string) {
      return !this.loginForm.get(field).valid && this.loginForm.get(field).touched;
  }
  /**
   * Function to handle when login form is submitted
   */
  onLogin () {
    if (this.loginForm.valid) {
      const formData: Login = this.loginForm.getRawValue();
      formData.grant_type = environment.grant_type;
      formData.client_id = environment.client_id;
      formData.client_secret = environment.client_secret;
      formData.username = encodeURIComponent(formData.username);
      formData.password = encodeURIComponent(formData.password);
      
      // Getting user token
      this._userLoginService.loginUser(formData).subscribe(
      (data) => this.setToken(data),
      (err) => {if (err) {
        this.errorMessage = (err.error.message) ? err.error.message : messages.LOGIN_ERROR;
      }});
    } else {
      Utils.validateForm(this.loginForm);
    }
  }
  /**
   * Function to set the user token
   * @param  {Object} data - response object
   */
  setToken (data) {
    
    if (data) {
      const authorizationHeader = `${data.token_type} ${data.accessToken}`;

      if (data.accessToken && data.token_type) {
        // saving token in local storage
        this._sharedService.setAccessToken(authorizationHeader);
        this._sharedService.setRefreshToken(data.refreshToken);
        this._sharedService.getAuthenticateUserDetails(authorizationHeader).subscribe(
          (data : UserDetails) => {
            if(data.services.length) {

              // For billing-user 
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
            }
             // For admin and employee
             else {
               this._sharedService.setUserRole(data.role_code);
               this._router.navigate([roles[data.role_code.toLowerCase()].firstPage]);
            }
            
          },
          (err) => this.errorMessage = (err.error.message) ? err.error.message :messages.ERROR_USER_EXISTS
        )
      }
    } else {
      this.errorMessage = messages.ERROR_USER_EXISTS;
    }
  }
  removeMessages($event) {
    this.errorMessage = null;
  }

}
