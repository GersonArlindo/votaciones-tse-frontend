import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class HandlerErrorService {
  public handlerError(err: {
    message: any;
  }): Observable<never> {
    let errorMessage = 'An errror occured retrienving data';
    if (err) {
      console.log(err);
      errorMessage = `Error: code ${err.message}`;
    }
    return throwError(errorMessage);
  }
}

// export class HandlerErrorService {
//   public handlerError(err: {
//     message: any;
//     status: number;
//     error: any;
//   }): Observable<never> {
//     let errorMessage = 'An errror occured retrienving data';
//     const { status, error } = err;

//     if(status === 400) {
//       return throwError(error);
//     }

//     return throwError(errorMessage);
//   }
// }
