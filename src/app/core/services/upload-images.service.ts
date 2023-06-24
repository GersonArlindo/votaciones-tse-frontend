import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { HandlerErrorService } from './handler-error.service';
import { catchError, map, Observable } from 'rxjs';
import { environment } from '@encoding/environment';
import { ResGloblal, resourcesImages, upload_imagesResponse } from '../models/upload_images.interface';

@Injectable({
  providedIn: 'root'
})
export class UploadImagesService {

  constructor(
    private http:HttpClient,
    private router:Router,
    private HandlerErrorSrv: HandlerErrorService
  ) { }

  getImagesByAssignAppoinment(id: any): Observable<resourcesImages[]>{
    return this.http.get<upload_imagesResponse>(`${environment.API_URL}upload-images/show/${id}`)
    .pipe(
      map((response:any) => response.resources),
      catchError((err) => this.HandlerErrorSrv.handlerError(err))
    )
  }

  createImages(data: FormData) : Observable<ResGloblal | void>{
    return this.http.post<ResGloblal>(`${environment.API_URL}upload-images/add`, data)
    .pipe(
      map((res:ResGloblal)=> {
        return res;
      }),
      catchError((err) => this.HandlerErrorSrv.handlerError(err))
    );
  }

  deleteImages(name: any, id:any) : Observable<ResGloblal>{
    return this.http.delete<ResGloblal>(`${environment.API_URL}upload-images/delete?name=${name}&id_image=${id}`)
    .pipe(
      map((res:ResGloblal) => {
        return res;
      }),
      catchError((err) => this.HandlerErrorSrv.handlerError(err))
    )
  }

}
