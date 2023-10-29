import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@encoding/environment';
import { catchError, map, Observable } from 'rxjs';
import { HandlerErrorService } from './handler-error.service';

@Injectable({
  providedIn: 'root'
})
export class JrvService {

  constructor(
    private http:HttpClient,
    private router:Router,
    private HandlerErrorSrv: HandlerErrorService
  ) { }

  getJrv(token: any): Observable<any[]>{
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get<any>(`${environment.API_URL}junta-receptora-votos`, { headers })
    .pipe(
      map(
        response => response
      ),
      catchError((err: any) => this.HandlerErrorSrv.handlerError(err))
    )
  }

  getMiembrosByIdJrv(id: any, token: any): Observable<any[]>{
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get<any>(`${environment.API_URL}junta-receptora-votos/${id}/miembros`, { headers })
    .pipe(
      map(
        response => response
      ),
      catchError((err: any) => this.HandlerErrorSrv.handlerError(err))
    )
  }

  getAllMiembrosByIdJrvs(token: any): Observable<any[]>{
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get<any>(`${environment.API_URL}junta-receptora-votos/miembros/todos`, { headers })
    .pipe(
      map(
        response => response
      ),
      catchError((err: any) => this.HandlerErrorSrv.handlerError(err))
    )
  }

  getJrvById(id:any, token: any): Observable<any[]>{
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get<any>(`${environment.API_URL}junta-receptora-votos/${id}`, {headers})
    .pipe(
      map((response:any) => response)
    )
  }

  createJrv(data:any, token: any) : Observable<any | void>{
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.post<any>(`${environment.API_URL}junta-receptora-votos`, data, {headers})
    .pipe(
      map((res:any)=> {
        return res;
      }),
      catchError((err) => this.HandlerErrorSrv.handlerError(err))
    );
  }

  createMiembroOfJRV(data:any, token: any) : Observable<any | void>{
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.post<any>(`${environment.API_URL}junta-receptora-votos/miembro`, data, {headers})
    .pipe(
      map((res:any)=> {
        return res;
      }),
      catchError((err) => this.HandlerErrorSrv.handlerError(err))
    );
  }

  updateJrv(data:any, id: any) : Observable<any | void>{
    return this.http.put<any>(`${environment.API_URL}junta-receptora-votos/${id}`, data)
    .pipe(
      map((res:any)=> {
        return res;
      }),
      catchError((err) => this.HandlerErrorSrv.handlerError(err))
    );
  }

  deleteJrv(id:any) : Observable<any>{
    return this.http.delete<any>(`${environment.API_URL}junta-receptora-votos/${id}`)
    .pipe(
      map((res:any) => {
        return res;
      }),
      catchError((err) => this.HandlerErrorSrv.handlerError(err))
    )
  }

  deleteMiembroOfJrv(id:any, token: any) : Observable<any>{
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.delete<any>(`${environment.API_URL}junta-receptora-votos/miembro/${id}`, {headers})
    .pipe(
      map((res:any) => {
        return res;
      }),
      catchError((err) => this.HandlerErrorSrv.handlerError(err))
    )
  }

  updatePartialJrv(id: any, token: any): Observable<any | void> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http
      .patch<any>(`${environment.API_URL}junta-receptora-votos/${id}/cambiar-estado`, {}, {headers}) // Reemplaza 'tu-endpoint' por la URL de tu recurso.
      .pipe(
        map((res: any) => {
          return res;
        }),
        catchError((err) => this.HandlerErrorSrv.handlerError(err))
      );
  }

}
