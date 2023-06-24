import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@encoding/environment';
import { catchError, map, Observable } from 'rxjs';
import { salesRep, salesRepMsg, salesRepRequest, salesRepRequestMsg, salesRepRes } from '../models/sales_rep.interface';
import { HandlerErrorService } from './handler-error.service';

@Injectable({
  providedIn: 'root'
})
export class SalesRepService {

  constructor(
    private http:HttpClient,
    private router:Router,
    private HandlerErrorSrv: HandlerErrorService
  ) {}

  getSalesRep(): Observable<salesRep[]>{
    return this.http.get<salesRepRes>(`${environment.API_URL}sales_rep/show`)
    .pipe(
      map(
        response => response.salesRep
      ),
      catchError((err: any) => this.HandlerErrorSrv.handlerError(err))
    )
  }

  getSalesRepById(id:any): Observable<salesRep[]>{
    return this.http.get<salesRepRes>(`${environment.API_URL}sales_rep/show/${id}`)
    .pipe(
      map((response:any) => response.salesRep)
    )
  }

  createSalesRep(data:salesRepRequest) : Observable<salesRepRequestMsg | void>{
    return this.http.post<salesRepRequestMsg>(`${environment.API_URL}sales_rep/add`, data)
    .pipe(
      map((res:salesRepRequestMsg)=> {
        return res;
      }),
      catchError((err) => this.HandlerErrorSrv.handlerError(err))
    );
  }

  updateSalesRep(data:salesRepRequest, id: any) : Observable<salesRepRequestMsg | void>{
    return this.http.put<salesRepRequestMsg>(`${environment.API_URL}sales_rep/update/${id}`, data)
    .pipe(
      map((res:salesRepRequestMsg)=> {
        return res;
      }),
      catchError((err) => this.HandlerErrorSrv.handlerError(err))
    );
  }

  deleteSalesRep(id:any) : Observable<salesRepMsg>{
    return this.http.delete<salesRepMsg>(`${environment.API_URL}sales_rep/delete/${id}`)
    .pipe(
      map((res:salesRepMsg) => {
        return res;
      }),
      catchError((err) => this.HandlerErrorSrv.handlerError(err))
    )
  }
}
