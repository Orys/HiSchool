import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TimetableComponent } from './components/timetable/timetable.component';
import { NoticesComponent } from './components/notices/notices.component';
import { SendNoticeComponent } from './components/send-notice/send-notice.component';

const appRoutes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'student', component: TimetableComponent/*, canActivate: [PatientGuard]*/ },
  { path: 'parent', component: TimetableComponent/*, canActivate: [PatientGuard] */},
  { path: 'secretary', component: TimetableComponent/*, canActivate: [PatientGuard]*/ },
  { path: 'admin', component: TimetableComponent/*, canActivate: [PatientGuard] */},
  { path: 'notices', component: NoticesComponent },
  { path: 'send_notice', component: SendNoticeComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    TimetableComponent,
    NoticesComponent,
    SendNoticeComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false }
    ),
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
