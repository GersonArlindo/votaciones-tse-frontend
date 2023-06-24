import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@encoding/environment';
import { catchError, map, Observable } from 'rxjs';
import { HandlerErrorService } from './handler-error.service';
import { installers, installersGlobalMsg, installersMsg, installersRes } from '../models/installer.interface';

@Injectable({
  providedIn: 'root'
})
export class InstallerService {
  
  constructor( 
    private http:HttpClient,
    private router:Router,
    private HandlerErrorSrv: HandlerErrorService
  ) { }

  getInstaller(): Observable<installers[]>{
    return this.http.get<installersRes>(`${environment.API_URL}installers/show`)
    .pipe(
      map((response:any) => response.installers),
      catchError((err) => this.HandlerErrorSrv.handlerError(err))
    )
  }

  getInstallerById(id:any): Observable<installers[]>{
    return this.http.get<installersRes>(`${environment.API_URL}installers/show/${id}`)
    .pipe(
      map(
        (response:any) => response.installers
      ),
      catchError((err) => this.HandlerErrorSrv.handlerError(err))
    )
  }

  createInstaller(data: FormData) : Observable<installersMsg | void>{
    return this.http.post<installersMsg>(`${environment.API_URL}installers/add`, data)
    .pipe(
      map((res:installersMsg)=> {
        return res;
      }),
      catchError((err) => this.HandlerErrorSrv.handlerError(err))
    );
  }

  updateInstaller(data: FormData, id: any) : Observable<installersGlobalMsg | void>{
    return this.http.put<installersGlobalMsg>(`${environment.API_URL}installers/update/${id}`, data)
    .pipe(
      map((res:installersGlobalMsg)=> {
        return res;
      }),
      catchError((err) => this.HandlerErrorSrv.handlerError(err))
    );
  }

  deleteInstaller(id:any) : Observable<installersGlobalMsg>{
    return this.http.delete<installersGlobalMsg>(`${environment.API_URL}installers/delete/${id}`)
    .pipe(
      map((res:installersGlobalMsg) => {
        return res;
      }),
      catchError((err) => this.HandlerErrorSrv.handlerError(err))
    )
  }

}
