import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@encoding/environment';
import { catchError, map, Observable } from 'rxjs';
import { partidosPoliticos, partidosPoliticosGlobalMsg, partidosPoliticosMsg, partidosPoliticosRes } from '../models/partidos_politicos.interface';
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

  getPartidosPoliticos(): Observable<partidosPoliticos[]>{
    return this.http.get<partidosPoliticosRes>(`${environment.API_URL}partidos_politicos/show`)
    .pipe(
      map((response:any) => response.partidosPoliticos),
      catchError((err) => this.HandlerErrorSrv.handlerError(err))
    )
  }

  getPartidosPoliticosById(id:any): Observable<partidosPoliticos[]>{
    return this.http.get<partidosPoliticosRes>(`${environment.API_URL}partidos_politicos/show/${id}`)
    .pipe(
      map(
        (response:any) => response.partidosPoliticos
      ),
      catchError((err) => this.HandlerErrorSrv.handlerError(err))
    )
  }

  createPartidosPoliticos(data: FormData) : Observable<partidosPoliticosMsg | void>{
    return this.http.post<partidosPoliticosMsg>(`${environment.API_URL}partidos_politicos/add`, data)
    .pipe(
      map((res:partidosPoliticosMsg)=> {
        return res;
      }),
      catchError((err) => this.HandlerErrorSrv.handlerError(err))
    );
  }

  updatePartidosPoliticos(data: FormData, id: any) : Observable<partidosPoliticosGlobalMsg | void>{
    return this.http.put<partidosPoliticosGlobalMsg>(`${environment.API_URL}partidos_politicos/update/${id}`, data)
    .pipe(
      map((res:partidosPoliticosGlobalMsg)=> {
        return res;
      }),
      catchError((err) => this.HandlerErrorSrv.handlerError(err))
    );
  }

  deletePartidosPoliticos(id:any) : Observable<partidosPoliticosGlobalMsg>{
    return this.http.delete<partidosPoliticosGlobalMsg>(`${environment.API_URL}partidos_politicos/delete/${id}`)
    .pipe(
      map((res:partidosPoliticosGlobalMsg) => {
        return res;
      }),
      catchError((err) => this.HandlerErrorSrv.handlerError(err))
    )
  }
}
