import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ChatComponent} from "./shared/component/user/chat/chat.component";
import {DashboardHomeComponent} from "./feature/dashboard/dashboard-home.component";
import {HomeComponent} from "./shared/component/user/home/home.component";
import {UserComponent} from "./shared/component/user/user/user.component";
import {Error404Component} from "./shared/component/common/error404/error404.component";
import {AdminComponent} from "./shared/component/admin/admin/admin.component";
import {userAuthGuard} from "./guard/user-auth.guard";
import {LoginComponent} from "./shared/component/common/login/login.component";
import {RegisterComponent} from "./shared/component/common/register/register.component";

const routes: Routes = [
  {
    path: "", component: DashboardHomeComponent, canActivate: [userAuthGuard], children: [
      {path: "", component: HomeComponent},
      {path: "user", component: UserComponent},
      {path: "chat", component: ChatComponent},
    ]
  },
  {path: "admin", component: AdminComponent},
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "**", component: Error404Component},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
