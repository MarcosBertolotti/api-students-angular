import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentAddComponent } from './components/student-add/student-add.component';
import { StudentListComponent } from './components/student-list/student-list.component';
import { StudentViewComponent } from './components/student-view/student-view.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { StudentUpdateComponent } from './components/student-update/student-update.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { LogoutComponent } from './components/logout/logout.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: 'add', component: StudentAddComponent, canActivate: [AuthGuard]},
  { path: 'list', component: StudentListComponent, canActivate: [AuthGuard] },
  { path: 'view/:id', component: StudentViewComponent, canActivate: [AuthGuard] },
  { path: 'update/:id', component: StudentUpdateComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent },
  { path: 'logout', component: LogoutComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      { enableTracing: true } // <!-- debugging purposes only
      )
    ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule { }
