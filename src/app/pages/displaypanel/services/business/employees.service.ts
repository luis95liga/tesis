import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {
  Employee,
  EmployeeList,
  PeriodPayment,
  PositionType,
  Position,
  PositionList,
  DocumentEmployee,
  DocumentEmployeeList,
  DocumentType,
  isLogin  } from '@shared/models/employee.interface';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(
    private http: HttpClient
  ) { }

  //employee
  getEmployee(): Observable<EmployeeList[]>{
    return this.http.get<EmployeeList[]>(`${environment.API_URL}/employee/employee/`)
    .pipe(catchError(this.handlerError));
  }

  PostEmployee(employee: any):Observable<any>{
    return this.http.post<any>(`${environment.API_URL}/employee/employee/`, employee)
    .pipe(catchError(this.handlerError));
  }

  GetIdEmployee(pk: number | string): Observable<Employee>{
    return this.http.get<Employee>(`${environment.API_URL}/employee/employee/${pk}/`)
    .pipe(catchError(this.handlerError));
  }

  PutEmployee(Employee: any, pk: number | string):Observable<any>{
    return this.http.put<any>(`${environment.API_URL}/employee/employee/${pk}/`, Employee)
    .pipe(catchError(this.handlerError));
  }

  DeleteEmployee(pk: number | string):Observable<any>{
    return this.http.delete<any>(`${environment.API_URL}/employee/employee/${pk}/`)
    .pipe(catchError(this.handlerError));
  }

  //period payment
  Getperiodpayment(): Observable<PeriodPayment[]>{
    return this.http.get<PeriodPayment[]>(`${environment.API_URL}/employee/periodpayment/`)
    .pipe(catchError(this.handlerError));
  }

  Postperiodpayment(periodpayment: PeriodPayment):Observable<PeriodPayment>{
    return this.http.post<PeriodPayment>(`${environment.API_URL}/employee/periodpayment/`, periodpayment)
    .pipe(catchError(this.handlerError));
  }

  GetIdperiodpayment(pk: number | string): Observable<PeriodPayment>{
    return this.http.get<PeriodPayment>(`${environment.API_URL}/employee/periodpayment/${pk}/`)
    .pipe(catchError(this.handlerError));
  }

  Putperiodpayment(periodpayment: PeriodPayment, pk: number | string):Observable<PeriodPayment>{
    return this.http.put<PeriodPayment>(`${environment.API_URL}/employee/periodpayment/${pk}/`, periodpayment)
    .pipe(catchError(this.handlerError));
  }

  Deleteperiodpayment(pk: number | string):Observable<PeriodPayment>{
    return this.http.delete<PeriodPayment>(`${environment.API_URL}/employee/periodpayment/${pk}/`)
    .pipe(catchError(this.handlerError));
  }

  //position type
  GetPositionType(): Observable<PositionType[]>{
    return this.http.get<PositionType[]>(`${environment.API_URL}/employee/positiontype/`)
    .pipe(catchError(this.handlerError));
  }

  PostPositionType(periodpayment: PositionType):Observable<PositionType>{
    return this.http.post<PositionType>(`${environment.API_URL}/employee/positiontype/`, periodpayment)
    .pipe(catchError(this.handlerError));
  }

  GetIdPositionType(pk: number | string): Observable<PositionType>{
    return this.http.get<PositionType>(`${environment.API_URL}/employee/positiontype/${pk}/`)
    .pipe(catchError(this.handlerError));
  }

  PutPositionType(periodpayment: PositionType, pk: number | string):Observable<PositionType>{
    return this.http.put<PositionType>(`${environment.API_URL}/employee/positiontype/${pk}/`, periodpayment)
    .pipe(catchError(this.handlerError));
  }

  DeletePositionType(pk: number | string):Observable<PositionType>{
    return this.http.delete<PositionType>(`${environment.API_URL}/employee/positiontype/${pk}/`)
    .pipe(catchError(this.handlerError));
  }

  //position
  GetPosition(): Observable<PositionList[]>{
    return this.http.get<PositionList[]>(`${environment.API_URL}/employee/position/`)
    .pipe(catchError(this.handlerError));
  }

  PostPosition(periodpayment: Position):Observable<Position>{
    return this.http.post<Position>(`${environment.API_URL}/employee/position/`, periodpayment)
    .pipe(catchError(this.handlerError));
  }

  GetIdPosition(pk: number | string): Observable<Position>{
    return this.http.get<Position>(`${environment.API_URL}/employee/position/${pk}/`)
    .pipe(catchError(this.handlerError));
  }

  PutPosition(periodpayment: Position, pk: number | string):Observable<Position>{
    return this.http.put<Position>(`${environment.API_URL}/employee/position/${pk}/`, periodpayment)
    .pipe(catchError(this.handlerError));
  }

  DeletePosition(pk: number | string):Observable<Position>{
    return this.http.delete<Position>(`${environment.API_URL}/employee/position/${pk}/`)
    .pipe(catchError(this.handlerError));
  }

  //laborpayments
  GetLaborPayments(): Observable<PositionList[]>{
    return this.http.get<PositionList[]>(`${environment.API_URL}/employee/laborpayments/`)
    .pipe(catchError(this.handlerError));
  }

  PostLaborPayments(periodpayment: Position):Observable<Position>{
    return this.http.post<Position>(`${environment.API_URL}/employee/laborpayments/`, periodpayment)
    .pipe(catchError(this.handlerError));
  }

  GetIdLaborPayments(pk: number | string): Observable<Position>{
    return this.http.get<Position>(`${environment.API_URL}/employee/laborpayments/${pk}/`)
    .pipe(catchError(this.handlerError));
  }

  PutLaborPayments(periodpayment: Position, pk: number | string):Observable<Position>{
    return this.http.put<Position>(`${environment.API_URL}/employee/laborpayments/${pk}/`, periodpayment)
    .pipe(catchError(this.handlerError));
  }

  DeleteLaborPayments(pk: number | string):Observable<Position>{
    return this.http.delete<Position>(`${environment.API_URL}/employee/laborpayments/${pk}/`)
    .pipe(catchError(this.handlerError));
  }

  //http://127.0.0.1:8000/employee/employeeposition/1/
  GetPositionEmployee(pk: number | string): Observable<Employee[]>{
    return this.http.get<Employee[]>(`${environment.API_URL}/employee/employeeposition/${pk}/`)
    .pipe(catchError(this.handlerError));
  }

  //http://127.0.0.1:8000/employee/documentemployee/1/
  GetDocumentEmployee(pk: number | string): Observable<DocumentEmployeeList[]>{
    return this.http.get<DocumentEmployeeList[]>(`${environment.API_URL}/employee/documentemployee/${pk}/`)
    .pipe(catchError(this.handlerError));
  }

  //document
  GetDocument(): Observable<DocumentEmployeeList[]>{
    return this.http.get<DocumentEmployeeList[]>(`${environment.API_URL}/employee/documents/`)
    .pipe(catchError(this.handlerError));
  }

  PostDocument(document: any):Observable<any>{
    return this.http.post<any>(`${environment.API_URL}/employee/documents/`, document)
    .pipe(catchError(this.handlerError));
  }

  GetIdDocument(pk: number | string): Observable<DocumentEmployee>{
    return this.http.get<DocumentEmployee>(`${environment.API_URL}/employee/documents/${pk}/`)
    .pipe(catchError(this.handlerError));
  }

  PutDocument(document: any, pk: number | string):Observable<any>{
    return this.http.put<any>(`${environment.API_URL}/employee/documents/${pk}/`, document)
    .pipe(catchError(this.handlerError));
  }

  DeleteDocument(pk: number | string):Observable<any>{
    return this.http.delete<any>(`${environment.API_URL}/employee/documents/${pk}/`)
    .pipe(catchError(this.handlerError));
  }

  //islogin
  GetIsLogin(): Observable<isLogin[]>{
    return this.http.get<isLogin[]>(`${environment.API_URL}/employee/islogin/`)
    .pipe(catchError(this.handlerError));
  }

  PostIsLogin(islogin: isLogin):Observable<any>{
    return this.http.post<any>(`${environment.API_URL}/employee/islogin/`, islogin)
    .pipe(catchError(this.handlerError));
  }

  GetIdIsLogin(pk: number | string): Observable<isLogin>{
    return this.http.get<isLogin>(`${environment.API_URL}/employee/islogin/${pk}/`)
    .pipe(catchError(this.handlerError));
  }

  PutIsLogin(islogin: isLogin, pk: number | string):Observable<any>{
    return this.http.put<any>(`${environment.API_URL}/employee/islogin/${pk}/`, islogin)
    .pipe(catchError(this.handlerError));
  }

  DeleteIsLogin(pk: number | string):Observable<any>{
    return this.http.delete<any>(`${environment.API_URL}/employee/islogin/${pk}/`)
    .pipe(catchError(this.handlerError));
  }

  //documenttype
  GetDocumentType(): Observable<DocumentType[]>{
    return this.http.get<DocumentType[]>(`${environment.API_URL}/employee/documenttypee/`)
    .pipe(catchError(this.handlerError));
  }

  PostDocumentType(documenttype: DocumentType):Observable<any>{
    return this.http.post<any>(`${environment.API_URL}/employee/documenttypee/`, documenttype)
    .pipe(catchError(this.handlerError));
  }

  GetIdDocumentType(pk: number | string): Observable<DocumentType>{
    return this.http.get<DocumentType>(`${environment.API_URL}/employee/documenttypee/${pk}/`)
    .pipe(catchError(this.handlerError));
  }
  PutDocumentType(documenttype: DocumentType, pk: number | string):Observable<any>{
    return this.http.put<any>(`${environment.API_URL}/employee/documenttypee/${pk}/`, documenttype)
    .pipe(catchError(this.handlerError));
  }

  DeleteDocumentType(pk: number | string):Observable<any>{
    return this.http.delete<any>(`${environment.API_URL}/employee/documenttypee/${pk}/`)
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
