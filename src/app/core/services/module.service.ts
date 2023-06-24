import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable } from 'rxjs';
import { module, moduleMsg, moduleRequest, moduleRequestMsg, moduleRes} from '../models/modules.interface';
import { environment} from '@encoding/environment';
import { HandlerErrorService } from './handler-error.service';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {

  constructor(
    private http:HttpClient,
    private router:Router,
    private HandlerErrorSrv: HandlerErrorService

  ) { }

  getModules(): Observable<module[]>{
    return this.http.get<moduleRes>(`${environment.API_URL}module/show`)
    .pipe(
      map((response:any) => response.module),
      catchError((err) => this.HandlerErrorSrv.handlerError(err))
    )
  }

  getModuleByIdRole(id: any): Observable<module[]> {
    return this.http.get<moduleRes>(`${environment.API_URL}module/rol_id/${id}`)
    .pipe(
      map((response) => response.module)
    )
  }

  getModulesById(id:any): Observable<module[]>{
    return this.http.get<moduleRes>(`${environment.API_URL}module/show/${id}`)
    .pipe(
      map((response:any) => response.module),
      catchError((err) => this.HandlerErrorSrv.handlerError(err))
    )
  }
  createModule(data:moduleRequest) : Observable<moduleRequestMsg | void>{
    return this.http.post<moduleRequestMsg>(`${environment.API_URL}module/add`, data)
    .pipe(
      map((res:moduleRequestMsg)=> {
        return res;
      }),
      catchError((err) => this.HandlerErrorSrv.handlerError(err))
    );
  }
  updateModule(data:moduleRequest, id: any) : Observable<moduleRequestMsg | void>{
    return this.http.put<moduleRequestMsg>(`${environment.API_URL}module/update/${id}`, data)
    .pipe(
      map((res:moduleRequestMsg)=> {
        return res;
      }),
      catchError((err) => this.HandlerErrorSrv.handlerError(err))
    );
  }
  deleteModule(id:any) : Observable<moduleMsg>{
    return this.http.delete<moduleMsg>(`${environment.API_URL}module/delete/${id}`)
    .pipe(
      map((res:moduleMsg) => {
        return res;
      }),
      catchError((err) => this.HandlerErrorSrv.handlerError(err))
    )
  }
}
