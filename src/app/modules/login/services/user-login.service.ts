import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import {environment} from '@environments/environment';
import { Login } from '@login/interfaces/login.interface';
import {api} from '@endpoint/api';

@Injectable()
export class UserLoginService {
  private _email: string;
  multiRoles;
  constructor(private _http: HttpClient) { }

  /**
   * Function to validate email address
   * @param  {Object} data - Email to validate
   */
  validateEmail (data) {
    data.email = data.email.toLowerCase();
    const headers = { 'Accept': 'application/json' };
    const params = { 'params': headers };
    return this._http.post(environment.EndPoint + api.VERIFY_EMAIL, data, params);
  }

  /**
   * Function to generate access token
   * @param  {Login} data - Form data
   */
  loginUser (data: Login) {
    data.username = data.username.toLowerCase();
    const headers = new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded');

    const body = new HttpParams()
      .set('username', data.username)
      .set('password', data.password)
      .set('grant_type', data.grant_type)
      .set('client_id', data.client_id)
      .set('client_secret', data.client_secret);
    return this._http.post(environment.EndPoint + api.AUTHENTICATE_USER,  body.toString(), {headers});
  }

  /**
   * Function to verify passcode
   * @param  {string} userID - user ID of user
   * @param  {string} passcode - passcode that needs to be verify
   */
  verifyPasscode (userID: string, passcode: string, setupAccount: Number) {
    const headers = { 'Accept': 'application/json' };
    const params = { 'params': headers };
    return this._http.get(environment.EndPoint + api.VERIFY_PASSCODE + `/${userID}/${passcode}/${setupAccount}`, params);
  }

  createUpdatePassword(data) {
    const headers = { 'Accept': 'application/json' };
    const params = { 'params': headers };
    return this._http.put(environment.EndPoint + api.CREATE_PASSWORD, data, params);
  }

  resendPasscode(userID: string) {
    const headers = { 'Accept': 'application/json' };
    const params = { 'params': headers };
    return this._http.get(environment.EndPoint + api.RESEND_PASSCODE + `${userID}`, params);
  }

}
