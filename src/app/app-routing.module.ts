import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from '@modules/main/main.component';
import {LoginComponent} from '@modules/login/login.component';
import {ProfileComponent} from '@pages/profile/profile.component';
import {RegisterComponent} from '@modules/register/register.component';
import {DashboardComponent} from '@pages/dashboard/dashboard.component';
import {AuthGuard} from '@guards/auth.guard';
import {ForgotPasswordComponent} from '@modules/forgot-password/forgot-password.component';
import {RecoverPasswordComponent} from '@modules/recover-password/recover-password.component';
import {CreateProjectComponent} from "@pages/create-project/create-project.component";
import {ProjectsComponent} from "@pages/projects/projects.component";
import {ConclusionComponent} from "@pages/conclusion/conclusion.component";
import {CreateDocsComponent} from "@pages/create-docs/create-docs.component";
import {DocsComponent} from "@pages/docs/docs.component";
import {ProjectDetailsComponent} from "@pages/project-details/project-details.component";

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'create-docs',
        component: CreateDocsComponent
      },
      {
        path: 'docs',
        component: DocsComponent
      },
      {
        path: 'create',
        component: CreateProjectComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'conclusion',
        component: ConclusionComponent
      },
      {
        path: 'projects',
        component: ProjectsComponent
      },
      {
        path: 'projects/:id',
        component:ProjectDetailsComponent
      },
      {
        path: 'approved',
        component: ProjectsComponent
      },
      {
        path: 'rejected',
        component: ProjectsComponent
      },
      {
        path: 'unchecked',
        component: ProjectsComponent
      },
      {
        path: '',
        component: DashboardComponent
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent,
    // canActivate: [NonAuthGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    // canActivate: [NonAuthGuard]
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    // canActivate: [NonAuthGuard]
  },
  {
    path: 'recover-password',
    component: RecoverPasswordComponent,
    // canActivate: [NonAuthGuard]
  },
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
