import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { HandlerErrorService } from './handler-error.service';
import { languageRes, lenguage, lenguageMsg, lenguageRequest, lenguageRequestMsg } from '../models/language.interface';
import { catchError, map, Observable } from 'rxjs';
import { environment } from '@encoding/environment';

@Injectable({
  providedIn: 'root'
})
export class LenguageService {

  constructor(
    private http:HttpClient,
    private router:Router,
    private HandlerErrorSrv: HandlerErrorService
  ) { }

  getLenguages(): Observable<lenguage[]>{
    return this.http.get<languageRes>(`${environment.API_URL}language/show`)
    .pipe(
      map(
        response => response.lenguage
      ),
      catchError((err: any) => this.HandlerErrorSrv.handlerError(err))
    )
  }

  getLenguageById(id:any): Observable<lenguage[]>{
    return this.http.get<languageRes>(`${environment.API_URL}language/show/${id}`)
    .pipe(
      map((response:any) => response.lenguage)
    )
  }

  createLenguage(data:lenguageRequest) : Observable<lenguageRequestMsg | void>{
    return this.http.post<lenguageRequestMsg>(`${environment.API_URL}language/add`, data)
    .pipe(
      map((res:lenguageRequestMsg)=> {
        return res;
      }),
      catchError((err) => this.HandlerErrorSrv.handlerError(err))
    );
  }

  updateLenguage(data:lenguageRequest, id: any) : Observable<lenguageRequestMsg | void>{
    return this.http.put<lenguageRequestMsg>(`${environment.API_URL}language/update/${id}`, data)
    .pipe(
      map((res:lenguageRequestMsg)=> {
        return res;
      }),
      catchError((err) => this.HandlerErrorSrv.handlerError(err))
    );
  }

  deleteLanguage(id:any) : Observable<lenguageMsg>{
    return this.http.delete<lenguageMsg>(`${environment.API_URL}language/delete/${id}`)
    .pipe(
      map((res:lenguageMsg) => {
        return res;
      }),
      catchError((err) => this.HandlerErrorSrv.handlerError(err))
    )
  }

}
