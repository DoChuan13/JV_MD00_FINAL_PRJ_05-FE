import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ChatComponent} from './shared/component/user/chat/chat.component';
import {DashboardHomeComponent} from './feature/dashboard/dashboard-home.component';
import {NavbarComponent} from './feature/layout/navbar/navbar.component';
import {FooterComponent} from './feature/layout/footer/footer.component';
import {HomeComponent} from './shared/component/user/home/home.component';
import {AdminComponent} from './shared/component/admin/admin/admin.component';
import {LoginComponent} from './shared/component/common/login/login.component';
import {RegisterComponent} from './shared/component/common/register/register.component';
import {UserComponent} from './shared/component/user/user/user.component';
import {NgOptimizedImage} from "@angular/common";
import {Error404Component} from './shared/component/common/error404/error404.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "./core/interceptor/auth.interceptor";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule} from "@angular/material/card";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../environments/environment";
import {MatInputModule} from "@angular/material/input";
import {Error403Component} from './shared/component/common/error403/error403.component';
import {PostDialogComponent} from './shared/component/element/post-dialog/post-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import { PostFormComponent } from './shared/component/element/post-form/post-form.component';
import {MatSelectModule} from "@angular/material/select";
import {MatIconModule} from "@angular/material/icon";
import { UploadMultiComponent } from './feature/upload/upload-multi/upload-multi.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    DashboardHomeComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    AdminComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    Error404Component,
    Error403Component,
    PostDialogComponent,
    PostFormComponent,
    UploadMultiComponent
  ],
    imports: [
      BrowserModule,
      AppRoutingModule,
      FormsModule,
      NgOptimizedImage,
      ReactiveFormsModule,
      BrowserAnimationsModule,
      MatCardModule,
      AngularFireStorageModule,
      HttpClientModule,
      MatInputModule,
      MatDialogModule,
      MatButtonModule,
      MatSelectModule,
      MatIconModule,
      MatProgressSpinnerModule,
      AngularFireModule.initializeApp(environment.firebaseConfig),
    ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
