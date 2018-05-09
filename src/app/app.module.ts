import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { LoginModule } from './modules/login/login.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import {ErrorMessageService} from './error.message.service';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import * as $ from 'jquery';
import * as bootstrap from 'bootstrap';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    LoginModule,
    DashboardModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ErrorMessageService],
  bootstrap: [AppComponent]
})

export class AppModule {

  
 }
