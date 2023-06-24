import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@encoding/environment';
import { catchError, map, Observable } from 'rxjs';
import { appointmentOutcome, appointmentOutcomeMsg, appointmentOutcomeRequest, appointmentOutcomeRequestMsg, appointmentOutcomeRes } from '../models/appointmentOutcome.interface';
import { HandlerErrorService } from './handler-error.service';

@Injectable({
  providedIn: 'root'
})
export class AppointmentOutcomeService {

  constructor( private http:HttpClient,
    private router:Router,
    private HandlerErrorSrv: HandlerErrorService
  ) { }
  getAppointmentOutcome(): Observable<appointmentOutcome[]>{
    return this.http.get<appointmentOutcomeRes>(`${environment.API_URL}appointment_outcome/show`)
    .pipe(
      map((response:any) => response.appointmentOutcome),
      catchError((err) => this.HandlerErrorSrv.handlerError(err))
    )
  }
  getAppointmentOutcomeById(id:any): Observable<appointmentOutcome[]>{
    return this.http.get<appointmentOutcomeRes>(`${environment.API_URL}appointment_outcome/show/${id}`)
    .pipe(
      map(
        (response:any) => response.appointmentOutcome
      ),
      catchError((err) => this.HandlerErrorSrv.handlerError(err))
    )
  }
  createAppointmentOutcome(data:appointmentOutcomeRequest) : Observable<appointmentOutcomeRequestMsg | void>{
    return this.http.post<appointmentOutcomeRequestMsg>(`${environment.API_URL}appointment_outcome/add`, data)
    .pipe(
      map((res:appointmentOutcomeRequestMsg)=> {
        return res;
      }),
      catchError((err) => this.HandlerErrorSrv.handlerError(err))
    );
  }
  updateAppointmentOutcome(data:appointmentOutcomeRequest, id: any) : Observable<appointmentOutcomeRequestMsg | void>{
    return this.http.put<appointmentOutcomeRequestMsg>(`${environment.API_URL}appointment_outcome/update/${id}`, data)
    .pipe(
      map((res:appointmentOutcomeRequestMsg)=> {
        return res;
      }),
      catchError((err) => this.HandlerErrorSrv.handlerError(err))
    );
  }
  deleteappointmentOutcome(id:any) : Observable<appointmentOutcomeMsg>{
    return this.http.delete<appointmentOutcomeMsg>(`${environment.API_URL}appointment_outcome/delete/${id}`)
    .pipe(
      map((res:appointmentOutcomeMsg) => {
        return res;
      }),
      catchError((err) => this.HandlerErrorSrv.handlerError(err))
    )
  }
}
