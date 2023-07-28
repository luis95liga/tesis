import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { catchError, map, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {
  Vehicle,
  VehicleList,
  VehicleCreate,
  TrailerCreate,
  Trailer,
  TrailerList,
  AssignTrailer,
} from '@shared/models/vehicle.interface';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(
    private http: HttpClient
  ) { }

  //CreateVehicule
  PostCreateVehicle(data: any): Observable<any>{
    return this.http.post<any>(`${environment.API_URL}/vehicle/vehiclecreate/`, data)
    .pipe(catchError(this.handlerError));
  }
  //CreateTrailer
  PostCreateTrailer(data: any): Observable<any>{
    return this.http.post<any>(`${environment.API_URL}/vehicle/trailercreate/`, data)
    .pipe(catchError(this.handlerError));
  }
  //Trailer
  GetTrailer(): Observable<TrailerList[]>{
    return this.http.get<TrailerList[]>(`${environment.API_URL}/vehicle/trailer/`)
    .pipe(catchError(this.handlerError));
  }

  PostTrailer( trailer: any):Observable<any>{
    return this.http.post<any>(`${environment.API_URL}/vehicle/trailer/`, trailer)
    .pipe(catchError(this.handlerError));
  }

  GetIdTrailer(pk: number | string): Observable<Trailer>{
    return this.http.get<Trailer>(`${environment.API_URL}/vehicle/trailer/${pk}/`)
    .pipe(catchError(this.handlerError));
  }

  PutTrailer(trailer: any, pk: number | string):Observable<any>{
    return this.http.put<any>(`${environment.API_URL}/vehicle/trailer/${pk}/`, trailer)
    .pipe(catchError(this.handlerError));
  }

  DeleteTrailer(pk: number | string):Observable<any>{
    return this.http.delete<any>(`${environment.API_URL}/vehicle/trailer/${pk}/`)
    .pipe(catchError(this.handlerError));
  }
  //Vehiculo
  GetVehicle(): Observable<VehicleList[]>{
    return this.http.get<VehicleList[]>(`${environment.API_URL}/vehicle/vehicle/`)
    .pipe(catchError(this.handlerError));
  }

  PostVehicle( vehicle: any ):Observable<any>{
    return this.http.post<any>(`${environment.API_URL}/vehicle/vehicle/`, vehicle)
    .pipe(catchError(this.handlerError));
  }

  GetIdVehicle(pk: number | string): Observable<Vehicle>{
    return this.http.get<Vehicle>(`${environment.API_URL}/vehicle/vehicle/${pk}/`)
    .pipe(catchError(this.handlerError));
  }

  PutVehicle(vehicle: any, pk: number | string):Observable<any>{
    return this.http.put<any>(`${environment.API_URL}/vehicle/vehicle/${pk}/`, vehicle)
    .pipe(catchError(this.handlerError));
  }

  DeleteVehicle(pk: number | string):Observable<any>{
    return this.http.delete<any>(`${environment.API_URL}/vehicle/vehicle/${pk}/`)
    .pipe(catchError(this.handlerError));
  }

  //AssignVehicleTrailer
  GetAssignVehiceTrailer(pk: number | string):Observable<AssignTrailer>{
    return this.http.get<AssignTrailer>(`${environment.API_URL}/vehicle/assignaehicletrailer/${pk}/`)
    .pipe(catchError(this.handlerError));
  }

  GetAssignTrailer():Observable<AssignTrailer[]>{
    return this.http.get<AssignTrailer[]>(`${environment.API_URL}/vehicle/assigntrailer/`)
    .pipe(catchError(this.handlerError));
  }

  GetIdAssignTrailer(pk: number | string): Observable<AssignTrailer>{
    return this.http.get<AssignTrailer>(`${environment.API_URL}/vehicle/assigntrailer/${pk}/`)
    .pipe(catchError(this.handlerError));
  }

  PostAssignTrailer( data: AssignTrailer ):Observable<any>{
    return this.http.post<any>(`${environment.API_URL}/vehicle/assigntrailer/`, data)
    .pipe(catchError(this.handlerError));
  }

  PutAssignTrailer(data: AssignTrailer, pk: number | string):Observable<any>{
    return this.http.put<any>(`${environment.API_URL}/vehicle/assigntrailer/${pk}/`, data)
    .pipe(catchError(this.handlerError));
  }

  DeleteAssignTrailer(pk: number | string):Observable<any>{
    return this.http.delete<any>(`${environment.API_URL}/vehicle/assigntrailer/${pk}/`)
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
