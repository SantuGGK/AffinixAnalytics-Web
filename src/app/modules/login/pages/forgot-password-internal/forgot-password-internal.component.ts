import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Utils } from '@login/utils';
import {messages} from '@messages/messages';
@Component({
  selector: 'app-forgot-password-internal',
  templateUrl: './forgot-password-internal.component.html',
  styleUrls: ['./forgot-password-internal.component.scss']
})
export class ForgotPasswordInternalComponent implements OnInit {
  forgetPasswordInternalForm: FormGroup;
  errorMessage: string;
  private _userID: string;
  constructor(private _formBuilder: FormBuilder, private _router: Router) { }
  ngOnInit() {
    this.forgetPasswordInternalForm = this._formBuilder.group({});
  }
  removeMessages ($event) {
    this.errorMessage = null;
  }

}
