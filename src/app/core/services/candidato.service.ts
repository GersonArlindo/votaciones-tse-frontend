import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  getCandidato(token:any): Observable<any[]>{
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get<any>(`${environment.API_URL}candidato-politico`, {headers})
    .pipe(
      map(
        response => response
      ),
      catchError((err: any) => this.HandlerErrorSrv.handlerError(err))
    )
  }

  getCandidatoById(token:any, id:any): Observable<any[]>{
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get<any>(`${environment.API_URL}candidato-politico/${id}`, {headers})
    .pipe(
      map((response:any) => response)
    )
  }

  createCandidato(token:any, data:any) : Observable<any | void>{
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.post<any>(`${environment.API_URL}candidato-politico`, data, {headers})
    .pipe(
      map((res:any)=> {
        return res;
      }),
      catchError((err) => this.HandlerErrorSrv.handlerError(err))
    );
  }

  
  updateCandidato(data:any, id: any, token: any) : Observable<any | void>{
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.put<any>(`${environment.API_URL}candidato-politico/${id}`, data, {headers})
    .pipe(
      map((res:any)=> {
        return res;
      }),
      catchError((err) => this.HandlerErrorSrv.handlerError(err))
    );
  }

  deleteCandidato(id:any, token: any) : Observable<any>{
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.delete<any>(`${environment.API_URL}candidato-politico/${id}`, {headers})
    .pipe(
      map((res:any) => {
        return res;
      }),
      catchError((err) => this.HandlerErrorSrv.handlerError(err))
    )
  }

  updateImageCandidato(id: any, data: any, token: any): Observable<any | void> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http
      .patch<any>(`${environment.API_URL}candidato-politico/${id}/cambiar-foto`, data, {headers}) // Reemplaza 'tu-endpoint' por la URL de tu recurso.
      .pipe(
        map((res: any) => {
          return res;
        }),
        catchError((err) => this.HandlerErrorSrv.handlerError(err))
      );
  }

}
