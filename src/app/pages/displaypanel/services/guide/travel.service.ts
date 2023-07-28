import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Travel, TravelList } from '@app/shared/models/guide.interface';
import { environment } from '@env/environment';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TravelService {

  constructor(
    private http: HttpClient,
  ) { }

  GetTravel(): Observable<TravelList[]> {
    return this.http.get<TravelList[]>(`${environment.API_URL}/guide/travel/`)
    .pipe(catchError(this.handlerError));
  }

  GetIdTravel(id: number | string): Observable<Travel> {
    return this.http.get<Travel>(`${environment.API_URL}/guide/travel/${id}/`)
    .pipe(catchError(this.handlerError));
  }

  PostTravel(data: Travel): Observable<any> {
    return this.http.post<any>(`${environment.API_URL}/guide/travel/`, data)
    .pipe(catchError(this.handlerError));
  }

  PutTravel(data: Travel,id: number | string): Observable<any> {
    return this.http.put<any>(`${environment.API_URL}/guide/travel/${id}/`, data)
    .pipe(catchError(this.handlerError));
  }

  DeleteTravel(id: number | string): Observable<any> {
    return this.http.delete<any>(`${environment.API_URL}/guide/travel/${id}/`)
    .pipe(catchError(this.handlerError));
  }

  private handlerError(err: any): Observable<never>{
    let errorMessage = '';
    if(err){
      errorMessage = err.error;
    }
    if(err.error.code=='token_not_valid'){
      window.location.reload()
    }
    return throwError(errorMessage);
  }
}
