import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule} from "@angular/forms";
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
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptor} from "./core/interceptor/auth.interceptor";

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
    Error404Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgOptimizedImage
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
