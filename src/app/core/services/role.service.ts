import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@encoding/environment';
import { catchError, map, Observable } from 'rxjs';
import { role, roleMsg, roleRequest, roleRequestMsg, roleRes } from '../models/roles.interface';
import { HandlerErrorService } from './handler-error.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(
    private http:HttpClient,
    private router:Router,
    private HandlerErrorSrv: HandlerErrorService
  ) { }

  getRole(): Observable<role[]>{
    return this.http.get<roleRes>(`${environment.API_URL}role/show`)
    .pipe(
      map(
        response => response.role
      ),
      catchError((err: any) => this.HandlerErrorSrv.handlerError(err))
    )
  }

  getRoleById(id:any): Observable<role[]>{
    return this.http.get<roleRes>(`${environment.API_URL}role/show/${id}`)
    .pipe(
      map((response:any) => response.role)
    )
  }

  createRole(data:roleRequest) : Observable<roleRequestMsg | void>{
    return this.http.post<roleRequestMsg>(`${environment.API_URL}role/add`, data)
    .pipe(
      map((res:roleRequestMsg)=> {
        return res;
      }),
      catchError((err) => this.HandlerErrorSrv.handlerError(err))
    );
  }

  updateRole(data:roleRequest, id: any) : Observable<roleRequestMsg | void>{
    return this.http.put<roleRequestMsg>(`${environment.API_URL}role/update/${id}`, data)
    .pipe(
      map((res:roleRequestMsg)=> {
        return res;
      }),
      catchError((err) => this.HandlerErrorSrv.handlerError(err))
    );
  }

  deleteRole(id:any) : Observable<roleMsg>{
    return this.http.delete<roleMsg>(`${environment.API_URL}role/delete/${id}`)
    .pipe(
      map((res:roleMsg) => {
        return res;
      }),
      catchError((err) => this.HandlerErrorSrv.handlerError(err))
    )
  }
}
