import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@encoding/environment';
import { catchError, map, Observable } from 'rxjs';
import { HandlerErrorService } from './handler-error.service';

@Injectable({
  providedIn: 'root'
})
export class JrvService {

  constructor(
    private http:HttpClient,
    private router:Router,
    private HandlerErrorSrv: HandlerErrorService
  ) { }

  getJrv(): Observable<any[]>{
    return this.http.get<any>(`${environment.API_URL}junta-receptora-votos`)
    .pipe(
      map(
        response => response
      ),
      catchError((err: any) => this.HandlerErrorSrv.handlerError(err))
    )
  }

  getJrvById(id:any): Observable<any[]>{
    return this.http.get<any>(`${environment.API_URL}junta-receptora-votos/${id}`)
    .pipe(
      map((response:any) => response)
    )
  }

  createJrv(data:any) : Observable<any | void>{
    return this.http.post<any>(`${environment.API_URL}junta-receptora-votos`, data)
    .pipe(
      map((res:any)=> {
        return res;
      }),
      catchError((err) => this.HandlerErrorSrv.handlerError(err))
    );
  }

  updateJrv(data:any, id: any) : Observable<any | void>{
    return this.http.put<any>(`${environment.API_URL}junta-receptora-votos/${id}`, data)
    .pipe(
      map((res:any)=> {
        return res;
      }),
      catchError((err) => this.HandlerErrorSrv.handlerError(err))
    );
  }

  deleteJrv(id:any) : Observable<any>{
    return this.http.delete<any>(`${environment.API_URL}junta-receptora-votos/${id}`)
    .pipe(
      map((res:any) => {
        return res;
      }),
      catchError((err) => this.HandlerErrorSrv.handlerError(err))
    )
  }
}
