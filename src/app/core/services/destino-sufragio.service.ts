import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@encoding/environment';
import saveAs from 'file-saver';
import { catchError, map, Observable } from 'rxjs';
import { HandlerErrorService } from './handler-error.service';

@Injectable({
  providedIn: 'root'
})
export class DestinoSufragioService {

  constructor(
    private http:HttpClient,
    private router:Router,
    private HandlerErrorSrv: HandlerErrorService
  ) { }

  createQR(dui:any, token: any) : Observable<any | void>{
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.post<any>(`${environment.API_URL}destino-sufragio/crear-qr/${dui}`, {headers})
    .pipe(
      map((res:any)=> {
        return res;
      }),
      catchError((err) => this.HandlerErrorSrv.handlerError(err))
    );
  }

  asignarAJrv(token:any, data:any) : Observable<any | void>{
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.post<any>(`${environment.API_URL}destino-sufragio`, data, {headers})
    .pipe(
      map((res:any)=> {
        return res;
      }),
      catchError((err) => this.HandlerErrorSrv.handlerError(err))
    );
  }

  getPersonasAsignadasDestinoSufragio(token: any): Observable<any>{
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get<any>(`${environment.API_URL}destino-sufragio`, { headers })
    .pipe(
      map((response:any) => response),
      catchError((err: any) => this.HandlerErrorSrv.handlerError(err))
    )
  }

  validarPersonaNatural(data:any, dui: any, token: any) : Observable<any | void>{
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.put<any>(`${environment.API_URL}destino-sufragio/validar-qr/${dui}`, data, {headers})
    .pipe(
      map((res:any)=> {
        return res;
      }),
      catchError((err) => this.HandlerErrorSrv.handlerError(err))
    );
  }

  getPersonaNaturalValida(dui: any, token: any): Observable<any>{
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get<any>(`${environment.API_URL}destino-sufragio/dui/${dui}`, { headers })
    .pipe(
      map((response:any) => response),
      catchError((err: any) => this.HandlerErrorSrv.handlerError(err))
    )
  }

  downloadPDF() {
    const pdfUrl = 'assets/documents/CEU ACTAS 2023.pdf'; // Ruta de tu archivo PDF
    this.http.get(pdfUrl, { responseType: 'blob' }).subscribe((data: Blob) => {
      saveAs(data, 'Actas CEU 2023.pdf'); // Cambia 'nombre-archivo' por el nombre que desees para el archivo descargado
    }, error => {
      console.error('Error al descargar el archivo', error);
    });
  }

}
