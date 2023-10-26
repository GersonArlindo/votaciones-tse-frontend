import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@encoding/environment';
import { catchError, map, Observable } from 'rxjs';
import { HandlerErrorService } from './handler-error.service';

@Injectable({
  providedIn: 'root'
})
export class PartidosPoliticosService {

  constructor(
    private http:HttpClient,
    private router:Router,
    private HandlerErrorSrv: HandlerErrorService
  ) { }

  getPartidosPoliticos(token: any): Observable<any>{
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get<any>(`${environment.API_URL}partido-politico`, { headers })
    .pipe(
      map((response:any) => response),
      catchError((err: any) => this.HandlerErrorSrv.handlerError(err))
    )
  }

  getPartidosPoliticosById(id: any, token: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<any>(`${environment.API_URL}partido-politico/${id}`, { headers })
      .pipe(
        map((response: any) => response),
        catchError((err: any) => this.HandlerErrorSrv.handlerError(err))
      );
  }

  createPartidosPoliticos(data: FormData, token: any): Observable<any | void> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.post<any>(`${environment.API_URL}partido-politico`, data, { headers })
      .pipe(
        map((res: any) => {
          return res;
        }),
        catchError((err) => this.HandlerErrorSrv.handlerError(err))
      );
  }


  updatePartidosPoliticos(data: FormData, id: any, token: any): Observable<any | void> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.put<any>(`${environment.API_URL}partido-politico/${id}`, data, { headers })
      .pipe(
        map((res: any) => {
          return res;
        }),
        catchError((err) => this.HandlerErrorSrv.handlerError(err))
      );
  }


 /* deletePartidosPoliticos(id:any) : Observable<any>{
    return this.http.delete<any>(`${environment.API_URL}partido-politico/${id}`)
    .pipe(
      map((res:any) => {
        return res;
      }),
      catchError((err) => this.HandlerErrorSrv.handlerError(err))
    )
  }*/
}
