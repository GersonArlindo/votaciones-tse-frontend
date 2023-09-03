import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@encoding/environment';
import { catchError, map, Observable } from 'rxjs';
import { partidosPoliticos, partidosPoliticosGlobalMsg, partidosPoliticosMsg  } from '../models/partidopolitico.interface';
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

  getPartidosPoliticos(): Observable<any>{
    return this.http.get<any>(`${environment.API_URL}partido-politico`)
    .pipe(
      map((response:any) => response),
      catchError((err: any) => this.HandlerErrorSrv.handlerError(err))
    )
  }

  getPartidosPoliticosById(id:any): Observable<any>{
    return this.http.get<any>(`${environment.API_URL}partido-politico/${id}`)
    .pipe(
      map(
        (response:any) => response.partidosPoliticos
      ),
      catchError((err) => this.HandlerErrorSrv.handlerError(err))
    )
  }

  createPartidosPoliticos(data: FormData) : Observable<any | void>{
    return this.http.post<any>(`${environment.API_URL}partido-politico/`, data)
    .pipe(
      map((res:any)=> {
        return res;
      }),
      catchError((err) => this.HandlerErrorSrv.handlerError(err))
    );
  }

  updatePartidosPoliticos(data: FormData, id: any) : Observable<any | void>{
    return this.http.put<any>(`${environment.API_URL}partido-politico/${id}`, data)
    .pipe(
      map((res:any)=> {
        return res;
      }),
      catchError((err) => this.HandlerErrorSrv.handlerError(err))
    );
  }

  deletePartidosPoliticos(id:any) : Observable<any>{
    return this.http.delete<any>(`${environment.API_URL}partido-politico/${id}`)
    .pipe(
      map((res:any) => {
        return res;
      }),
      catchError((err) => this.HandlerErrorSrv.handlerError(err))
    )
  }
}
