import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { HandlerErrorService } from './handler-error.service';
import { states, statesMsg, statesRequest, statesRequestMsg, statesRes } from '../models/states.interface';
import { catchError, map, Observable } from 'rxjs';
import { environment } from '@encoding/environment';

@Injectable({
  providedIn: 'root'
})
export class StatesService {

  constructor(
    private http:HttpClient,
    private router:Router,
    private HandlerErrorSrv: HandlerErrorService
  ) { }

  getStates(): Observable<states[]>{
    return this.http.get<statesRes>(`${environment.API_URL}state/show`)
    .pipe(
      map((response:any) => response.states),
      catchError((err) => this.HandlerErrorSrv.handlerError(err))
    )
  }
  getStatesById(id:any): Observable<states[]>{
    return this.http.get<statesRes>(`${environment.API_URL}state/show/${id}`)
    .pipe(
      map((response:any) => response.state),
      catchError((err) => this.HandlerErrorSrv.handlerError(err))
    )
  }
  createStates(data:statesRequest) : Observable<statesRequestMsg | void>{
    return this.http.post<statesRequestMsg>(`${environment.API_URL}state/add`, data)
    .pipe(
      map((res:statesRequestMsg)=> {
        return res;
      }),
      catchError((err) => this.HandlerErrorSrv.handlerError(err))
    );
  }
  updateStates(data:statesRequest, id: any) : Observable<statesRequestMsg | void>{
    return this.http.put<statesRequestMsg>(`${environment.API_URL}state/update/${id}`, data)
    .pipe(
      map((res:statesRequestMsg)=> {
        return res;
      }),
      catchError((err) => this.HandlerErrorSrv.handlerError(err))
    );
  }
  deleteStates(id:any) : Observable<statesMsg>{
    return this.http.delete<statesMsg>(`${environment.API_URL}state/delete/${id}`)
    .pipe(
      map((res:statesMsg) => {
        return res;
      }),
      catchError((err) => this.HandlerErrorSrv.handlerError(err))
    )
  }
}
