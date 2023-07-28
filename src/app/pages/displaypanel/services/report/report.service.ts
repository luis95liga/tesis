import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReportGuide, Report } from '@app/shared/models/report.interface';
import { environment } from '@env/environment';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(
    private http: HttpClient,
  ) { }

  //http://127.0.0.1:8000/report/travelpdf/7/1/
  GetReport(pk: number | string, idcompany: number | string): Observable<Report>{
    return this.http.get<Report>(`${environment.API_URL}/report/travelpdf/${pk}/${idcompany}/`)
    .pipe(catchError(this.handlerError));
  }

  //http://127.0.0.1:8000/report/travelpdf/7/1/
  GetReportGuide(pk: number | string, idcompany: number | string): Observable<ReportGuide[]>{
    return this.http.get<ReportGuide[]>(`${environment.API_URL}/report/receptiompdf/${pk}/${idcompany}/`)
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
