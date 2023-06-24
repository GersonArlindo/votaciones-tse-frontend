import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { HandlerErrorService } from './handler-error.service';
import { energy_provider, energy_providerMsg, energy_providerRequest, energy_providerRequestMsg, energy_providerRes } from '../models/energy_provider.interface';
import { catchError, map, Observable } from 'rxjs';
import { environment } from '@encoding/environment';


@Injectable({
  providedIn: 'root'
})
export class EnergyProviderService {

  constructor(
    private http:HttpClient,
    private router:Router,
    private HandlerErrorSrv: HandlerErrorService

  ) { }
  getEnergy_Provider(): Observable<energy_provider[]>{
    return this.http.get<energy_providerRes>(`${environment.API_URL}energy_provider/show`)
    .pipe(
      map((response:any) => response.energy_provider)
    )
  }
  getEnergy_ProviderById(id:any): Observable<energy_provider[]>{
    return this.http.get<energy_providerRes>(`${environment.API_URL}energy_provider/show/${id}`)
    .pipe(
      map((response:any) => response.energy_provider)
    )
  }
  createEnergy_Provider(data:energy_providerRequest) : Observable<energy_providerRequestMsg | void>{
    return this.http.post<energy_providerRequestMsg>(`${environment.API_URL}energy_provider/add`, data)
    .pipe(
      map((res:energy_providerRequestMsg)=> {
        return res;
      }),
      catchError((err) => this.HandlerErrorSrv.handlerError(err))
    );
  }
  updateEnergy_Provider(data:energy_providerRequest, id: any) : Observable<energy_providerRequestMsg | void>{
    return this.http.put<energy_providerRequestMsg>(`${environment.API_URL}energy_provider/update/${id}`, data)
    .pipe(
      map((res:energy_providerRequestMsg)=> {
        return res;
      }),
      catchError((err) => this.HandlerErrorSrv.handlerError(err))
    );
  }
  deleteEnergy_Provider(id:any) : Observable<energy_providerMsg>{
    return this.http.delete<energy_providerMsg>(`${environment.API_URL}energy_provider/delete/${id}`)
    .pipe(
      map((res:energy_providerMsg) => {
        return res;
      }),
      catchError((err) => this.HandlerErrorSrv.handlerError(err))
    )
  }
}
