import { login, loginRes } from '@models/auth.interface';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, throwError } from 'rxjs';
import { environment} from '@encoding/environment';
import {catchError} from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private router: Router, 
    private spinner: NgxSpinnerService,

  ) { 
    this.checkToken();
  }

  get isLogged(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  login(authData: login):Observable<loginRes | void> {
    return this.http
    .post<loginRes>(`${environment.API_URL}auth/login`, authData)
    .pipe(
      map((res: loginRes) =>{
        //save token
        this.saveToken(res.token);
        this.loggedIn.next(true);
        return res;
      }),
      catchError((err: HttpErrorResponse) => this.handlerError(err))
    );
  }

  logout():void{
    localStorage.removeItem('login-token');

    this.loggedIn.next(false);

    setTimeout(() =>{
      let currentUrl = this.router.url;
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate([currentUrl]);
    }, 100); 
  }

  private checkToken(): void{
    let userToken = localStorage.getItem('login-token') as string;
    const isExpired = helper.isTokenExpired(userToken);
    if(isExpired) {
      this.logout();
    }else{
      this.loggedIn.next(true);
    }
  }

  private saveToken(token:string):void{
    localStorage.setItem('login-token', token);
  
  }

  IsLoggedIn() {
    return localStorage.getItem('login-token') != null; 
  }

  private handlerError(err: { message: any; }): Observable<never> {
    let errorMessage = 'An errror occured retrienving data';
    if (err) {
      this.spinner.hide();
      errorMessage = `Error: code ${err.message}`;
    }
    return throwError(errorMessage);
  }


}
