import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HandlerErrorService } from './handler-error.service';
import { Observable, catchError, map } from 'rxjs';
import { environment } from '@encoding/environment';
import { candidato } from '../models/candidato.interface';

@Injectable({
  providedIn: 'root'
})
export class CandidatoService {

  constructor(
    private http:HttpClient,
    private router:Router,
    private HandlerErrorSrv: HandlerErrorService
  ) { }

  getCandidato(): Observable<any[]>{
    return this.http.get<any>(`${environment.API_URL}candidato-politico`)
    .pipe(
      map(
        response => response
      ),
      catchError((err: any) => this.HandlerErrorSrv.handlerError(err))
    )
  }
}
