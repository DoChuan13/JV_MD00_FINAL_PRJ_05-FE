import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ChatComponent} from "./shared/component/user/chat/chat.component";
import {DashboardHomeComponent} from "./feature/dashboard/dashboard-home.component";
import {HomeComponent} from "./shared/component/user/home/home.component";
import {UserComponent} from "./shared/component/user/user/user.component";
import {Error404Component} from "./shared/component/common/error404/error404.component";
import {AdminComponent} from "./shared/component/admin/admin/admin.component";

const routes: Routes = [
  {
    path: "", component: DashboardHomeComponent, children: [
      {path: "", component: HomeComponent},
      {path: "user", component: UserComponent},
      {path: "chat", component: ChatComponent},
    ]
  },
  {path: "admin", component: AdminComponent},
  {path: "**", component: Error404Component},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
