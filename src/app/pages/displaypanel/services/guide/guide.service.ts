import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Guide, GuideContent, GuideContentDetail, GuideContentDetailTmp, GuideContentList, GuideList, GuideListView, GuideLocationLongitude, InvoiceType, Unit } from '@shared/models/guide.interface';

@Injectable({
  providedIn: 'root'
})
export class GuideService {

  constructor(
    private http: HttpClient
  ) { }

  //client
  GetGuide(): Observable<GuideList[]>{
    return this.http.get<GuideList[]>(`${environment.API_URL}/guide/guide/`)
    .pipe(catchError(this.handlerError));
  }

  //guidelocationlatitude

  GetGuideLocationLatitude(pk: number | string): Observable<GuideLocationLongitude>{
    return this.http.get<GuideLocationLongitude>(`${environment.API_URL}/guide/guidelocationlatitude/${pk}/`)
    .pipe(catchError(this.handlerError));
  }

  PostGuide(guide: Guide):Observable<any>{
    return this.http.post<any>(`${environment.API_URL}/guide/guide/`, guide)
    .pipe(catchError(this.handlerError));
  }

  GetIdGuide(pk: number | string): Observable<Guide>{
    return this.http.get<Guide>(`${environment.API_URL}/guide/guide/${pk}/`)
    .pipe(catchError(this.handlerError));
  }

  PutGuide(guide: Guide, pk: number | string):Observable<any>{
    return this.http.put<any>(`${environment.API_URL}/guide/guide/${pk}/`, guide)
    .pipe(catchError(this.handlerError));
  }

  DeleteGuide(pk: number | string):Observable<any>{
    return this.http.delete<any>(`${environment.API_URL}/guide/guide/${pk}/`)
    .pipe(catchError(this.handlerError));
  }

  //http://127.0.0.1:8000/guide/guidedeactivate/1/1/1/

  GetGuideDeactivateUser(idcompany: number | string,id: number | string,idvehicle: number | string): Observable<GuideList[]>{
    return this.http.get<GuideList[]>(`${environment.API_URL}/guide/guidedeactivate/${idcompany}/${id}/${idvehicle}`)
    .pipe(catchError(this.handlerError));
  }

    //http://127.0.0.1:8000/guide/guidedetailsview/5/
  GetGuideListView(id: number | string): Observable<GuideListView>{
    return this.http.get<GuideListView>(`${environment.API_URL}/guide/guidedetailsview/${id}/`)
    .pipe(catchError(this.handlerError));
  }
  //http://127.0.0.1:8000/guide/guidedeactivate/1/1/1/

  GetGuideActivateUser(id: number | string): Observable<GuideList[]>{
    return this.http.get<GuideList[]>(`${environment.API_URL}/guide/guideactivate/${id}/`)
    .pipe(catchError(this.handlerError));
  }

  //unit
  GetUnit(): Observable<Unit[]>{
    return this.http.get<Unit[]>(`${environment.API_URL}/guide/unit/`)
    .pipe(catchError(this.handlerError));
  }

  PostUnit(unit: Unit):Observable<any>{
    return this.http.post<any>(`${environment.API_URL}/guide/unit/`, unit)
    .pipe(catchError(this.handlerError));
  }

  GetIdUnit(pk: number | string): Observable<Unit>{
    return this.http.get<Unit>(`${environment.API_URL}/guide/unit/${pk}/`)
    .pipe(catchError(this.handlerError));
  }

  PutUnit(unit: Unit, pk: number | string):Observable<any>{
    return this.http.put<any>(`${environment.API_URL}/guide/unit/${pk}/`, unit)
    .pipe(catchError(this.handlerError));
  }

  DeleteUnit(pk: number | string):Observable<any>{
    return this.http.delete<any>(`${environment.API_URL}/guide/unit/${pk}/`)
    .pipe(catchError(this.handlerError));
  }
  //invoicetype
  GetInvoiceType(): Observable<InvoiceType[]>{
    return this.http.get<InvoiceType[]>(`${environment.API_URL}/guide/invoicetype/`)
    .pipe(catchError(this.handlerError));
  }

  PostInvoiceType(invoicetype: InvoiceType):Observable<any>{
    return this.http.post<any>(`${environment.API_URL}/guide/invoicetype/`, invoicetype)
    .pipe(catchError(this.handlerError));
  }

  GetIdInvoiceType(pk: number | string): Observable<InvoiceType>{
    return this.http.get<InvoiceType>(`${environment.API_URL}/guide/invoicetype/${pk}/`)
    .pipe(catchError(this.handlerError));
  }

