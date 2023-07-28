import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Country, LocationList, Location, ProvinceList, Province, } from '@shared/models/company.interface';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  //Country
  GetCountry(): Observable<Country[]>{
    return this.http.get<Country[]>(`${environment.API_URL}/company/country/`)
    .pipe(catchError(this.handlerError));
  }

  PostCountry(country: Country):Observable<Country>{
    return this.http.post<Country>(`${environment.API_URL}/company/country/`, country)
    .pipe(catchError(this.handlerError));
  }

  GetIdCountry(pk: number | string): Observable<Country>{
    return this.http.get<Country>(`${environment.API_URL}/company/country/${pk}/`)
    .pipe(catchError(this.handlerError));
  }

  PutCountry(country: Country, pk: number | string):Observable<Country>{
    return this.http.put<Country>(`${environment.API_URL}/company/country/${pk}/`, country)
    .pipe(catchError(this.handlerError));
  }

  DeleteCountry(pk: number | string):Observable<Country>{
    return this.http.delete<Country>(`${environment.API_URL}/company/country/${pk}/`)
    .pipe(catchError(this.handlerError));
  }

  //province
  GetProvince(): Observable<ProvinceList[]>{
    return this.http.get<ProvinceList[]>(`${environment.API_URL}/company/province/`)
    .pipe(catchError(this.handlerError));
  }

  GetIdProvince(pk: number | string): Observable<Province>{
    return this.http.get<Province>(`${environment.API_URL}/company/province/${pk}/`)
    .pipe(catchError(this.handlerError));
  }

  PostProvince(province: Province):Observable<Province>{
    return this.http.post<Province>(`${environment.API_URL}/company/province/`, province)
    .pipe(catchError(this.handlerError));
  }

  PutProvince(province: Province, pk: number | string):Observable<Province>{
    return this.http.put<Province>(`${environment.API_URL}/company/province/${pk}/`, province)
    .pipe(catchError(this.handlerError));
  }

  DeleteProvince(pk: number | string):Observable<Province>{
    return this.http.delete<Province>(`${environment.API_URL}/company/province/${pk}/`)
    .pipe(catchError(this.handlerError));
  }

  //location
  GetLocation(): Observable<LocationList[]>{
    return this.http.get<LocationList[]>(`${environment.API_URL}/company/locality/`)
    .pipe(catchError(this.handlerError));
  }
  GetIdLocation(pk: number | string): Observable<Location>{
    return this.http.get<Location>(`${environment.API_URL}/company/locality/${pk}/`)
    .pipe(catchError(this.handlerError));
  }
  PostLocation(location: Location):Observable<Location>{
    return this.http.post<Location>(`${environment.API_URL}/company/locality/`, location)
    .pipe(catchError(this.handlerError));
  }
  PutLocation(location: Location, pk: number | string):Observable<Location>{
    return this.http.put<Location>(`${environment.API_URL}/company/locality/${pk}/`, location)
    .pipe(catchError(this.handlerError));
  }
  DeleteLocation(pk: number | string):Observable<Location>{
    return this.http.delete<Location>(`${environment.API_URL}/company/locality/${pk}/`)
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
