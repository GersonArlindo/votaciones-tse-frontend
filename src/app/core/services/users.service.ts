import { HttpClient } from '@angular/common/http';
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

  getUsers(): Observable<users[]> {
    return this.http.get<getUserResponse>(`${environment.API_URL}user/show`)
    .pipe(
      map(response => response.users)
    )
  }

  getUserById(id: any): Observable<users[]> {
    return this.http.get<getUserResponseData>(`${environment.API_URL}user/show/${id}`)
    .pipe(
      map((response: any) => response.user)

    )
  }

  createUsers(data: FormData) : Observable<reponseUserMsg | void>{
    return this.http.post<reponseUserMsg>(`${environment.API_URL}user/add`, data)
    .pipe(
      map((res:reponseUserMsg)=> {
        return res;
      }),
      catchError((err) => this.HandlerErrorSrv.handlerError(err))
    );
  }

  updateUsers(data: FormData, id: any) : Observable<reponseUserMsg | void>{
    return this.http.put<reponseUserMsg>(`${environment.API_URL}user/update/${id}`, data)
    .pipe(
      map((res:reponseUserMsg)=> {
        return res;
      }),
      catchError((err) => this.HandlerErrorSrv.handlerError(err))
    );
  }
  
  deleteUsers(id:any) : Observable<reponseUserMsg>{
    return this.http.delete<reponseUserMsg>(`${environment.API_URL}user/delete/${id}`)
    .pipe(
      map((res:reponseUserMsg) => {
        return res;
      }),
      catchError((err) => this.HandlerErrorSrv.handlerError(err))
    )
  }
  
}
