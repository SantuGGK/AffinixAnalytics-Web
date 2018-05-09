import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Utils } from '@login/utils';
import { UserLoginService } from '@login/services/user-login.service';
import {messages} from '@messages/messages';
import {ErrorMessageService} from '@app/error.message.service';
@Component({
  selector: 'app-create-password',
  templateUrl: './create-password.component.html',
  styleUrls: ['./create-password.component.scss']
})
export class CreatePasswordComponent implements OnInit {

  createPasswordForm: FormGroup;
  userID: string;
  specialCharacterFormat = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
  errorMessage: string;
  enableResetPassword = true;

  validationMessages = {
    confirmPassword: messages.CONFIRM_PASSWORD
  };

  constructor(private _router: Router, private _formBuilder: FormBuilder, private _userLoginService: UserLoginService,
  private _activatedRoute: ActivatedRoute, private _errorMessageService: ErrorMessageService) { }

  /**
   * Function executes when create password component is created
   */
  ngOnInit () {
    this.createPasswordForm = this._formBuilder.group({
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required])
   });

    this._activatedRoute.params.subscribe((params: Params) => {
        this.userID = params['id'];
        const passcode = params['passcode'];
        this._userLoginService.verifyPasscode(this.userID, passcode, params.q).subscribe(
            (data) =>  this.verifyUser(data),
            (err) => { 
              this._errorMessageService.setMessage(err.error.message);
              this._router.navigate(['/login']); 
            }
        );
    });
  }

  /**
   * Function to verify the user
   *
   * @param  {Object} response - Response Object
   */
  verifyUser (response) {
      if (!response.length) {
        this._router.navigate(['/login']);
      }
  }

  /**
   * Function to check the form validity to show message
   */
  ifFormCheck () {
    return this.isFormValid() || !this.createPasswordForm.get('confirmPassword').touched;
  }

  /**
   * Function to check the form validity
   */
  isFormValid() {
      const length = this.getValue('password').length > 7;
      const upperCase = this.getValue('password').search(/[A-Z]/) > -1;
      const specialCase = this.specialCharacterFormat.test(this.getValue('password'));

      if (this.getValue('password') === this.getValue('confirmPassword')) {
        if (length && upperCase && specialCase) {
          this.enableResetPassword = false;
          return true;
        } else {
          this.enableResetPassword = true;
        }
      } else {
        this.enableResetPassword = true;
      }
      return false;
  }

  /**
   * Function to handle when create password form is submitted
   */
  onCreatePassword() {
  if (this.isFormValid() ) {
    const passwordData = this.createPasswordForm.getRawValue();
    passwordData.user_id = this.userID;
    this._userLoginService.createUpdatePassword(passwordData).subscribe(
      (data) => { this._router.navigate(['/login']); },
      (err) => this.errorMessage = messages.CREATE_PASSWORD_ERROR);
      } else {
        Utils.validateForm(this.createPasswordForm);
      }
  }

  /**
   * Function to check password length
   */
  passwordLength() { return { 'text-success': this.getValue('password').length > 7 }; }

  /**
   * Function to check password contains upper case character
   */
  upperCharacter() { return { 'text-success': this.getValue('password').search(/[A-Z]/) > -1 }; }

  /**
   * Function to check password contains special character
   */
  specialCharacter() { return { 'text-success': this.specialCharacterFormat.test(this.getValue('password')) }; }

  /**
   * Function to get form field value
   * @param  {string} field - field name
   */
  getValue(field: string) { return this.createPasswordForm.get(field).value; }

  removeMessages($event) {
    this.errorMessage = null;
  }

}
