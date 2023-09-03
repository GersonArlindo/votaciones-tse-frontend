import { Component, OnInit, ViewChild, ElementRef, Inject, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '@app/core/services/auth.service';
import { UsersService } from '@app/core/services/users.service';
import { users } from '@app/core/models/auth.interface';
import { environment } from '@encoding/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public imageData: any;
  public users: users[] = [];
  public name: any;
  public lastName: any;
  public email: any;

  constructor(
    @Inject(DOCUMENT) private document: Document, 
    private renderer: Renderer2,
    private router: Router,
    private authSvc: AuthService, 
    private UsersSrv: UsersService,

  ) { }

  ngOnInit(): void {
    this.getUsersById();
  }

  public getUsersById(){
    this.UsersSrv.getUserById(this.uid)
    .subscribe((next: any) => {
      console.log(next)
      this.imageData = `${environment.API_URL_AUTH}images/${next['user_images']}`;
      this.name = next['first_name'];
      this.lastName = next['last_name'];
      this.email = next['email'];
      this.users = next;
    })
  }

  /**
   * Sidebar toggle on hamburger button click
   */
  toggleSidebar(e: Event) {
    e.preventDefault();
    this.document.body.classList.toggle('sidebar-open');
  }

  /**
   * Logout
   */

  onLogout(): void{
    this.authSvc.logout();
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
