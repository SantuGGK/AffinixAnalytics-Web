import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import {LoginModule} from './modules/login/login.module';

export function loadLoginModule() { return LoginModule; }
const routes: Routes = [
  { path: 'login', loadChildren: loadLoginModule }  
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { }
