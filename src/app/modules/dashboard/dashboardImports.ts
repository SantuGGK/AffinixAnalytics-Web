export { DashboardRoutingModule } from './dashboard.routing.module';

export { DashboardComponent } from './dashboard.component';
export { DashboardHeaderComponent } from './layouts/header/dashboard-header.component';
export { DashboardFooterComponent } from './layouts/footer/dashboard-footer.component';
export { DashboardContentComponent } from './layouts/content/dashboard-content.component';
export { DashboardSidebarComponent } from './layouts/sidebar/dashboard-sidebar.component';

export {SharedModule} from '@shared/shared.module';
export { ReactiveFormsModule, FormsModule } from '@angular/forms';

export { DashboardSharedService } from './services/dashboard-shared.service';
export { DashboardService } from './services/dashboard.service';

export {TestComponent} from './components/test/test.component';

export { TestGuard } from './guards/test.guard';