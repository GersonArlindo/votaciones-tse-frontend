import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@encoding/environment';
import { catchError, map, Observable } from 'rxjs';
import { roof, roofMsg, roofRequest, roofRequestMsg, roofRes } from '../models/typeroof.interface';
import { HandlerErrorService } from './handler-error.service';

@Injectable({
  providedIn: 'root'
})
export class RoofService {

  constructor(  private http:HttpClient,
    private router:Router,
    private HandlerErrorSrv: HandlerErrorService
  ) { }
  getRoof(): Observable<roof[]>{
    return this.http.get<roofRes>(`${environment.API_URL}roof/show`)
    .pipe(
      map((response:any) => response.roof)
    )
  }
  getRoofById(id:any): Observable<roof[]>{
    return this.http.get<roofRes>(`${environment.API_URL}roof/show/${id}`)
    .pipe(
      map((response:any) => response.roof)
    )
  }
  createRoof(data:roofRequest) : Observable<roofRequestMsg | void>{
    return this.http.post<roofRequestMsg>(`${environment.API_URL}roof/add`, data)
    .pipe(
      map((res:roofRequestMsg)=> {
        return res;
      }),
      catchError((err) => this.HandlerErrorSrv.handlerError(err))
    );
  }
  updateRoof(data:roof, id: any) : Observable<roofRequestMsg | void>{
    return this.http.put<roofRequestMsg>(`${environment.API_URL}roof/update/${id}`, data)
    .pipe(
      map((res:roofRequestMsg)=> {
        return res;
      }),
      catchError((err) => this.HandlerErrorSrv.handlerError(err))
    );
  }
  deleteRoof(id:any) : Observable<roofMsg>{
    return this.http.delete<roofMsg>(`${environment.API_URL}roof/delete/${id}`)
    .pipe(
      map((res:roofMsg) => {
        return res;
      }),
      catchError((err) => this.HandlerErrorSrv.handlerError(err))
    )
  }
}
