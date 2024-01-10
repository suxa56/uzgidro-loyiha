import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from '@/app-routing.module';
import {AppComponent} from './app.component';
import {MainComponent} from '@modules/main/main.component';
import {LoginComponent} from '@modules/login/login.component';
import {HeaderComponent} from '@modules/main/header/header.component';
import {FooterComponent} from '@modules/main/footer/footer.component';
import {MenuSidebarComponent} from '@modules/main/menu-sidebar/menu-sidebar.component';
import {BlankComponent} from '@pages/blank/blank.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ProfileComponent} from '@pages/profile/profile.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RegisterComponent} from '@modules/register/register.component';
import {DashboardComponent} from '@pages/dashboard/dashboard.component';
import {ToastrModule} from 'ngx-toastr';
import {MessagesComponent} from '@modules/main/header/messages/messages.component';
import {NotificationsComponent} from '@modules/main/header/notifications/notifications.component';

import {CommonModule, registerLocaleData} from '@angular/common';
import localeEn from '@angular/common/locales/en';
import {UserComponent} from '@modules/main/header/user/user.component';
import {ForgotPasswordComponent} from '@modules/forgot-password/forgot-password.component';
import {RecoverPasswordComponent} from '@modules/recover-password/recover-password.component';
import {LanguageComponent} from '@modules/main/header/language/language.component';
import {MainMenuComponent} from '@pages/main-menu/main-menu.component';
import {SubMenuComponent} from '@pages/main-menu/sub-menu/sub-menu.component';
import {MenuItemComponent} from '@components/menu-item/menu-item.component';
import {ControlSidebarComponent} from '@modules/main/control-sidebar/control-sidebar.component';
import {StoreModule} from '@ngrx/store';
import {authReducer} from './store/auth/reducer';
import {uiReducer} from './store/ui/reducer';
import {ProfabricComponentsModule} from '@profabric/angular-components';
import {SidebarSearchComponent} from '@components/sidebar-search/sidebar-search.component';
import {CreateProjectComponent} from '@pages/create-project/create-project.component';
import {ProjectsComponent} from '@pages/projects/projects.component';
import {ProjectItemComponent} from '@components/project-item/project-item.component';
import {ConclusionComponent} from '@pages/conclusion/conclusion.component';
import {CreateDocsComponent} from '@pages/create-docs/create-docs.component';
import { DocsComponent } from '@pages/docs/docs.component';
import { DocsItemComponent } from '@components/docs-item/docs-item.component';
import { SupervisorProjectItemsComponent } from '@components/supervisor-project-items/supervisor-project-items.component';
import { ProjectDetailsComponent } from '@pages/project-details/project-details.component';

import {MatDialogModule} from '@angular/material/dialog';
import { FilesModalComponent } from './components/files-modal/files-modal.component';
import { CommentModalComponent } from './components/comment-modal/comment-modal.component';

registerLocaleData(localeEn, 'en-EN');

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    MenuSidebarComponent,
    BlankComponent,
    ProfileComponent,
    RegisterComponent,
    DashboardComponent,
    MessagesComponent,
    NotificationsComponent,
    UserComponent,
    ForgotPasswordComponent,
    RecoverPasswordComponent,
    LanguageComponent,
    MainMenuComponent,
    SubMenuComponent,
    MenuItemComponent,
    ControlSidebarComponent,
    SidebarSearchComponent,
    CreateProjectComponent,
    ProjectsComponent,
    ProjectItemComponent,
    ConclusionComponent,
    CreateDocsComponent,
    DocsComponent,
    DocsItemComponent,
    SupervisorProjectItemsComponent,
    ProjectDetailsComponent,
    FilesModalComponent,
    CommentModalComponent
  ],
    imports: [
        ProfabricComponentsModule,
        CommonModule,
        BrowserModule,
        StoreModule.forRoot({auth: authReducer, ui: uiReducer}),
        HttpClientModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot({
            timeOut: 3000,
            positionClass: 'toast-top-right',
            preventDuplicates: true
        }),
        MatDialogModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
