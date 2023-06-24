import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  
  constructor(private authLogin: AuthService, private router: Router){}

  canActivate(){
    if(this.authLogin.IsLoggedIn()){
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
  
}
