import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@encoding/environment';
import { catchError, map } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { permissionGlobalMsg, permissionMsg, permission, permissionsRes, permissionByModule, permissionByModuleRes } from '../models/permission.interface';
import { HandlerErrorService } from './handler-error.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(
    private http:HttpClient,
    private router:Router,
    private HandlerErrorSrv: HandlerErrorService
  ) { }

  getPermissions(): Observable<permission[]>{
    return this.http.get<permissionsRes>(`${environment.API_URL}permission/show`)
    .pipe(
      map((response:any) => response.permission),
      catchError((err) => this.HandlerErrorSrv.handlerError(err))
    )
  }

  getPermissionsByRole(id: any): Observable<permission[]>{
    return this.http.get<permissionsRes>(`${environment.API_URL}permission/show/role/${id}`)
    .pipe(
      map((response:any) => response.permission),
      catchError((err) => this.HandlerErrorSrv.handlerError(err))
    )
  }

  getPermissionsByModuleId(id:any): Observable<permissionByModule[]>{
    return this.http.get<permissionByModuleRes>(`${environment.API_URL}module/show/${id}`)
    .pipe(
      map((response:any) => response.permission),
      catchError((err) => this.HandlerErrorSrv.handlerError(err))
    )
  }

  getPermissionsById(id:any): Observable<permission[]>{
    return this.http.get<permissionsRes>(`${environment.API_URL}permission/show/${id}`)
    .pipe(
      map(
        (response:any) => response.permission
      ),
      catchError((err) => this.HandlerErrorSrv.handlerError(err))
    )
  }

  createPermissions(data: FormData) : Observable<permissionMsg | void>{
    return this.http.post<permissionMsg>(`${environment.API_URL}permission/add`, data)
    .pipe(
      map((res:permissionMsg)=> {
        return res;
      }),
      catchError((err) => this.HandlerErrorSrv.handlerError(err))
    );
  }

  updatePermissions(data: FormData, id: any) : Observable<permissionGlobalMsg | void>{
    return this.http.put<permissionGlobalMsg>(`${environment.API_URL}permission/update/${id}`, data)
    .pipe(
      map((res:permissionGlobalMsg)=> {
        return res;
      }),
      catchError((err) => this.HandlerErrorSrv.handlerError(err))
    );
  }

  deletePermissions(id:any) : Observable<permissionGlobalMsg>{
    return this.http.delete<permissionGlobalMsg>(`${environment.API_URL}permission/delete/${id}`)
    .pipe(
      map((res:permissionGlobalMsg) => {
        return res;
      }),
      catchError((err) => this.HandlerErrorSrv.handlerError(err))
    )
  }

  changePermissionByTyped(status: any, type: any, id: any){
    return this.http.get(`${environment.API_URL}permission/change/${status}?type=${type}&id=${id}`)
  }
}
