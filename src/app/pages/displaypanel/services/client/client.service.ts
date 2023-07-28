import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Client, ClientList } from '@shared/models/client.interface';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(
    private http: HttpClient
  ) { }

  //client
  GetClient(): Observable<ClientList[]>{
    return this.http.get<ClientList[]>(`${environment.API_URL}/clients/client/`)
    .pipe(catchError(this.handlerError));
  }

  PostClient(Client: any):Observable<any>{
    return this.http.post<any>(`${environment.API_URL}/clients/client/`, Client)
    .pipe(catchError(this.handlerError));
  }

  GetIdClient(pk: number | string): Observable<Client>{
    return this.http.get<Client>(`${environment.API_URL}/clients/client/${pk}/`)
    .pipe(catchError(this.handlerError));
  }

  PutClient(Client: Client, pk: number | string):Observable<Client>{
    return this.http.put<Client>(`${environment.API_URL}/clients/client/${pk}/`, Client)
    .pipe(catchError(this.handlerError));
  }

  DeleteClient(pk: number | string):Observable<Client>{
    return this.http.delete<Client>(`${environment.API_URL}/clients/client/${pk}/`)
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
