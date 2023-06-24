import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@encoding/environment';
import { catchError, map, Observable } from 'rxjs';
import { timezone, timezoneMsg, timezoneRequest, timezoneRequestMsg, timezoneRes } from '../models/timezone.interface';
import { HandlerErrorService } from './handler-error.service';

@Injectable({
  providedIn: 'root'
})
export class TimezoneService {

  constructor(private http:HttpClient,
    private router:Router,
    private HandlerErrorSrv: HandlerErrorService
  ) { }
  gettimezone(): Observable<timezone[]>{
    return this.http.get<timezoneRes>(`${environment.API_URL}timezone/show`)
    .pipe(
      map((response:any) => response.timezone)
    )
  }
  gettimezoneById(id:any): Observable<timezone[]>{
    return this.http.get<timezoneRes>(`${environment.API_URL}timezone/show/${id}`)
    .pipe(
      map((response:any) => response.timezone)
    )
  }
  createtimezone(data:timezoneRequest) : Observable<timezoneRequestMsg | void>{
    return this.http.post<timezoneRequestMsg>(`${environment.API_URL}timezone/add`, data)
    .pipe(
      map((res:timezoneRequestMsg)=> {
        return res;
      }),
      catchError((err) => this.HandlerErrorSrv.handlerError(err))
    );
  }
  updatetimezone(data:timezoneRequest, id: any) : Observable<timezoneRequestMsg | void>{
    return this.http.put<timezoneRequestMsg>(`${environment.API_URL}timezone/update/${id}`, data)
    .pipe(
      map((res:timezoneRequestMsg)=> {
        return res;
      }),
      catchError((err) => this.HandlerErrorSrv.handlerError(err))
    );
  }
  deletetimezone(id:any) : Observable<timezoneMsg>{
    return this.http.delete<timezoneMsg>(`${environment.API_URL}timezone/delete/${id}`)
    .pipe(
      map((res:timezoneMsg) => {
        return res;
      }),
      catchError((err) => this.HandlerErrorSrv.handlerError(err))
    )
  }
}
