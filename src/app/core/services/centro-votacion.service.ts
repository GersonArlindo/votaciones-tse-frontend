import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@encoding/environment';
import { catchError, map, Observable } from 'rxjs';
import { HandlerErrorService } from './handler-error.service';

@Injectable({
  providedIn: 'root'
})
export class CentroVotacionService {

  constructor(
    private http:HttpClient,
    private router:Router,
    private HandlerErrorSrv: HandlerErrorService
  ) { }

  getCentrosVotaciones(token: any): Observable<any[]>{
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get<any>(`${environment.API_URL}centro-votacion`, { headers })
    .pipe(
      map(
        response => response
      ),
      catchError((err: any) => this.HandlerErrorSrv.handlerError(err))
    )
  }

  getCentroVotacionById(id:any): Observable<any[]>{
    return this.http.get<any>(`${environment.API_URL}centro-votacion/${id}`)
    .pipe(
      map((response:any) => response)
    )
  }

  createCentroVotacion(data:any) : Observable<any | void>{
    return this.http.post<any>(`${environment.API_URL}centro-votacion`, data)
    .pipe(
      map((res:any)=> {
        return res;
      }),
      catchError((err) => this.HandlerErrorSrv.handlerError(err))
    );
  }

  updateCentroVotacion(data:any, id: any) : Observable<any | void>{
    return this.http.put<any>(`${environment.API_URL}centro-votacion/${id}`, data)
    .pipe(
      map((res:any)=> {
        return res;
      }),
      catchError((err) => this.HandlerErrorSrv.handlerError(err))
    );
  }

  updatePartialCentroVotacion(id: any): Observable<any | void> {
    return this.http
      .patch<any>(`${environment.API_URL}centro-votacion/${id}/cambiar-estado`, {}) // Reemplaza 'tu-endpoint' por la URL de tu recurso.
      .pipe(
        map((res: any) => {
          return res;
        }),
        catchError((err) => this.HandlerErrorSrv.handlerError(err))
      );
  }



  deleteCentroVotacion(id:any) : Observable<any>{
    return this.http.delete<any>(`${environment.API_URL}centro-votacion/${id}`)
    .pipe(
      map((res:any) => {
        return res;
      }),
      catchError((err) => this.HandlerErrorSrv.handlerError(err))
    )
  }
}
