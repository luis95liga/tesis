import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Cellars, CellarsList, Destinations, DestinationsList } from '@shared/models/router.interface';


@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  //Cellars
  GetCellars(): Observable<CellarsList[]>{
    return this.http.get<CellarsList[]>(`${environment.API_URL}/route/cellars/`)
    .pipe(catchError(this.handlerError));
  }
  GetIdCellars(pk: number | string): Observable<Cellars>{
    return this.http.get<Cellars>(`${environment.API_URL}/route/cellars/${pk}/`)
    .pipe(catchError(this.handlerError));
  }
  PostCellars( cellars: Cellars):Observable<Cellars>{
    return this.http.post<Cellars>(`${environment.API_URL}/route/cellars/`, cellars)
    .pipe(catchError(this.handlerError));
  }
  PutCellars( cellars: Cellars, pk: number | string):Observable<Cellars>{
    return this.http.put<Cellars>(`${environment.API_URL}/route/cellars/${pk}/`, cellars)
    .pipe(catchError(this.handlerError));
  }
  DeleteCellars(pk: number | string):Observable<Cellars>{
    return this.http.delete<Cellars>(`${environment.API_URL}/route/cellars/${pk}/`)
    .pipe(catchError(this.handlerError));
  }

  //Destinations
  GetDestinations(): Observable<DestinationsList[]>{
    return this.http.get<DestinationsList[]>(`${environment.API_URL}/route/destination/`)
    .pipe(catchError(this.handlerError));
  }
  GetIdDestinations(pk: number | string): Observable<Destinations>{
    return this.http.get<Destinations>(`${environment.API_URL}/route/destination/${pk}/`)
    .pipe(catchError(this.handlerError));
  }
  PostDestinations( destinations: Destinations):Observable<Destinations>{
    return this.http.post<Destinations>(`${environment.API_URL}/route/destination/`, destinations)
    .pipe(catchError(this.handlerError));
  }
  PutDestinations( destinations: Destinations, pk: number | string):Observable<Destinations>{
    return this.http.put<Destinations>(`${environment.API_URL}/route/destination/${pk}/`, destinations)
    .pipe(catchError(this.handlerError));
  }
  DeleteDestinations(pk: number | string):Observable<Destinations>{
    return this.http.delete<Destinations>(`${environment.API_URL}/route/destination/${pk}/`)
    .pipe(catchError(this.handlerError));
  }

  private handlerError(err: any): Observable<never>{
    let errorMessage = 'an error occured retrienving data';
    if(err){
      errorMessage = `Error: code ${err.message}`;
    }
    window.alert(errorMessage);
    if(err.error.code=='token_not_valid'){
      window.location.reload()
    }
    return throwError(errorMessage);
  }
}
