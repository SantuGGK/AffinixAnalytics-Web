import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';

import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ForgotPasswordInternalComponent } from './pages/forgot-password-internal/forgot-password-internal.component';
import { PasscodeSentComponent } from './pages/passcode-sent/passcode-sent.component';
import { CreatePasswordComponent } from './pages/create-password/create-password.component';
import { LoginFormComponent } from './pages/login-form/login-form.component';
import { UserLoginService } from './services/user-login.service';
import {SharedModule} from '@shared/shared.module';
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LoginRoutingModule,
    SharedModule
  ],
  declarations: [
    LoginComponent,
    LoginFormComponent,
    ForgotPasswordComponent,
    ForgotPasswordInternalComponent,
    PasscodeSentComponent,
    CreatePasswordComponent
  ],
  providers: [UserLoginService]
})
export class LoginModule { }
