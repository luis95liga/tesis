import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { catchError, map, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {
  Owner,
  OwnerList,
  VehicleUse,
  Manufacturer,
  VehicleType,
  Fuel,
  TechnicalData,
  TechnicalDataList,
  Trailer,
  VehicleModel,
  VehicleModels,
  Axis,
  TechnicalDataTrailer,
  GeneralData,
  MaintenamceCosts,
  DocumentList,
  Document,
  DocumentType,
  FixedCosts
} from '@shared/models/vehicle.interface';

@Injectable({
  providedIn: 'root'
})
export class CatalogueService {

  constructor(
    private http: HttpClient
  ) { }

  //Propierario CRUD
  GetOwer(): Observable<OwnerList[]>{
    return this.http.get<OwnerList[]>(`${environment.API_URL}/vehicle/owner/`)
    .pipe(catchError(this.handlerError));
  }

  PostOwer(owner: Owner):Observable<any>{
    const body = {'name': owner.name, 'idcompany': owner.idcompany};
    return this.http.post<any>(`${environment.API_URL}/vehicle/owner/`,body)
    .pipe(catchError(this.handlerError));
  }

  GetIdOwer(pk: number | string): Observable<Owner>{
    return this.http.get<Owner>(`${environment.API_URL}/vehicle/owner/${pk}/`)
    .pipe(catchError(this.handlerError));
  }

  PutOwer(owner: Owner, pk: number | string):Observable<any>{
    const body = {'name': owner.name, 'idcompany': owner.idcompany};
    return this.http.put<any>(`${environment.API_URL}/vehicle/owner/${pk}/`, body)
    .pipe(catchError(this.handlerError));
  }

  DeleteOwer(pk: number | string):Observable<any>{
    return this.http.delete<any>(`${environment.API_URL}/vehicle/owner/${pk}/`)
    .pipe(catchError(this.handlerError));
  }

  // Uso del Vehiculo CRUD
  GetVehicleUse(): Observable<VehicleUse[]>{
    return this.http.get<VehicleUse[]>(`${environment.API_URL}/vehicle/vehicleuse/`)
    .pipe(catchError(this.handlerError));
  }

  PostVehicleUse(vehicleuse: VehicleUse):Observable<VehicleUse>{
    return this.http.post<VehicleUse>(`${environment.API_URL}/vehicle/vehicleuse/`,vehicleuse)
    .pipe(catchError(this.handlerError));
  }

  GetIdVehicleUse(pk: number | string): Observable<VehicleUse>{
    return this.http.get<VehicleUse>(`${environment.API_URL}/vehicle/vehicleuse/${pk}/`)
    .pipe(catchError(this.handlerError));
  }

  PutVehicleUse(vehicleuse: VehicleUse, pk: number | string):Observable<VehicleUse>{
    return this.http.put<VehicleUse>(`${environment.API_URL}/vehicle/vehicleuse/${pk}/`, vehicleuse)
    .pipe(catchError(this.handlerError));
  }

  DeleteVehicleUse(pk: number | string):Observable<VehicleUse>{
    return this.http.delete<VehicleUse>(`${environment.API_URL}/vehicle/vehicleuse/${pk}/`)
    .pipe(catchError(this.handlerError));
  }

  // Fabricante
  GetManufacturer(): Observable<Manufacturer[]>{
    return this.http.get<Manufacturer[]>(`${environment.API_URL}/vehicle/manufacturer/`)
    .pipe(catchError(this.handlerError));
  }

  PostManufacturer( manufacturer: Manufacturer):Observable<Manufacturer>{
    return this.http.post<Manufacturer>(`${environment.API_URL}/vehicle/manufacturer/`,manufacturer)
    .pipe(catchError(this.handlerError));
  }

  GetIdManufacturer(pk: number | string): Observable<Manufacturer>{
    return this.http.get<Manufacturer>(`${environment.API_URL}/vehicle/manufacturer/${pk}/`)
    .pipe(catchError(this.handlerError));
  }

  PutManufacturer(manufacturer: Manufacturer, pk: number | string):Observable<Manufacturer>{
    return this.http.put<Manufacturer>(`${environment.API_URL}/vehicle/manufacturer/${pk}/`, manufacturer)
    .pipe(catchError(this.handlerError));
  }

  DeleteManufacturer(pk: number | string):Observable<Manufacturer>{
    return this.http.delete<Manufacturer>(`${environment.API_URL}/vehicle/manufacturer/${pk}/`)
    .pipe(catchError(this.handlerError));
  }

  //Tipo de Vehiculo
  GetVehicleType(): Observable<VehicleType[]>{
    return this.http.get<VehicleType[]>(`${environment.API_URL}/vehicle/vehicletype/`)
    .pipe(catchError(this.handlerError));
  }

  PostVehicleType( vehicletype:VehicleType):Observable<VehicleType>{
    return this.http.post<VehicleType>(`${environment.API_URL}/vehicle/vehicletype/`,vehicletype)
    .pipe(catchError(this.handlerError));
  }

  GetIdVehicleType(pk: number | string): Observable<VehicleType>{
    return this.http.get<VehicleType>(`${environment.API_URL}/vehicle/vehicletype/${pk}/`)
    .pipe(catchError(this.handlerError));
  }

  PutVehicleType(vehicletype: VehicleType, pk: number | string):Observable<VehicleType>{
    return this.http.put<VehicleType>(`${environment.API_URL}/vehicle/vehicletype/${pk}/`, vehicletype)
    .pipe(catchError(this.handlerError));
  }

  DeleteVehicleType(pk: number | string):Observable<VehicleType>{
    return this.http.delete<VehicleType>(`${environment.API_URL}/vehicle/vehicletype/${pk}/`)
    .pipe(catchError(this.handlerError));
  }

  //Combustible
  GetFuel(): Observable<Fuel[]>{
    return this.http.get<Fuel[]>(`${environment.API_URL}/vehicle/fuel/`)
    .pipe(catchError(this.handlerError));
  }

  PostFuel( fuel: Fuel):Observable<Fuel>{
    return this.http.post<Fuel>(`${environment.API_URL}/vehicle/fuel/`,fuel)
    .pipe(catchError(this.handlerError));
  }

  GetIdFuel(pk: number | string): Observable<Fuel>{
    return this.http.get<Fuel>(`${environment.API_URL}/vehicle/fuel/${pk}/`)
    .pipe(catchError(this.handlerError));
  }

  PutFuel(fuel: Fuel, pk: number | string):Observable<Fuel>{
    return this.http.put<Fuel>(`${environment.API_URL}/vehicle/fuel/${pk}/`, fuel)
    .pipe(catchError(this.handlerError));
  }

  DeleteFuel(pk: number | string):Observable<Fuel>{
    return this.http.delete<Fuel>(`${environment.API_URL}/vehicle/fuel/${pk}/`)
    .pipe(catchError(this.handlerError));
  }

  //Datos Tecnicos
  GetTechnicalData(): Observable<TechnicalDataList[]>{
    return this.http.get<TechnicalDataList[]>(`${environment.API_URL}/vehicle/technicaldata/`)
    .pipe(catchError(this.handlerError));
  }

  PostTechnicalData( technicaltata: TechnicalData ):Observable<TechnicalData>{
    return this.http.post<TechnicalData>(`${environment.API_URL}/vehicle/technicaldata/`, technicaltata)
    .pipe(catchError(this.handlerError));
  }

  GetIdTechnicalData( pk: number | string ): Observable<TechnicalData>{
    return this.http.get<TechnicalData>(`${environment.API_URL}/vehicle/technicaldata/${pk}/`)
    .pipe(catchError(this.handlerError));
  }

  PutTechnicalData(technicaldata: any, pk: number | string):Observable<TechnicalData>{
    return this.http.put<TechnicalData>(`${environment.API_URL}/vehicle/technicaldata/${pk}/`, technicaldata)
    .pipe(catchError(this.handlerError));
  }

  DeleteTechnicalData(pk: number | string):Observable<TechnicalData>{
    return this.http.delete<TechnicalData>(`${environment.API_URL}/vehicle/technicaldata/${pk}/`)
    .pipe(catchError(this.handlerError));
  }

  //Datos Tecnicos del trailer
  GetTechnicalDataTrailer(): Observable<TechnicalDataTrailer[]>{
    return this.http.get<TechnicalDataTrailer[]>(`${environment.API_URL}/vehicle/technicaldatatraile/`)
    .pipe(catchError(this.handlerError));
  }

  PostTechnicalDataTrailer( technicaltatatrailer: TechnicalDataTrailer ):Observable<any>{
    return this.http.post<any>(`${environment.API_URL}/vehicle/technicaldatatraile/`, technicaltatatrailer)
    .pipe(catchError(this.handlerError));
  }

  GetIdTechnicalDataTrailer( pk: number | string ): Observable<TechnicalDataTrailer>{
    return this.http.get<TechnicalDataTrailer>(`${environment.API_URL}/vehicle/technicaldatatraile/${pk}/`)
    .pipe(catchError(this.handlerError));
  }

  PutTechnicalDataTrailer(technicaldatatrailer: any, pk: number | string):Observable<any>{
    return this.http.put<any>(`${environment.API_URL}/vehicle/technicaldatatraile/${pk}/`, technicaldatatrailer)
    .pipe(catchError(this.handlerError));
  }

  DeleteTechnicalDataTrailer(pk: number | string):Observable<any>{
    return this.http.delete<any>(`${environment.API_URL}/vehicle/technicaldata/${pk}/`)
    .pipe(catchError(this.handlerError));
  }

  // modelos de Vehiculos
  GetVehicleModel(): Observable<VehicleModels[]>{
    return this.http.get<VehicleModels[]>(`${environment.API_URL}/vehicle/vehiclemodel/`)
    .pipe(catchError(this.handlerError));
  }

  PostVehicleModel( vehiclemodel: VehicleModel):Observable<VehicleModel>{
    return this.http.post<VehicleModel>(`${environment.API_URL}/vehicle/vehiclemodel/`, vehiclemodel)
    .pipe(catchError(this.handlerError));
  }

  GetIdVehicleModel(pk: number | string): Observable<VehicleModel>{
    return this.http.get<VehicleModel>(`${environment.API_URL}/vehicle/vehiclemodel/${pk}/`)
    .pipe(catchError(this.handlerError));
  }

  PutVehicleModel(vehiclemodel: VehicleModel, pk: number | string):Observable<VehicleModel>{
    return this.http.put<VehicleModel>(`${environment.API_URL}/vehicle/vehiclemodel/${pk}/`, vehiclemodel)
    .pipe(catchError(this.handlerError));
  }

  DeleteVehicleModel(pk: number | string):Observable<VehicleModel>{
    return this.http.delete<VehicleModel>(`${environment.API_URL}/vehicle/vehiclemodel/${pk}/`)
    .pipe(catchError(this.handlerError));
  }

  // Ejes
  GetAxis(): Observable<Axis[]>{
    return this.http.get<Axis[]>(`${environment.API_URL}/vehicle/axes/`)
    .pipe(catchError(this.handlerError));
  }

  PostAxis( axis: Axis):Observable<Axis>{
    return this.http.post<Axis>(`${environment.API_URL}/vehicle/axes/`, axis)
    .pipe(catchError(this.handlerError));
  }

  GetIdAxis(pk: number | string): Observable<Axis>{
    return this.http.get<Axis>(`${environment.API_URL}/vehicle/axes/${pk}/`)
    .pipe(catchError(this.handlerError));
  }

  PutAxis(axis: Axis, pk: number | string):Observable<any>{
    return this.http.put<any>(`${environment.API_URL}/vehicle/axes/${pk}/`, axis)
    .pipe(catchError(this.handlerError));
  }

  DeleteAxis(pk: number | string):Observable<any>{
    return this.http.delete<any>(`${environment.API_URL}/vehicle/axes/${pk}/`)
    .pipe(catchError(this.handlerError));
  }

  //generaldatavehicle
  GetGeneralDataVehicle(pk: number | string): Observable<GeneralData>{
    return this.http.get<GeneralData>(`${environment.API_URL}/vehicle/generaldatavehicle/${pk}/`)
    .pipe(catchError(this.handlerError));
  }
  //GeneralData
  GetGeneralData(): Observable<GeneralData[]>{
    return this.http.get<GeneralData[]>(`${environment.API_URL}/vehicle/generaldata/`)
    .pipe(catchError(this.handlerError));
  }

  PostGeneralData( data: GeneralData):Observable<any>{
    return this.http.post<any>(`${environment.API_URL}/vehicle/generaldata/`, data)
    .pipe(catchError(this.handlerError));
  }

  GetIdGeneralData(pk: number | string): Observable<GeneralData>{
    return this.http.get<GeneralData>(`${environment.API_URL}/vehicle/generaldata/${pk}/`)
    .pipe(catchError(this.handlerError));
  }

  PutGeneralData(data: GeneralData, pk: number | string):Observable<any>{
    return this.http.put<any>(`${environment.API_URL}/vehicle/generaldata/${pk}/`, data)
    .pipe(catchError(this.handlerError));
  }

  DeleteGeneralData(pk: number | string):Observable<any>{
    return this.http.delete<any>(`${environment.API_URL}/vehicle/generaldata/${pk}/`)
    .pipe(catchError(this.handlerError));
  }

  //maintenamcecostsvehicle
  GetMaintenamceCostsVehicle(pk: number | string): Observable<MaintenamceCosts>{
    return this.http.get<MaintenamceCosts>(`${environment.API_URL}/vehicle/maintenamcecostsvehicle/${pk}/`)
    .pipe(catchError(this.handlerError));
  }

  //maintenamcecosts
  GetMaintenamceCosts(): Observable<MaintenamceCosts[]>{
    return this.http.get<MaintenamceCosts[]>(`${environment.API_URL}/vehicle/maintenamcecosts/`)
    .pipe(catchError(this.handlerError));
  }

  PostMaintenamceCosts( data: MaintenamceCosts):Observable<any>{
    return this.http.post<any>(`${environment.API_URL}/vehicle/maintenamcecosts/`, data)
    .pipe(catchError(this.handlerError));
  }

  GetIdMaintenamceCosts(pk: number | string): Observable<MaintenamceCosts>{
    return this.http.get<MaintenamceCosts>(`${environment.API_URL}/vehicle/maintenamcecosts/${pk}/`)
    .pipe(catchError(this.handlerError));
  }

  PutMaintenamceCosts(data: MaintenamceCosts, pk: number | string):Observable<any>{
    return this.http.put<any>(`${environment.API_URL}/vehicle/maintenamcecosts/${pk}/`, data)
    .pipe(catchError(this.handlerError));
  }

  DeleteMaintenamceCosts(pk: number | string):Observable<any>{
    return this.http.delete<any>(`${environment.API_URL}/vehicle/maintenamcecosts/${pk}/`)
    .pipe(catchError(this.handlerError));
  }

  //documentvehicle
  GetDocumentVehicle(pk: number | string): Observable<DocumentList[]>{
    return this.http.get<DocumentList[]>(`${environment.API_URL}/vehicle/documentvehicle/${pk}/`)
    .pipe(catchError(this.handlerError));
  }

  //documenvehicle
  GetDocument(): Observable<DocumentList[]>{
    return this.http.get<DocumentList[]>(`${environment.API_URL}/vehicle/maintenamcecosts/`)
    .pipe(catchError(this.handlerError));
  }

  PostDocument( data: any):Observable<any>{
    return this.http.post<any>(`${environment.API_URL}/vehicle/document/`, data)
    .pipe(catchError(this.handlerError));
  }

  GetIdDocument(pk: number | string): Observable<Document>{
    return this.http.get<Document>(`${environment.API_URL}/vehicle/document/${pk}/`)
    .pipe(catchError(this.handlerError));
  }

  PutDocument(data: any, pk: number | string):Observable<any>{
    return this.http.put<any>(`${environment.API_URL}/vehicle/document/${pk}/`, data)
    .pipe(catchError(this.handlerError));
  }

  DeleteDocument(pk: number | string):Observable<any>{
    return this.http.delete<any>(`${environment.API_URL}/vehicle/document/${pk}/`)
    .pipe(catchError(this.handlerError));
  }

  //documenttype
  GetDocumentType(): Observable<DocumentType[]>{
    return this.http.get<DocumentType[]>(`${environment.API_URL}/vehicle/vehicledocumenttype/`)
    .pipe(catchError(this.handlerError));
  }

  PostDocumentType( data: any):Observable<any>{
    return this.http.post<any>(`${environment.API_URL}/vehicle/vehicledocumenttype/`, data)
    .pipe(catchError(this.handlerError));
  }

  GetIdDocumentType(pk: number | string): Observable<DocumentType>{
    return this.http.get<DocumentType>(`${environment.API_URL}/vehicle/vehicledocumenttype/${pk}/`)
    .pipe(catchError(this.handlerError));
  }

  PutDocumentType(data: any, pk: number | string):Observable<any>{
    return this.http.put<any>(`${environment.API_URL}/vehicle/vehicledocumenttype/${pk}/`, data)
    .pipe(catchError(this.handlerError));
  }

  DeleteDocumentType(pk: number | string):Observable<any>{
    return this.http.delete<any>(`${environment.API_URL}/vehicle/vehicledocumenttype/${pk}/`)
    .pipe(catchError(this.handlerError));
  }

   //FixedCostsVehicle
   GetFixedCostsVehicle(pk: number | string): Observable<FixedCosts[]>{
    return this.http.get<FixedCosts[]>(`${environment.API_URL}/vehicle/fixedcostsvehicle/${pk}/`)
    .pipe(catchError(this.handlerError));
  }

  //fixedcosts
  GetFixedCosts(): Observable<FixedCosts[]>{
    return this.http.get<FixedCosts[]>(`${environment.API_URL}/vehicle/fixedcosts/`)
    .pipe(catchError(this.handlerError));
  }

  PostFixedCosts( data: any):Observable<any>{
    return this.http.post<any>(`${environment.API_URL}/vehicle/fixedcosts/`, data)
    .pipe(catchError(this.handlerError));
  }

  GetIdFixedCosts(pk: number | string): Observable<FixedCosts>{
    return this.http.get<FixedCosts>(`${environment.API_URL}/vehicle/fixedcosts/${pk}/`)
    .pipe(catchError(this.handlerError));
  }

  PutFixedCosts(data: any, pk: number | string):Observable<any>{
    return this.http.put<any>(`${environment.API_URL}/vehicle/fixedcosts/${pk}/`, data)
    .pipe(catchError(this.handlerError));
  }

  DeleteFixedCosts(pk: number | string):Observable<any>{
    return this.http.delete<any>(`${environment.API_URL}/vehicle/fixedcosts/${pk}/`)
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
