import { Component, OnInit,Input } from '@angular/core';
import { DashboardService } from '@dashboard/services/dashboard.service';
import { SharedService } from '@shared/services/shared.service';
import {messages} from '@messages/messages';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder  } from '@angular/forms';
import { UserLoginService } from '@login/services/user-login.service';
import {roles} from '@dashboard/roles.mapping';
import { DashboardSharedService } from '@dashboard/services/dashboard-shared.service';
import { Utils } from '@login/utils';
import { Location } from '@angular/common';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss']
})
export class DashboardHeaderComponent implements OnInit {

  constructor(
    private _dashboardService : DashboardService, 
    private _sharedService: SharedService, 
    private _router : Router,
    private _formBuilder: FormBuilder, 
    private _dashboardSharedService: DashboardSharedService, 
    private _userLoginService: UserLoginService,
    private _location: Location
  ) { }

  ngOnInit() {
  }
  logout() {
    this._sharedService.logoutUser();
    this._sharedService = null;
    this._dashboardService = null;
  }

}
