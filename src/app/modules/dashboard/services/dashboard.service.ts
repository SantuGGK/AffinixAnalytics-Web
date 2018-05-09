import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import {environment} from '@environments/environment';
import {api} from '@endpoint/api';
import {SharedService} from '@shared/services/shared.service';
@Injectable()
export class DashboardService {
  token;
  headers: HttpHeaders;
  constructor(private _http: HttpClient, private _sharedService: SharedService) { }
  getHeaders() {
      this.token = this._sharedService.getAccessToken();
      return new HttpHeaders().set('Authorization', this.token);
   }

}
