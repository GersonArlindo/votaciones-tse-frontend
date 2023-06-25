import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HandlerErrorService } from './handler-error.service';
import { Observable } from 'rxjs/internal/Observable';
import { personaNatural, personaNaturalMsg, personaNaturalRequest, personaNaturalRequestMsg, personaNaturalRes } from '../models/personas_naturales.interface';
import { environment } from '@encoding/environment';
import { catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonaNaturalService {

  constructor(
    private http:HttpClient,
    private router:Router,
    private HandlerErrorSrv: HandlerErrorService
  ) { }

  getPersonaNatural(): Observable<personaNatural[]>{
    return this.http.get<personaNaturalRes>(`${environment.API_URL}persona-natural/show`)
    .pipe(
      map((response:any) => response.persona),
      catchError((err: any) => this.HandlerErrorSrv.handlerError(err))
    )
  }

  getPersonaNaturalById(id:any): Observable<personaNatural[]>{
    return this.http.get<personaNaturalRes>(`${environment.API_URL}persona-natural/show/${id}`)
    .pipe(
      map((response:any) => response.personaNatural)
    )
  }

  createPersonaNatural(data:personaNaturalRequest) : Observable<personaNaturalRequestMsg | void>{
    return this.http.post<personaNaturalRequestMsg>(`${environment.API_URL}persona-natural/add`, data)
    .pipe(
      map((res:personaNaturalRequestMsg)=> {
        return res;
      }),
      catchError((err) => this.HandlerErrorSrv.handlerError(err))
    );
  }

  updatePersonaNatural(data:personaNaturalRequest, id: any) : Observable<personaNaturalRequestMsg | void>{
    return this.http.put<personaNaturalRequestMsg>(`${environment.API_URL}persona-natural/update/${id}`, data)
    .pipe(
      map((res:personaNaturalRequestMsg)=> {
        return res;
      }),
      catchError((err) => this.HandlerErrorSrv.handlerError(err))
    );
  }

  deletePersonaNatural(id:any) : Observable<personaNaturalMsg>{
    return this.http.delete<personaNaturalMsg>(`${environment.API_URL}persona-natural/delete/${id}`)
    .pipe(
      map((res:personaNaturalMsg) => {
        return res;
      }),
      catchError((err) => this.HandlerErrorSrv.handlerError(err))
    )
  }
}
