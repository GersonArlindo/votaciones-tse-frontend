import { Component, OnInit } from '@angular/core';
import { users } from '@app/core/models/auth.interface';
import { UsersService } from '@app/core/services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public imageData: any;
  public users: users[] = [];
  public name: any;
  public lastName: any;
  public email: any;

  constructor(
    private UsersSrv: UsersService,
  ) { }
  
  ngOnInit(): void {
    this.getUsersById();
  }

  public getUsersById(){
    this.UsersSrv.getUserById(this.uid)
    .subscribe((next: any) => {
      this.imageData = next['user_images'];
      this.name = next['first_name'];
      this.lastName = next['last_name'];
      this.email = next['email'];
      this.users = next;
    })
  }

  getUserInfo() {
    const token = this.getTokens();
    let payload;
    if (token) {
      payload = token.split(".")[1];
      payload = window.atob(payload);
      return JSON.parse(payload)['uid'];
    } else {
      return null;
    }
  }
  
  getTokens() {
    return localStorage.getItem("login-token");
  }

  uid: any = this.getUserInfo();

}
