import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './dashboard.component';
import {testRoutes} from './components/test/test.routes';
import {TestGuard} from './guards/test.guard';
const dashboardRoutes: Routes = [
   {path: '', component: DashboardComponent, children: [
       {path: 'test',canActivateChild: [TestGuard], children: testRoutes},
   ]}
];

export const DashboardRoutingModule = RouterModule.forChild(dashboardRoutes);