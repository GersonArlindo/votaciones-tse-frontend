import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HandlerErrorService } from './handler-error.service';
import { Observable } from 'rxjs/internal/Observable';
import {
  personaNatural,
  personaNaturalMsg,
  personaNaturalRequest,
  personaNaturalRequestMsg,
} from '../models/personas_naturales.interface';
import { environment } from '@encoding/environment';
import { catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PersonaNaturalService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private HandlerErrorSrv: HandlerErrorService
  ) {}

  getPersonaNatural(): Observable<personaNatural[]> {
    return this.http.get<any>(`${environment.API_URL}persona-natural`).pipe(
      map((response: any) => response),
      catchError((err: any) => this.HandlerErrorSrv.handlerError(err))
    );
  }

  getPersonaNaturalById(id: any): Observable<personaNatural[]> {
    return this.http
      .get<any>(`${environment.API_URL}persona-natural/${id}`)
      .pipe(map((response: any) => response));
  }

  createPersonaNatural(
    data: personaNaturalRequest,
    token: any
  ): Observable<personaNaturalRequestMsg | void> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http
      .post<personaNaturalRequestMsg>(
        `${environment.API_URL}persona-natural`,
        data,
        { headers }
      )
      .pipe(
        map((res: personaNaturalRequestMsg) => {
          return res;
        }),
        catchError((err) => this.HandlerErrorSrv.handlerError(err))
      );
  }
}
