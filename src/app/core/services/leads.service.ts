import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@encoding/environment';
import { catchError, map, Observable } from 'rxjs';
import { leads, leadsMsg, leadsRequest, leadsRequestMsg, leadsRes } from '../models/leads.interface';
import { HandlerErrorService } from './handler-error.service';

@Injectable({
  providedIn: 'root'
})
export class LeadsService {

  constructor(
    private http:HttpClient,
    private router:Router,
    private HandlerErrorSrv: HandlerErrorService
  ) { }

  getLeads(): Observable<leads[]>{
    return this.http.get<leadsRes>(`${environment.API_URL}lead/show`)
    .pipe(
      map((response:any) => response.lead)
    )
  }

  reloadLead(): Observable<leadsRequestMsg>{
    return this.http.get<leadsRequestMsg>(`${environment.API_URL}lead/show/google/sheet`)
    .pipe(
      map((res:leadsRequestMsg)=> {
        return res;
      }),
      catchError((err) => this.HandlerErrorSrv.handlerError(err))
    );
  }

  getLeadsById(id:any): Observable<leads[]>{
    return this.http.get<leadsRes>(`${environment.API_URL}lead/show/${id}`)
    .pipe(
      map((response:any) => response.lead)
    )
  }
  createLeads(data:leadsRequest) : Observable<leadsRequestMsg | void>{
    return this.http.post<leadsRequestMsg>(`${environment.API_URL}lead/add`, data)
    .pipe(
      map((res:leadsRequestMsg)=> {
        return res;
      }),
      catchError((err) => this.HandlerErrorSrv.handlerError(err))
    );
  }
  updateLeads(data:FormData, id: any) : Observable<leadsRequestMsg | void>{
    return this.http.put<leadsRequestMsg>(`${environment.API_URL}lead/update/${id}`, data)
    .pipe(
      map((res:leadsRequestMsg)=> {
        return res;
      }),
      catchError((err) => this.HandlerErrorSrv.handlerError(err))
    );
  }
  deleteLeads(id:any) : Observable<leadsMsg>{
    return this.http.delete<leadsMsg>(`${environment.API_URL}lead/delete/${id}`)
    .pipe(
      map((res:leadsMsg) => {
        return res;
      }),
      catchError((err) => this.HandlerErrorSrv.handlerError(err))
    )
  }
}