  PutInvoiceType(invoicetype: InvoiceType, pk: number | string):Observable<any>{
    return this.http.put<any>(`${environment.API_URL}/guide/invoicetype/${pk}/`, invoicetype)
    .pipe(catchError(this.handlerError));
  }

  DeleteInvoiceType(pk: number | string):Observable<any>{
    return this.http.delete<any>(`${environment.API_URL}/guide/invoicetype/${pk}/`)
    .pipe(catchError(this.handlerError));
  }
  //guidecontentdetail
  GetGuideContentDetail(): Observable<GuideContentDetail[]>{
    return this.http.get<GuideContentDetail[]>(`${environment.API_URL}/guide/guidecontentdetail/`)
    .pipe(catchError(this.handlerError));
  }

  PostGuideContentDetail(guidecontentdetail: GuideContentDetail):Observable<any>{
    return this.http.post<any>(`${environment.API_URL}/guide/guidecontentdetail/`, guidecontentdetail)
    .pipe(catchError(this.handlerError));
  }

  GetIdGuideContentDetail(pk: number | string): Observable<GuideContentDetail>{
    return this.http.get<GuideContentDetail>(`${environment.API_URL}/guide/guidecontentdetail/${pk}/`)
    .pipe(catchError(this.handlerError));
  }

  PutGuideContentDetail(guidecontentdetail: GuideContentDetail, pk: number | string):Observable<any>{
    return this.http.put<any>(`${environment.API_URL}/guide/guidecontentdetail/${pk}/`, guidecontentdetail)
    .pipe(catchError(this.handlerError));
  }

  DeleteGuideContentDetail(pk: number | string):Observable<any>{
    return this.http.delete<any>(`${environment.API_URL}/guide/guidecontentdetail/${pk}/`)
    .pipe(catchError(this.handlerError));
  }
  //guidecontentdetailtmp
  GetGuideContentDetailTmp(): Observable<GuideContentDetailTmp[]>{
    return this.http.get<GuideContentDetailTmp[]>(`${environment.API_URL}/guide/guidecontentdetailtmp/`)
    .pipe(catchError(this.handlerError));
  }

  PostGuideContentDetailTmp(guidecontentdetailtmp: GuideContentDetailTmp):Observable<any>{
    return this.http.post<any>(`${environment.API_URL}/guide/guidecontentdetailtmp/`, guidecontentdetailtmp)
    .pipe(catchError(this.handlerError));
  }

  GetIdGuideContentDetailTmp(pk: number | string): Observable<GuideContentDetailTmp>{
    return this.http.get<GuideContentDetailTmp>(`${environment.API_URL}/guide/guidecontentdetailtmp/${pk}/`)
    .pipe(catchError(this.handlerError));
  }

  PutGuideContentDetailTmp(guidecontentdetailtmp: GuideContentDetailTmp, pk: number | string):Observable<any>{
    return this.http.put<any>(`${environment.API_URL}/guide/guidecontentdetailtmp/${pk}/`, guidecontentdetailtmp)
    .pipe(catchError(this.handlerError));
  }

  DeleteGuideContentDetailTmp(pk: number | string):Observable<any>{
    return this.http.delete<any>(`${environment.API_URL}/guide/guidecontentdetailtmp/${pk}/`)
    .pipe(catchError(this.handlerError));
  }
  //guidecontent
  GetGuideContent(): Observable<GuideContentList[]>{
    return this.http.get<GuideContentList[]>(`${environment.API_URL}/guide/guidecontent/`)
    .pipe(catchError(this.handlerError));
  }

  PostGuideContent(guidecontent: GuideContent):Observable<any>{
    return this.http.post<any>(`${environment.API_URL}/guide/guidecontent/`, guidecontent)
    .pipe(catchError(this.handlerError));
  }

  GetIdGuideContent(pk: number | string): Observable<GuideContent>{
    return this.http.get<GuideContent>(`${environment.API_URL}/guide/guidecontent/${pk}/`)
    .pipe(catchError(this.handlerError));
  }

  PutGuideContent(guidecontent: GuideContent, pk: number | string):Observable<any>{
    return this.http.put<any>(`${environment.API_URL}/guide/guidecontent/${pk}/`, guidecontent)
    .pipe(catchError(this.handlerError));
  }

  DeleteGuideContent(pk: number | string):Observable<any>{
    return this.http.delete<any>(`${environment.API_URL}/guide/guidecontent/${pk}/`)
    .pipe(catchError(this.handlerError));
  }

  private handlerError(err: any): Observable<never>{
    let errorMessage = 'an error occured retrienving data';
    if(err){
      errorMessage = `${err.error.message}`;
    }
    if(err.error.code=='token_not_valid'){
      window.location.reload()
    }
    return throwError(errorMessage);
  }
}
