import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as DM from './dashboardImports';
import { HttpInterceptorService } from '@dashboard/services/interceptors/http-interceptor.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
@NgModule({
  imports: [
    CommonModule,
    DM.DashboardRoutingModule,
    DM.SharedModule,
    DM.ReactiveFormsModule,
    DM.FormsModule
  ],
  declarations: [DM.DashboardContentComponent, DM.DashboardHeaderComponent, DM.DashboardFooterComponent, DM.DashboardSidebarComponent, DM.DashboardComponent, DM.TestComponent],
  providers: [DM.DashboardService, DM.DashboardSharedService, DM.TestGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpInterceptorService,
    multi: true,
  }]
})
export class DashboardModule { }
