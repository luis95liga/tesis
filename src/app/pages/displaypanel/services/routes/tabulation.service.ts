import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bill, BillList, Tabulation, TabulationList, Concepts, BillTabulation } from '@app/shared/models/router.interface';
import { environment } from '@env/environment';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TabulationService {

  constructor(
    private http: HttpClient,
  ) { }

  //Tatulation
  GetTabulation(): Observable<TabulationList[]>{
    return this.http.get<TabulationList[]>(`${environment.API_URL}/route/tabulation/`)
    .pipe(catchError(this.handlerError));
  }

  GetIdTabulation(pk: number | string): Observable<Tabulation>{
    return this.http.get<Tabulation>(`${environment.API_URL}/route/tabulation/${pk}/`)
    .pipe(catchError(this.handlerError));
  }

  PostTabulation( tabulation: Tabulation):Observable<any>{
    return this.http.post<any>(`${environment.API_URL}/route/tabulation/`, tabulation)
    .pipe(catchError(this.handlerError));
  }

  PutTabulation( tabulation: Tabulation, pk: number | string):Observable<any>{
    return this.http.put<any>(`${environment.API_URL}/route/tabulation/${pk}/`, tabulation)
    .pipe(catchError(this.handlerError));
  }

  DeleteTabulation(pk: number | string):Observable<any>{
    return this.http.delete<any>(`${environment.API_URL}/route/tabulation/${pk}/`)
    .pipe(catchError(this.handlerError));
  }

  //TatulationCompany
  GetTabulationCompany(pk: number | string): Observable<TabulationList[]>{
    return this.http.get<TabulationList[]>(`${environment.API_URL}/route/tabulationcompany/${pk}/`)
    .pipe(catchError(this.handlerError));
  }

  //tabulationorigindestination
  GetTabulationOriginDestination(pk: number | string, pk1: number | string, pk2: number | string): Observable<TabulationList[]>{
    return this.http.get<TabulationList[]>(`${environment.API_URL}/route/tabulationorigindestination/${pk}/${pk1}/${pk2}/`)
    .pipe(catchError(this.handlerError));
  }
  //Bill
  GetBill(): Observable<BillList[]>{
    return this.http.get<BillList[]>(`${environment.API_URL}/route/bill/`)
    .pipe(catchError(this.handlerError));
  }

  GetIdBill(pk: number | string): Observable<Bill>{
    return this.http.get<Bill>(`${environment.API_URL}/route/bill/${pk}/`)
    .pipe(catchError(this.handlerError));
  }

  PostBill( bill: Bill):Observable<any>{
    return this.http.post<any>(`${environment.API_URL}/route/bill/`, bill)
    .pipe(catchError(this.handlerError));
  }

  PutBill( bill: Bill, pk: number | string):Observable<any>{
    return this.http.put<any>(`${environment.API_URL}/route/bill/${pk}/`, bill)
    .pipe(catchError(this.handlerError));
  }

  DeleteBill(pk: number | string):Observable<any>{
    return this.http.delete<any>(`${environment.API_URL}/route/bill/${pk}/`)
    .pipe(catchError(this.handlerError));
  }

  //BillCompany

  GetBillCompany(pk: number | string, pk1: number | string): Observable<BillList[]>{
    return this.http.get<BillList[]>(`${environment.API_URL}/route/billcompany/${pk}/${pk1}/`)
    .pipe(catchError(this.handlerError));
  }

  //Concepts
  GetConcepts(): Observable<Concepts[]>{
    return this.http.get<Concepts[]>(`${environment.API_URL}/route/concepts/`)
    .pipe(catchError(this.handlerError));
  }

  GetIdConcepts(pk: number | string): Observable<Concepts>{
    return this.http.get<Concepts>(`${environment.API_URL}/route/concepts/${pk}/`)
    .pipe(catchError(this.handlerError));
  }

  PostConcepts( bill: Concepts):Observable<any>{
    return this.http.post<any>(`${environment.API_URL}/route/concepts/`, bill)
    .pipe(catchError(this.handlerError));
  }

  PutConcepts( bill: Concepts, pk: number | string):Observable<any>{
    return this.http.put<any>(`${environment.API_URL}/route/concepts/${pk}/`, bill)
    .pipe(catchError(this.handlerError));
  }

  DeleteConcepts(pk: number | string):Observable<any>{
    return this.http.delete<any>(`${environment.API_URL}/route/concepts/${pk}/`)
    .pipe(catchError(this.handlerError));
  }

  //BillTabulation
  GetBillTabulation(data: any[]): Observable<BillTabulation[]>{
    return this.http.post<BillTabulation[]>(`${environment.API_URL}/route/billtabulation/`, data)
    .pipe(catchError(this.handlerError));
  }

  private handlerError(err: any): Observable<never>{
    console.log(err);
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
