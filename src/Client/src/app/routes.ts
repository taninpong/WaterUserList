import { Routes } from '@angular/router';
import { AssignJobComponent } from './assign-job/assign-job.component';
import { HomeComponent } from './home/home.component';
import { JobTrackComponent } from './job-track/job-track.component';
import { OpenTabletComponent } from './open-tablet/open-tablet.component';
import { ReportComponent } from './report/report.component';
import { StaffListComponent } from './staff-list/staff-list.component';
import { EditStaffComponent } from './edit-staff/edit-staff.component';
import { CreateStaffComponent } from './create-staff/create-staff.component';
import { UploadStaffComponent } from './upload-staff/upload-staff.component';
import { UploadEaComponent } from './upload-ea/upload-ea.component';
import { EaListComponent } from './ea-list/ea-list.component';
import { EditEaComponent } from './edit-ea/edit-ea.component';
import { CreateEaComponent } from './create-ea/create-ea.component';
import { ValidateJobComponent } from './validate-job/validate-job.component';
import { ValidateWc21Component } from './validate-wc-2-1/validate-wc-2-1.component';
import { HomeProgressReportComponent } from './home-progress-report/home-progress-report.component';
import { ValidateWc22Component } from './validate-wc-2-2/validate-wc-2-2.component';
import { TabletListComponent } from './tablet-list/tablet-list.component';
import { EditTabletComponent } from './edit-tablet/edit-tablet.component';
import { CreateTabletComponent } from './create-tablet/create-tablet.component';
import { ValidateWc22homeComponent } from './validate-wc-2-2home/validate-wc-2-2home.component';
import { UploadTabletComponent } from './upload-tablet/upload-tablet.component';
export const routes: Routes = [
    {
        path:'',
        component: HomeComponent
    },{
        path:'staff',
        component: StaffListComponent
    },{
        path:'opentablet',
        component: OpenTabletComponent
    },{
        path:'assign',
        component: AssignJobComponent
    },{
        path:'track',
        component: JobTrackComponent
    },{
        path:'report',
        component: ReportComponent
    },{
        path:'edit_user',
        component: EditStaffComponent
    },{
        path:'create_user',
        component: CreateStaffComponent
    },{
        path:'upload_user',
        component: UploadStaffComponent
    },{
        path:'upload_ea',
        component: UploadEaComponent
    },{
        path:'ea',
        component: EaListComponent
    },{
        path:'edit_ea',
        component: EditEaComponent
    },{
        path:'create_ea',
        component: CreateEaComponent
    },{
        path:'validate_job',
        component: ValidateJobComponent
    },{
        path:'validate_wc21',
        component: ValidateWc21Component
    },{
        path:'validate_wc22',
        component: ValidateWc22Component
    },{
        path:'tablet',
        component: TabletListComponent
    },{
        path:'edittablet',
        component: EditTabletComponent
    },{
        path:'createtablet',
        component: CreateTabletComponent
    },{
        path: 'validate_wc22home',
        component: ValidateWc22homeComponent
    },{
        path: 'progress_report',
        component: HomeProgressReportComponent
    },{
        path: 'upload_tablet',
        component: UploadTabletComponent
    }
];