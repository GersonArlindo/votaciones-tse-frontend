import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

// export class HandlerErrorService {
//   public handlerError(err: {
//     message: any;
//   }): Observable<never> {
//     let errorMessage = 'An errror occured retrienving data';
//     if (err) {
//       console.log(err);
//       errorMessage = `Error: code ${err.message}`;
//     }
//     return throwError(errorMessage);
//   }
// }

export class HandlerErrorService {
  public handlerError(err: any): Observable<never> {
    let errorMessage = 'An error occurred while retrieving data';
    if (err.error && err.error.error) {
      // Si el error contiene una propiedad 'error', utiliza ese mensaje.
      errorMessage = err.error.error;
    }
    return throwError(errorMessage);
  }
}
