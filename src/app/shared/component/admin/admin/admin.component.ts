import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {UserService} from "../../../../service/user/user.service";
import {User} from "../../../../core/model/basic/User";
import {TokenService} from "../../../../service/token/token.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  public role: any;
  public status = "";
  displayedColumns: string[] = ['id', 'userName', 'name', 'email', 'role', 'status', 'action'];
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  private userList: User[] = [];
  // @ts-ignore
  dataSource = new MatTableDataSource<User>(this.userList);

  constructor(
    private tokenService: TokenService,
    private userService: UserService) {
  }

  ngAfterViewInit() {
    // @ts-ignore
    this.dataSource.paginator = this.paginator;
  }

  ChangeRole(element: any) {
    let newRole = [];
    if (element.roles[0].roleName == "PM") {
      newRole.push("USER");
    }
    if (element.roles[0].roleName == "USER") {
      newRole.push("PM");
    }
    this.userService.changeRoleAcc(element.id, {"roles": newRole}).subscribe(data => {
      console.log(data)
      if (data.message == 'User Role Update Success!!!') {
        this.loadDatabase();
      }
      this.status = data.message;
    })
  }

  BlockUser(element: any) {
    this.userService.blockUserAcc(element.id).subscribe(data => {
      console.log(data)
      if (data.message == 'Block Account Success!!!' ||
        data.message == "Unblock Account Success!!!") {
        this.loadDatabase();
      }
      this.status = data.message;
    })
  }

  DeleteUser(element: any) {
    console.log(element);
    this.userService.deleteUserAcc(element.id).subscribe(data => {
      console.log(data);
      if (data.message == 'Account Deleted Success!!!') {
        this.loadDatabase();
      }
      this.status = data.message;
    })
  }

  ngOnInit()
    :
    void {
    this.loadDatabase();
  }

  loadDatabase() {
    this.role = "PM";
    // @ts-ignore
    this.tokenService.getRoles().forEach((role: any) => {
      console.log(role)
      if (role == "ADMIN") {
        this.role = "ADMIN";
      }
    })
    this.userService.getAllUserList().subscribe(data => {
      this.userList = data;
      this.dataSource = new MatTableDataSource<User>(this.userList);
      // @ts-ignore
      this.dataSource.paginator = this.paginator;
    })
  }
}
