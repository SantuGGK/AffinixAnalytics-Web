import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Utils } from '@login/utils';
import { UserLoginService } from '@login/services/user-login.service';
import {messages} from '@messages/messages';
@Component({
  selector: 'app-passcode-sent',
  templateUrl: './passcode-sent.component.html',
  styleUrls: ['./passcode-sent.component.scss']
})
export class PasscodeSentComponent implements OnInit, OnDestroy {

  passcodeSentForm: FormGroup;
  passcodeValid: Boolean = false;
  passcode_userID: string = localStorage.getItem('affinix_passcode_userID');
  errorMessage: string;
  userPasscode: string;
  successMessage: string;
  validationMessage: Boolean = false;
  
  validationMessages = {
    pincode: messages.PIN_CODE
  };
  constructor (private _router: Router, private formBuilder: FormBuilder, private _userLoginService: UserLoginService,
  private _activatedRoute: ActivatedRoute) { }

  /**
   * Function executes when passcode sent component is created
   */
  ngOnInit () {
      this.passcodeSentForm = this.formBuilder.group({
          codeOne: new FormControl('', [Validators.required]),
          codeTwo: new FormControl('', [Validators.required]),
          codeThree: new FormControl('', [Validators.required]),
          codeFour: new FormControl('', [Validators.required]),
          codeFive: new FormControl('', [Validators.required]),
          codeSix: new FormControl('', [Validators.required])
      });

    this._activatedRoute.params.subscribe((params: Params) => {
      if (params['id']) {
        this.passcode_userID = params['id'];
      }
    });

  }

  /**
   * Function executed when user navigate away from the component
   */
  ngOnDestroy () {
    localStorage.removeItem('affinix_passcode_userID');
  }
/**
   * Function to check the validity of fields in passcode sent form
   * @param  {string} field - Field name
   */
  isFormValid () {
     return !this.passcodeSentForm.valid && this.passcodeSentForm.touched;
  }

  /**
   * Function to move focus to next input field
   * @param  {} value - Value of input field
   * @param  {} nextField - Id of Next field where focus need to shift
   */
  moveToNext (value, nextField) {
    if (value.length === 1 && nextField) {
      $(`#${nextField}`).val('');
      $(`#${nextField}`).focus();
    }
  }

  /**
   * Function to handle when passcode sent form is submitted
   */
  onPasscodeSent () {
    this.errorMessage = null;
    this.successMessage = null;
    if (this.passcodeSentForm.valid) {
      const passcode = this.passcodeSentForm.value;
      this.userPasscode = passcode.codeOne + passcode.codeTwo + passcode.codeThree
      + passcode.codeFour + passcode.codeFive + passcode.codeSix;

      this._userLoginService.verifyPasscode (this.passcode_userID, this.userPasscode, 0).subscribe (
      (data) =>  this.successResponse (data),
      (err) => this.errorMessage = err.error.message);
    } else {
      this.validationMessage = true;
      this.errorMessage = this.validationMessages.pincode;
    }
  }

  /**
   * Function executed when passcode is verified
   * @param  {Object} response - Response Object
   */
  successResponse (response) {
    if (response.length) {
      this._router.navigate (['/createpassword', this.passcode_userID, this.userPasscode, 0]);
    } else {
      this.errorMessage = messages.INCORRECT_PASSCODE_ERROR;
    }
  }


  /**
   * Function to resend passcode
   */
  resendPasscode () {
    this.validationMessage = false;
    if (this.passcode_userID) {
    this._userLoginService.resendPasscode (this.passcode_userID).subscribe (
      (data) => {
        this.errorMessage = null;
        this.successMessage = messages.SUCCESS_PASSCODE_RESEND;
      },
      (err) => this.errorMessage = messages.ERROR_PASSCODE_RESEND
    );
    } else {
      this.errorMessage = messages.ERROR_PASSCODE;
    }
  }

  removeMessages ($event) {
    this.validationMessage = false;
    this.errorMessage = null;
    this.successMessage = null;
  }

}
