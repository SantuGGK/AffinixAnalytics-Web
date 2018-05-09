import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import {environment} from '@environments/environment';
import {api} from '@endpoint/api';
import * as CryptoJS from 'crypto-js';
import {roles} from '@dashboard/roles.mapping';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SharedService {
  datatable;
  fileItem;
  currentrow;
  entityTypes;
  userDetails;
  emitChangeSource = new Subject<any>();
  emitUserNameSource = new Subject<any>();
  emitIsPaid = new Subject<any>();
  constructor(private _http: HttpClient, private _router: Router) { }
  setAccessToken(token) {
    localStorage.setItem('affinix_accessToken', token);
  }

  getAccessToken() {
    const userID = localStorage.getItem('affinix_accessToken');
    if (userID) {
      return userID;
    } else {
       this._router.navigate(['/login']);
    }
  }

  /**
   * Function to set Refresh token
   * @param  {string} token - refresh token
   */
  setRefreshToken(token) {
    localStorage.setItem('affinix_refreshToken', token);
  }

  /**
   * Function to refresh token
   */
  refreshToken() {
    const headers = new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded');

    const body = new HttpParams()
      .set('client_id', environment.client_id)
      .set('client_secret', environment.client_secret)
      .set('grant_type', 'refresh_token')
      .set('refresh_token', localStorage.getItem('affinix_refreshToken'));
     
     return this._http.post(environment.EndPoint + api.REFRESH_TOKEN,  body.toString(), {headers}).map(
       (data) => {
         const token = `Bearer ${(<any>data).accessToken}`;
         this.setAccessToken(token);
         this.setRefreshToken((<any>data).refreshToken);
       })
        .catch( (err) => {
          this.logoutUser();
          this._router.navigate(['/login']);
          return  Observable.throw(new Error('Error Occurred while refreshing token.'));
        })
  }

  getRefreshToken() {
    const refreshToken = localStorage.getItem('affinix_refreshToken');
    if (refreshToken) {
      return refreshToken;
    } else {
       this._router.navigate(['/login']);
    }
  }

  logoutUser() {
    const token = this.getAccessToken();
    localStorage.removeItem('affinix_accessToken');
    localStorage.removeItem('affinix_userDetails');
    localStorage.removeItem('affinix_refreshToken');
    localStorage.removeItem('loggedInUserID');
    const headers = new HttpHeaders().set('Authorization', token);
    this._http.patch(environment.EndPoint + api.LOGOUT_USER, {}, {headers}).subscribe(
      (data) => {
      },
    (err) => {
      console.log('Error occurred while logging out user');
    })
  }

  setUserRole(role: string) {
    const ciphertext = CryptoJS.AES.encrypt(role, environment.encryptionKey);
    localStorage.setItem('affinix_userDetails', ciphertext.toString());
  }

  getUserRole(roleName) {
    const userDetails = localStorage.getItem('affinix_userDetails');
    if (userDetails) {
      let bytes = CryptoJS.AES.decrypt(userDetails.toString(), environment.encryptionKey);
      if(bytes.toString(CryptoJS.enc.Utf8).toLowerCase() === roleName) {
        return true;
      } else {
        return false;
      }
    } else {
       this._router.navigate(['/login']);
    }
  }

  /**
   * Function to get details of authenticated user
   * @param  {Object} token - Authorization token
   */
  getAuthenticateUserDetails (token) {
    const headers = new HttpHeaders().set('Authorization', token);
    return this._http.get(environment.EndPoint + api.GET_USER_DETAILS + `?t=${(new Date()).getTime()}`, {headers});
  }

  setUserDetails(details) {
    this.userDetails = details;
  }

  getUserDetails() {
    return this.userDetails;
  }

  setDataTable(table) {
    this.datatable = table;
  }

  getDataTable() {
    return this.datatable;
  }

  setCurrentRow(row) {
    this.currentrow = row;
  }

  getCurrentRow() {
    return this.currentrow;
  }
  setCurrentLoggedInRole(role_userID) {
    localStorage.setItem('loggedInUserID', btoa(role_userID));
  }

  getCurrentLoggedInRole() {
    return atob(localStorage.getItem('loggedInUserID'));
  }

  // Emitter to update notifications count in dashboard header.
  changeEmitted$ = this.emitChangeSource.asObservable();
  emitChange(change: any) {
      this.emitChangeSource.next(change);
  }
  //Emitter to update username in header
  usernameEmitted$ = this.emitUserNameSource.asObservable();
  emitUserName(change:any) {
    this.emitUserNameSource.next(change);
  }

  //Emitter to update sider-bar based on payment
  isPaidEmitted$ = this.emitIsPaid.asObservable();
  emitPayment(change:any) {
    this.emitIsPaid.next(change);
  }

}
