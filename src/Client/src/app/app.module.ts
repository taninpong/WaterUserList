import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TreeModule } from 'angular-tree-component';
import { SuiModule } from 'ng2-semantic-ui';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { QRCodeModule } from 'angular2-qrcode';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { routes } from './routes';

import { UserService } from './services/user.service';
import { AreasService } from './services/areas.service';
import { TabletService } from './services/tablet.service';
import { Sn22Service } from './services/sn22.service';

import { AppComponent } from './app.component';
import { AssignJobComponent } from './assign-job/assign-job.component';
import { HomeComponent } from './home/home.component';
import { StaffListComponent } from './staff-list/staff-list.component';
import { OpenTabletComponent } from './open-tablet/open-tablet.component';
import { JobTrackComponent } from './job-track/job-track.component';
import { ReportComponent } from './report/report.component';
import { EditStaffComponent } from './edit-staff/edit-staff.component';
import { CreateStaffComponent } from './create-staff/create-staff.component';
import { UploadStaffComponent } from './upload-staff/upload-staff.component';
import { UploadEaComponent } from './upload-ea/upload-ea.component';
import { EaListComponent } from './ea-list/ea-list.component';
import { EditEaComponent } from './edit-ea/edit-ea.component';
import { CreateEaComponent } from './create-ea/create-ea.component';
import { TabletListComponent } from './tablet-list/tablet-list.component';
import { ValidateJobComponent } from './validate-job/validate-job.component';
import { ValidateWc21Component } from './validate-wc-2-1/validate-wc-2-1.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ValidateWc22Component } from './validate-wc-2-2/validate-wc-2-2.component';
import { EditTabletComponent } from './edit-tablet/edit-tablet.component';
import { CreateTabletComponent } from './create-tablet/create-tablet.component';
import { ProgressReportComponent } from './progress-report/progress-report.component';
import { ProgressBarComponent } from './progress-report/progress-bar/progress-bar.component';
import { Sn1Service } from './services/sn1.service';
import { ValidateWc22homeComponent } from './validate-wc-2-2home/validate-wc-2-2home.component';
import { AssignReportComponent } from './assign-report/assign-report.component';
import { AssignProgressBarComponent } from './assign-report/assign-progress-bar/assign-progress-bar.component';
import { ProgressValidateComponent } from './progress-validate/progress-validate.component';
import { ProgressApproveComponent } from './progress-approve/progress-approve.component';
import { ProgressBarAllComponent } from './progress-report/progress-bar-all/progress-bar-all.component';
import { HomeProgressReportComponent } from './home-progress-report/home-progress-report.component';
import { HomeResultsReportComponent } from './home-results-report/home-results-report.component';
import { ResultsNumberBuildingReportComponent } from './results-number-building-report/results-number-building-report.component';
import { ResultsNumberHouseholdReportComponent } from './results-number-household-report/results-number-household-report.component';
import { ResultsTimeReportComponent } from './results-time-report/results-time-report.component';
import { UploadTabletComponent } from './upload-tablet/upload-tablet.component';
@NgModule({
  declarations: [
    AppComponent,
    AssignJobComponent,
    HomeComponent,
    StaffListComponent,
    OpenTabletComponent,
    JobTrackComponent,
    ReportComponent,
    EditStaffComponent,
    CreateStaffComponent,
    UploadStaffComponent,
    UploadEaComponent,
    EaListComponent,
    EditEaComponent,
    CreateEaComponent,
    TabletListComponent,
    ValidateJobComponent,
    ValidateWc21Component,
    ForgetPasswordComponent,
    ValidateWc22Component,
    EditTabletComponent,
    CreateTabletComponent,
    ProgressReportComponent,
    ProgressBarComponent,
    ValidateWc22homeComponent,
    AssignReportComponent,
    AssignProgressBarComponent,
    ProgressValidateComponent,
    ProgressApproveComponent,
    ProgressBarAllComponent,
    HomeProgressReportComponent,
    HomeResultsReportComponent,
    ResultsNumberBuildingReportComponent,
    ResultsNumberHouseholdReportComponent,
    ResultsTimeReportComponent,
    UploadTabletComponent,
  ],
  imports: [
    BrowserModule,
    TreeModule,
    SuiModule,
    RouterModule.forRoot(routes),
    FormsModule,
    QRCodeModule,
    NgxChartsModule,
    BrowserAnimationsModule
  ],
  providers: [ 
    UserService,
    AreasService,
    TabletService,
    Sn22Service,
    Sn1Service,
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
