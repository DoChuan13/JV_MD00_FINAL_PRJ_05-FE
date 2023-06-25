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
import {adminAuthGuard} from "./guard/admin-auth.guard";
import {Error403Component} from "./shared/component/common/error403/error403.component";
import {authGuard} from "./guard/auth.guard";
import {FriendComponent} from "./shared/component/user/friend/friend.component";

const routes: Routes = [
  {
    path: "", component: DashboardHomeComponent, canActivate: [userAuthGuard], children: [
      {path: "", component: HomeComponent},
      {path: "user", component: UserComponent},
      {path: "chat", component: ChatComponent},
      {path: "friend", component: FriendComponent},
      {path: "friend/request", component: FriendComponent},
      {path: "friend/sent-request", component: FriendComponent},
      {path: "friend/search", component: FriendComponent},
      {path: "chat/session/:id", component: ChatComponent},
      {path: "chat/new", component: ChatComponent},
    ]
  },
  {path: "admin", component: AdminComponent, canActivate: [adminAuthGuard]},
  {path: "login", component: LoginComponent, canActivate: [authGuard]},
  {path: "register", component: RegisterComponent, canActivate: [authGuard]},
  {path: "forbidden", component: Error403Component},
  {path: "**", component: Error404Component},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
