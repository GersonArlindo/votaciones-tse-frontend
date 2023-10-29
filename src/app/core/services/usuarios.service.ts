import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HandlerErrorService } from './handler-error.service';
import { Observable, catchError, map } from 'rxjs';
import { environment } from '@encoding/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(
    private http:HttpClient,
    private router:Router,
    private HandlerErrorSrv: HandlerErrorService
  ) { }

  getUsuarios(token: any): Observable<any>{
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get<any>(`${environment.API_URL}usuarios`, { headers })
    .pipe(
      map((response:any) => response),
      catchError((err: any) => this.HandlerErrorSrv.handlerError(err))
    )
  }

  getUsuariosById(id: any, token: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<any>(`${environment.API_URL}usuarios/${id}`, { headers })
      .pipe(
        map((response: any) => response),
        catchError((err: any) => this.HandlerErrorSrv.handlerError(err))
      );
  }

  createUsuarios(data: FormData, token: any): Observable<any | void> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.post<any>(`${environment.API_URL}usuarios`, data, { headers })
      .pipe(
        map((res: any) => {
          return res;
        }),
        catchError((err) => this.HandlerErrorSrv.handlerError(err))
      );
  }

  updateUsuarios(data: FormData, id: any, token: any): Observable<any | void> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.put<any>(`${environment.API_URL}usuarios/${id}`, data, { headers })
      .pipe(
        map((res: any) => {
          return res;
        }),
        catchError((err) => this.HandlerErrorSrv.handlerError(err))
      );
  }
}
