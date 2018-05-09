import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import {LoginModule} from './modules/login/login.module';
import {DashboardModule} from '@dashboard/dashboard.module';

export function loadLoginModule() { return LoginModule; }
export function loadDashboardModule() { return DashboardModule; }

const routes: Routes = [
  { path: 'login', loadChildren: loadLoginModule },
  { path: 'dashboard', loadChildren: loadDashboardModule }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { }
