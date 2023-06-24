import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { HandlerErrorService } from './handler-error.service';
import { timeZone, time_zoneMsg, time_zoneRequest, time_zoneRequestMsg, time_zoneRes } from '../models/time_zone.interface';
import { catchError, map, Observable } from 'rxjs';
import { environment } from '@encoding/environment';

@Injectable({
  providedIn: 'root'
})
export class TimeZoneService {

  constructor(
    private http:HttpClient,
    private router:Router,
    private HandlerErrorSrv: HandlerErrorService
  ) { }

  getTime_Zone(): Observable<timeZone[]>{
    return this.http.get<time_zoneRes>(`${environment.API_URL}timeZone/show`)
    .pipe(
      map((response:any) => response.timeZone),
      catchError((err) => this.HandlerErrorSrv.handlerError(err))
    )
  }
  getTime_ZoneById(id:any): Observable<timeZone[]>{
    return this.http.get<time_zoneRes>(`${environment.API_URL}timeZone/show/${id}`)
    .pipe(
      map((response:any) => response.timeZone),
      catchError((err) => this.HandlerErrorSrv.handlerError(err))
    )
  }

  createTime_Zone(data:time_zoneRequest) : Observable<time_zoneRequestMsg | void>{
    return this.http.post<time_zoneRequestMsg>(`${environment.API_URL}timeZone/add`, data)
    .pipe(
      map((res:time_zoneRequestMsg)=> {
        return res;
      }),
      catchError((err) => this.HandlerErrorSrv.handlerError(err))
    );
  }

  updateTimeZone(data:time_zoneRequest, id: any) : Observable<time_zoneRequestMsg | void>{
    return this.http.put<time_zoneRequestMsg>(`${environment.API_URL}timeZone/update/${id}`, data)
    .pipe(
      map((res:time_zoneRequestMsg)=> {
        return res;
      }),
      catchError((err) => this.HandlerErrorSrv.handlerError(err))
    );
  }
  
  deleteTime_Zone(id:any) : Observable<time_zoneMsg>{
    return this.http.delete<time_zoneMsg>(`${environment.API_URL}timeZone/delete/${id}`)
    .pipe(
      map((res:time_zoneMsg) => {
        return res;
      }),
      catchError((err) => this.HandlerErrorSrv.handlerError(err))
    )
  }
}
