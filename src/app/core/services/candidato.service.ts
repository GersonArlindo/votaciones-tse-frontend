import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HandlerErrorService } from './handler-error.service';
import { Observable, catchError, map } from 'rxjs';
import { environment } from '@encoding/environment';
import { candidato } from '../models/candidato.interface';

@Injectable({
  providedIn: 'root'
})
export class CandidatoService {

  constructor(
    private http:HttpClient,
    private router:Router,
    private HandlerErrorSrv: HandlerErrorService
  ) { }

  getCandidato(): Observable<any[]>{
    return this.http.get<any>(`${environment.API_URL}candidato-politico`)
    .pipe(
      map(
        response => response
      ),
      catchError((err: any) => this.HandlerErrorSrv.handlerError(err))
    )
  }

  getCandidatoById(id:any): Observable<any[]>{
    return this.http.get<any>(`${environment.API_URL_AUTH}candidato-politico/${id}`)
    .pipe(
      map((response:any) => response.lenguage)
    )
  }

  createCandidato(data:any) : Observable<any | void>{
    return this.http.post<any>(`${environment.API_URL_AUTH}candidato-politico`, data)
    .pipe(
      map((res:any)=> {
        return res;
      }),
      catchError((err) => this.HandlerErrorSrv.handlerError(err))
    );
  }

  
  updateCandidato(data:any, id: any) : Observable<any | void>{
    return this.http.put<any>(`${environment.API_URL_AUTH}candidato-politico/${id}`, data)
    .pipe(
      map((res:any)=> {
        return res;
      }),
      catchError((err) => this.HandlerErrorSrv.handlerError(err))
    );
  }

  deleteCandidato(id:any) : Observable<any>{
    return this.http.delete<any>(`${environment.API_URL_AUTH}candidato-politico/${id}`)
    .pipe(
      map((res:any) => {
        return res;
      }),
      catchError((err) => this.HandlerErrorSrv.handlerError(err))
    )
  }

}
