import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@encoding/environment';
import { catchError, map, Observable } from 'rxjs';
import { assignAppointment, assign_appmtMsg, assign_appmtRequestMsg, assign_appmtRes } from '../models/assign_appmt.interface';
import { HandlerErrorService } from './handler-error.service';

@Injectable({
  providedIn: 'root'
})
export class AssignAppmtService {

  constructor(
    private http:HttpClient,
    private router:Router,
    private HandlerErrorSrv: HandlerErrorService
  ) { }

  getAssign_appmt(): Observable<assignAppointment>{
    return this.http.get<assign_appmtRes>(`${environment.API_URL}assign_appointment/show`)
    .pipe(
      map((response:any) => response.assignAppointment),
      catchError((err) => this.HandlerErrorSrv.handlerError(err))
    )
  }

  getAssign_appmtById(id:any): Observable<assignAppointment[]>{
    return this.http.get<assign_appmtRes>(`${environment.API_URL}assign_appointment/show/${id}`)
    .pipe(
      map(
        (response:any) => response.assignAppointment
      ),
      catchError((err) => this.HandlerErrorSrv.handlerError(err))
    )
  }

  createAssign_appmt(data: FormData) : Observable<assign_appmtMsg | void>{
    return this.http.post<assign_appmtMsg>(`${environment.API_URL}assign_appointment/add`, data)
    .pipe(
      map((res:assign_appmtMsg)=> {
        return res;
      }),
      catchError((err) => this.HandlerErrorSrv.handlerError(err))
    );
  }

  updateAssign_appmt(data: FormData, id: any) : Observable<assign_appmtRequestMsg | void>{
    return this.http.put<assign_appmtRequestMsg>(`${environment.API_URL}assign_appointment/update/${id}`, data)
    .pipe(
      map((res:assign_appmtRequestMsg)=> {
        return res;
      }),
      catchError((err) => this.HandlerErrorSrv.handlerError(err))
    );
  }

  deleteAssign_appmt(id:any) : Observable<assign_appmtRequestMsg>{
    return this.http.delete<assign_appmtRequestMsg>(`${environment.API_URL}assign_appointment/delete/${id}`)
    .pipe(
      map((res:assign_appmtRequestMsg) => {
        return res;
      }),
      catchError((err) => this.HandlerErrorSrv.handlerError(err))
    )
  }

}
