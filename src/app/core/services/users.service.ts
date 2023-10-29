import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { environment} from '@encoding/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { getUserResponse, users, getUserResponseData, reponseUserMsg } from '../models/auth.interface';
import { HandlerErrorService } from './handler-error.service';
const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient, private router: Router, private HandlerErrorSrv: HandlerErrorService) { }

  getUsers(token: any): Observable<any[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get<any>(`${environment.API_URL}usuarios`, {headers})
    .pipe(
      map(response => response)
    )
  }

  getUsuarioById(id:any, token: any): Observable<any[]>{
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get<any>(`${environment.API_URL}usuarios/${id}`, { headers })
    .pipe(
      map(
        response => response
      ),
      catchError((err: any) => this.HandlerErrorSrv.handlerError(err))
    )
  }

  createUsers(data: any, token: any) : Observable<any | void>{
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.post<any>(`${environment.API_URL_AUTH}usuarios`, data, {headers})
    .pipe(
      map((res:any)=> {
        return res;
      }),
      catchError((err) => this.HandlerErrorSrv.handlerError(err))
    );
  }

  updateUsers(data: any, id: any, token: any) : Observable<any | void>{
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.put<any>(`${environment.API_URL_AUTH}usuarios/${id}`, data, {headers})
    .pipe(
      map((res:any)=> {
        return res;
      }),
      catchError((err) => this.HandlerErrorSrv.handlerError(err))
    );
  }

  deleteUsers(id:any,token: any) : Observable<any>{
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.delete<any>(`${environment.API_URL_AUTH}usuarios/${id}`, {headers})
    .pipe(
      map((res:any) => {
        return res;
      }),
      catchError((err) => this.HandlerErrorSrv.handlerError(err))
    )
  }

}
