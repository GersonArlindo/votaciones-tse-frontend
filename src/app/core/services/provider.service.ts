import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@encoding/environment';
import { catchError, map, Observable } from 'rxjs';
import { provider, providerMsg, providerRequest, providerRequestMsg, providerRes } from '../models/provider.interface';
import { HandlerErrorService } from './handler-error.service';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  constructor(
    private http:HttpClient,
    private router:Router,
    private HandlerErrorSrv: HandlerErrorService
  ) { }
  getProvider(): Observable<provider[]>{
    return this.http.get<providerRes>(`${environment.API_URL}provider/show`)
    .pipe(
      map((response:any) => response.provider)
    )
  }
  getProviderById(id:any): Observable<provider[]>{
    return this.http.get<providerRes>(`${environment.API_URL}provider/show/${id}`)
    .pipe(
      map((response:any) => response.provider)
    )
  }
  createProvider(data:providerRequest) : Observable<providerRequestMsg | void>{
    return this.http.post<providerRequestMsg>(`${environment.API_URL}provider/add`, data)
    .pipe(
      map((res:providerRequestMsg)=> {
        return res;
      }),
      catchError((err) => this.HandlerErrorSrv.handlerError(err))
    );
  }
  updateProvider(data:providerRequest, id: any) : Observable<providerRequestMsg | void>{
    return this.http.put<providerRequestMsg>(`${environment.API_URL}provider/update/${id}`, data)
    .pipe(
      map((res:providerRequestMsg)=> {
        return res;
      }),
      catchError((err) => this.HandlerErrorSrv.handlerError(err))
    );
  }
  deleteProvider(id:any) : Observable<providerMsg>{
    return this.http.delete<providerMsg>(`${environment.API_URL}provider/delete/${id}`)
    .pipe(
      map((res:providerMsg) => {
        return res;
      }),
      catchError((err) => this.HandlerErrorSrv.handlerError(err))
    )
  }
}

