import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Utils } from '@login/utils';
import {UserLoginService} from '@login/services/user-login.service';
import {messages} from '@messages/messages';
import {SharedService} from '@shared/services/shared.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgetPasswordForm: FormGroup;
  errorMessage: string;
  private _userID: string;
  validationMessages = {
    email: messages.EMAIL
  };
  constructor(private _formBuilder: FormBuilder, private _router: Router, private _userLoginService: UserLoginService,
  private _sharedService: SharedService) { }
   /**
   * Function executes when Forgot password component is created
   */
  ngOnInit () {
    this.forgetPasswordForm = this._formBuilder.group({
      email: new FormControl('', [Validators.email, Validators.required])
    });
  }

  /**
   * Function to check the validity of fields in forgot password form
   * @param  {string} field - Field name
   */
  isFieldValid (field: string) {
    return !this.forgetPasswordForm.get(field).valid && this.forgetPasswordForm.get(field).touched;
  }

  /**
   * Function to handle when forgot password form is submitted
   */
  onForgetPassword () {
    this.errorMessage = null;
    if (this.forgetPasswordForm.valid) {
    this._userLoginService.validateEmail(this.forgetPasswordForm.getRawValue()).subscribe(
      (data) =>  this.successResponse(data),
      (err) => {
        this.errorMessage = err.error.message;//messages.EMAIL_ID_NOT_FOUND;
      });
    } else {
      Utils.validateForm(this.forgetPasswordForm);
    }
  }

  /**
   * Function executed when email is validated
   * @param  {Object} data - Object containing user ID
   */
  successResponse (data) {
    if (data.length) {
      this._userID = data[0].id;
      localStorage.setItem('affinix_passcode_userID', this._userID);

      if (this._userID) {
        this._router.navigate(['/passcodesent']);
      }
    } else {
      this.errorMessage = messages.EMAIL_ID_NOT_FOUND;
    }
  }

  removeMessages ($event) {
    this.errorMessage = null;
  }

}
