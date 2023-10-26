import { Component, OnInit } from '@angular/core';
import { users } from '@app/core/models/auth.interface';

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
    
  ) { }
  
  ngOnInit(): void {
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
