import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { HandlerErrorService } from './handler-error.service';
import { catchError, map, Observable } from 'rxjs';
import { disqualification, disqualificationMsg, disqualificationRequest, disqualificationRequestMsg, disqualificationsRes } from '../models/disqualifications.interface';
import { environment } from '@encoding/environment';

@Injectable({
  providedIn: 'root'
})
export class DisqualificationsService {

  constructor(
    private http:HttpClient,
    private router:Router,
    private HandlerErrorSrv: HandlerErrorService
  ) { }
  
  getDisqualification(): Observable<disqualification[]>{
    return this.http.get<disqualificationsRes>(`${environment.API_URL}disqualification/show`)
    .pipe(
      map((response:any) => response.disqualification),
      catchError((err) => this.HandlerErrorSrv.handlerError(err))
    )
  }
  getDisqualificationById(id:any): Observable<disqualification[]>{
    return this.http.get<disqualificationsRes>(`${environment.API_URL}disqualification/show/${id}`)
    .pipe(
      map((response:any) => response.disqualification),
      catchError((err) => this.HandlerErrorSrv.handlerError(err))
    )
  }
  createDisqualification(data:disqualificationRequest) : Observable<disqualificationRequestMsg | void>{
    return this.http.post<disqualificationRequestMsg>(`${environment.API_URL}disqualification/add`, data)
    .pipe(
      map((res:disqualificationRequestMsg)=> {
        return res;
      }),
      catchError((err) => this.HandlerErrorSrv.handlerError(err))
    );
  }
  updateDisqualification(data:disqualificationRequest, id: any) : Observable<disqualificationRequestMsg | void>{
    return this.http.put<disqualificationRequestMsg>(`${environment.API_URL}disqualification/update/${id}`, data)
    .pipe(
      map((res:disqualificationRequestMsg)=> {
        return res;
      }),
      catchError((err) => this.HandlerErrorSrv.handlerError(err))
    );
  }
  deleteDisqualification(id:any) : Observable<disqualificationMsg>{
    return this.http.delete<disqualificationMsg>(`${environment.API_URL}disqualification/delete/${id}`)
    .pipe(
      map((res:disqualificationMsg) => {
        return res;
      }),
      catchError((err) => this.HandlerErrorSrv.handlerError(err))
    )
  }
}
