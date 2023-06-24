import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authSvc: AuthService){}
  canActivate(): Observable<boolean>{
    return this.authSvc.isLogged.pipe(
      take(1),
      map((isLogged: boolean) => !isLogged)
    );
  }

}
