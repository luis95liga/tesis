import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {
  Country,
  LocationList,
  Location,
  ProvinceList,
  Province,
  Company,
  ListCompany,
  TypeCompany,
  BankAccount,
  ListBankAccount,
  Document,
  DocumentList,
  DocumentType,
  CompanyName
 } from '@shared/models/company.interface';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  //Company
  GetCompany(): Observable<ListCompany[]>{
    return this.http.get<ListCompany[]>(`${environment.API_URL}/company/company/`)
    .pipe(catchError(this.handlerError));
  }

  GetIdCompany(pk: number | string): Observable<Company>{
    return this.http.get<Company>(`${environment.API_URL}/company/company/${pk}/`)
    .pipe(catchError(this.handlerError));
  }

  PostCompany(company: Company):Observable<Company>{
    return this.http.post<Company>(`${environment.API_URL}/company/company/`, company)
    .pipe(catchError(this.handlerError));
  }

  PutCompany(company: any, pk: number | string):Observable<Company>{
    return this.http.put<Company>(`${environment.API_URL}/company/company/${pk}/`, company)
    .pipe(catchError(this.handlerError));
  }

  DeleteCompany(pk: number | string):Observable<Company>{
    return this.http.delete<Company>(`${environment.API_URL}/company/company/${pk}/`)
    .pipe(catchError(this.handlerError));
  }

  //CompanyName
  GetCompanyName(pk: number | string): Observable<CompanyName>{
    return this.http.get<CompanyName>(`${environment.API_URL}/company/companyname/${pk}/`)
    .pipe(catchError(this.handlerError));
  }
  //typecompany
  GetTypeCompany(): Observable<TypeCompany[]>{
    return this.http.get<TypeCompany[]>(`${environment.API_URL}/company/typecompany/`)
    .pipe(catchError(this.handlerError));
  }

  GetIdTypeCompany(pk: number | string): Observable<TypeCompany>{
    return this.http.get<TypeCompany>(`${environment.API_URL}/company/typecompany/${pk}/`)
    .pipe(catchError(this.handlerError));
  }

  PostTypeCompany(typecompany: TypeCompany):Observable<TypeCompany>{
    return this.http.post<TypeCompany>(`${environment.API_URL}/company/typecompany/`, typecompany)
    .pipe(catchError(this.handlerError));
  }

  PutTypeCompany(typecompany: TypeCompany, pk: number | string):Observable<TypeCompany>{
    return this.http.put<TypeCompany>(`${environment.API_URL}/company/typecompany/${pk}/`, typecompany)
    .pipe(catchError(this.handlerError));
  }

  DeleteTypeCompany(pk: number | string):Observable<TypeCompany>{
    return this.http.delete<TypeCompany>(`${environment.API_URL}/company/typecompany/${pk}/`)
    .pipe(catchError(this.handlerError));
  }

  //http://127.0.0.1:8000/company/bankaccountscompany/1/

  getCompanyAccount(pk: number| string): Observable<BankAccount[]>{
    return this.http.get<BankAccount[]>(`${environment.API_URL}/company/bankaccountscompany/${pk}/`)
    .pipe(catchError(this.handlerError));
  }

  // bankaccount
  GetBankAccount(): Observable<ListBankAccount[]>{
    return this.http.get<ListBankAccount[]>(`${environment.API_URL}/company/bankaccounts/`)
    .pipe(catchError(this.handlerError));
  }

  GetIdBankAccount(pk: number | string): Observable<BankAccount>{
    return this.http.get<BankAccount>(`${environment.API_URL}/company/bankaccounts/${pk}/`)
    .pipe(catchError(this.handlerError));
  }

  PostBankAccount(bankaccount: BankAccount):Observable<any>{
    return this.http.post<any>(`${environment.API_URL}/company/bankaccounts/`, bankaccount)
    .pipe(catchError(this.handlerError));
  }
  PutBankAccount(bankaccount: BankAccount, pk: number | string):Observable<any>{
    return this.http.put<any>(`${environment.API_URL}/company/bankaccounts/${pk}/`, bankaccount)
    .pipe(catchError(this.handlerError));
  }

  DeleteBankAccount(pk: number | string):Observable<any>{
    return this.http.delete<any>(`${environment.API_URL}/company/bankaccounts/${pk}/`)
    .pipe(catchError(this.handlerError));
  }

  //http://127.0.0.1:8000/company/companydocumet/2/

  GetDocumentCompany(pk: number| string): Observable<DocumentList[]>{
    return this.http.get<DocumentList[]>(`${environment.API_URL}/company/companydocumet/${pk}/`)
    .pipe(catchError(this.handlerError));
  }

  //Documents
  GetDocuments(): Observable<DocumentList[]>{
    return this.http.get<DocumentList[]>(`${environment.API_URL}/company/documentscompany/`)
    .pipe(catchError(this.handlerError));
  }

  GetIdDocument(pk: number | string): Observable<Document>{
    return this.http.get<Document>(`${environment.API_URL}/company/documentscompany/${pk}/`)
    .pipe(catchError(this.handlerError));
  }

  PostDocument(document: any):Observable<any>{
    return this.http.post<any>(`${environment.API_URL}/company/documentscompany/`, document)
    .pipe(catchError(this.handlerError));
  }

  PutDocument(document: any, pk: number | string):Observable<any>{
    return this.http.put<any>(`${environment.API_URL}/company/documentscompany/${pk}/`, document)
    .pipe(catchError(this.handlerError));
  }

  DeleteDocument(pk: number | string):Observable<any>{
    return this.http.delete<any>(`${environment.API_URL}/company/documentscompany/${pk}/`)
    .pipe(catchError(this.handlerError));
  }

  //typeDocuments
  GetTypeDocuments(): Observable<DocumentType[]>{
    return this.http.get<DocumentType[]>(`${environment.API_URL}/company/documenttypeCompany/`)
    .pipe(catchError(this.handlerError));
  }

  GetIdTypeDocument(pk: number | string): Observable<DocumentType>{
    return this.http.get<DocumentType>(`${environment.API_URL}/company/documenttypeCompany/${pk}/`)
    .pipe(catchError(this.handlerError));
  }

  PostTypeDocument(documenttype: DocumentType):Observable<any>{
    return this.http.post<any>(`${environment.API_URL}/company/documenttypeCompany/`, documenttype)
    .pipe(catchError(this.handlerError));
  }

  PutTypeDocument(documenttype: DocumentType, pk: number | string):Observable<any>{
    return this.http.put<any>(`${environment.API_URL}/company/documenttypeCompany/${pk}/`, documenttype)
    .pipe(catchError(this.handlerError));
  }

  DeleteTypeDocument(pk: number | string):Observable<any>{
    return this.http.delete<any>(`${environment.API_URL}/company/documenttypeCompany/${pk}/`)
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
