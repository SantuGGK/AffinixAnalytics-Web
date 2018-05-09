import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login.component';
import {LoginFormComponent} from './pages/login-form/login-form.component';
import {ForgotPasswordComponent} from './pages/forgot-password/forgot-password.component';
import {ForgotPasswordInternalComponent} from './pages/forgot-password-internal/forgot-password-internal.component';
import {PasscodeSentComponent} from './pages/passcode-sent/passcode-sent.component';
import {CreatePasswordComponent} from './pages/create-password/create-password.component';
const loginRoutes: Routes = [
  {path: '', component: LoginComponent, children: [
        {path: '', component: LoginFormComponent},
        {path: 'forgotpassword', component: ForgotPasswordComponent},
        {path: 'forgotpasswordinternal', component: ForgotPasswordInternalComponent},
        {path: 'passcodesent', component: PasscodeSentComponent},
        {path: 'passcodesent/:id', component: PasscodeSentComponent},
        {path: 'createpassword/:id/:passcode/:q', component: CreatePasswordComponent},

        
    ]}
];

export const LoginRoutingModule = RouterModule.forChild(loginRoutes);

