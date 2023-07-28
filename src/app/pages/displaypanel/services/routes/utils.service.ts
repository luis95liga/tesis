import { TabulationService } from '@displaypanel/services/routes/tabulation.service';
import { GuideService } from './../guide/guide.service';
import { Injectable } from '@angular/core';
import { Guide, GuideList } from '@app/shared/models/guide.interface';
import { Bill, BillTabulation, TabulationList } from '@app/shared/models/router.interface';
import { FixedCosts, GeneralData, MaintenamceCosts } from '@app/shared/models/vehicle.interface';
import { BillList } from '@app/shared/models/router.interface';

export interface MaintenamceCostsForm {
  tirealignmentA: string;
  ordinarymaintenanceA: string;
  electricsystemA: string;
  brakingsystemA: string;
  suspensionA: string;
  transmissionsystemA: string;
  enginerepairA: string;
  tirealignment: string;
  ordinarymaintenance: string;
  electricsystem: string;
  brakingsystem: string;
  suspension: string;
  transmissionsystem: string;
  enginerepair: string;
  tirealignmentKm: string;
  ordinarymaintenanceKm: string;
  electricsystemKm: string;
  brakingsystemKm: string;
  suspensionKm: string;
  transmissionsystemKm: string;
  enginerepairKm: string;
  total: number;
}

export interface FixedCostsForm {
  salaryA: string;
  salary: number;
  salaryKm: string;
  garageA: string;
  garage: number;
  garageKm: string;
  registrationA: number;
  registration: string;
  registrationKm: string;
  sureA: string;
  sure: number;
  sureKm: string;
  revisionA: string;
  revision: number;
  revisionKm: string;
  billsA: string;
  bills: string;
  billsKm: string;
  servicesA: string;
  services: string;
  servicesKm: string;
  costsA: string;
  costs: number;
  costsKm: string;
  depreciationsA: string;
  depreciations: string;
  depreciationsKm: string;
  permissionsA: number;
  permissions: string;
  permissionsKm: string;
  gpsA: string;
  gps: number;
  gpsKm: string;
  policiesA: string;
  policies: number;
  policiesKm: string;
  total: string;
}

export interface ExtraCostForm {
  dieselCostv: number;
  dieselKmv: number;
  dieselCantv: number;
  dieselCostKm: string;
  tollCostv: number;
  tollKmv: number;
  tollCantv: number;
  tollCostKm: string;
  viaticCostv: number;
  viaticKmv: number;
  viaticCantv: number;
  viaticCostKm: string;
  weightsScaleCostv: number;
  weightsScaleKmv: number;
  weightsScaleCantv: number;
  weightsScaleCostKm: string;
  loadDownloadCostv: number;
  loadDownloadKmv: number;
  loadDownloadCantv: number;
  loadDownloadCostKm: string;
  caravanCostv: number;
  caravanKmv: number;
  caravanCantv: number;
  caravanCostKm: string;
  total: string;
}

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  guide: Guide = {
    hours: 0,
    idcompany: 0,
    idclient: 0,
    iddestinations:0,
    idguide: 0,
    idlocation: 0,
    iduser: 0,
    km: 0,
    name: '',
    status: false,
    idvehicle: 0
  };
  bill: BillList[] = [];
  result: any[] = [];
  constructor(
    private guideSvc: GuideService,
    private tabulationSvc: TabulationService,
  ) { }

  MaintenamceCostsF(maintenamcecosts: MaintenamceCosts, TKmM: number): MaintenamceCostsForm{
    //tiresAlignment
    const num1 = parseFloat( '' + maintenamcecosts.fronttiresCkm);
    const num2 = parseFloat( '' + maintenamcecosts.drivetiresCkm);
    const num3 = parseFloat( '' + maintenamcecosts.dragtiresCkm);
    const num4 = parseFloat( '' + maintenamcecosts.wheelsCkm);
    const num5 = parseFloat( '' + maintenamcecosts.puncturesanddamageCkm);
    const num6 = parseFloat( '' + maintenamcecosts.alignmentCkm);
    const num7 = parseFloat( '' + maintenamcecosts.swingingCkm);
    const tiresAlignment = (num1 + num2 + num3 + num4 + num5 + num6 + num7).toFixed(5);

    //ordinarymaintenance
    const num8 = parseFloat( '' + maintenamcecosts.oilchangeCkm);
    const num9 = parseFloat( '' + maintenamcecosts.casetransmissionoilCkm);
    const num10 = parseFloat( '' + maintenamcecosts.airfiltersCkm);
    const num11 = parseFloat( '' + maintenamcecosts.lubricantsfluidsCkm);
    const num12 = parseFloat( '' + maintenamcecosts.cleaningCkm);
    const ordinarymaintenance = (num8 + num9 + num10 + num11 + num12).toFixed(5);

    //electricsystem
    const num13 = parseFloat( '' + maintenamcecosts.acCkm);
    const num14 = parseFloat( '' + maintenamcecosts.pressuregaugesCkm);
    const num15 = parseFloat( '' + maintenamcecosts.glassesandcleaningsystemCkm);
    const num16 = parseFloat( '' + maintenamcecosts.lightsCkm);
    const num17 = parseFloat( '' + maintenamcecosts.accessoriesCkm);
    const num18 = parseFloat( '' + maintenamcecosts.startingmotorCkm);
    const num19 = parseFloat( '' + maintenamcecosts.alternatorCkm);
    const num20 = parseFloat( '' + maintenamcecosts.batteriesCkm);
    const electricsystem = (num13 + num14 + num15 + num16 + num17 + num18 + num19 + num20).toFixed(5);

    //brakingsystem
    const num21 = parseFloat( '' + maintenamcecosts.minorrepairCkm);
    const num22 = parseFloat( '' + maintenamcecosts.majorrepairCkm);
    const num23 = parseFloat( '' + maintenamcecosts.adjustmentscalibrationsCkm);
    const num24 = parseFloat( '' + maintenamcecosts.drumsCkm);
    const num25 = parseFloat( '' + maintenamcecosts.sealsCkm);
    const  brakingsystem = (num21 + num22 + num23 + num24 + num25).toFixed(5)

    //suspension
    const num26 = parseFloat( '' + maintenamcecosts.springsleafspringsCkm);
    const num27 = parseFloat( '' + maintenamcecosts.rubberCkm);
    const suspension = (num26 + num27).toFixed(5);

    //transmissionsystem
    const num28 = parseFloat( '' + maintenamcecosts.addressCkm);
    const num29 = parseFloat( '' + maintenamcecosts.pinCkm);
    const num30 = parseFloat( '' + maintenamcecosts.clutchclutchCkm);
    const num31 = parseFloat( '' + maintenamcecosts.transmissiondifferentialCkm);
    const num32 = parseFloat( '' + maintenamcecosts.boxCkm);
    const num33 = parseFloat( '' + maintenamcecosts.cardanCkm);
    const num34 = parseFloat( '' + maintenamcecosts.frontloadaxleCkm);
    const num35 = parseFloat( '' + maintenamcecosts.rearloadaxleCkm);
    const transmissionsystem = (num28 + num29 + num30 + num31 + num32 + num33 + num34 + num35).toFixed(5);
    //enginerepair
    const num36 = parseFloat( '' + maintenamcecosts.waterpumpCkm);
    const num37 = parseFloat( '' + maintenamcecosts.airpurifierCkm);
    const num38 = parseFloat( '' + maintenamcecosts.radiatorCkm);
    const num39 = parseFloat( '' + maintenamcecosts.intonationtuningCkm);
    const num40 = parseFloat( '' + maintenamcecosts.engineoverhaulCkm);
    const num41 = parseFloat( '' + maintenamcecosts.turboCkm);
    const num42 = parseFloat( '' + maintenamcecosts.fuelpumpCkm);
    const num43 = parseFloat( '' + maintenamcecosts.oilsystemCkm);
    const num44 = parseFloat( '' + maintenamcecosts.coolingCkm);
    const num45 = parseFloat( '' + maintenamcecosts.exhaustsystemCkm);
    const num46 = parseFloat( '' + maintenamcecosts.electronicsystemCkm);
    const enginerepair = ( num36 + num37 + num38 + num39 + num40 + num41 + num42 +
      num43 + num44 + num45 + num46).toFixed(5);
    return {
      tirealignmentA: ((parseFloat(tiresAlignment)*TKmM)*12).toFixed(2),
      ordinarymaintenanceA: ((parseFloat(ordinarymaintenance)*TKmM)*12).toFixed(2),
      electricsystemA: ((parseFloat(electricsystem)*TKmM)*12).toFixed(2),
      brakingsystemA: ((parseFloat(brakingsystem)*TKmM)*12).toFixed(2),
      suspensionA: ((parseFloat(suspension)*TKmM)*12).toFixed(2),
      transmissionsystemA: ((parseFloat(transmissionsystem)*TKmM)*12).toFixed(2),
      enginerepairA: ((parseFloat(enginerepair)*TKmM)*12).toFixed(2),
      tirealignment: (parseFloat(tiresAlignment)*TKmM).toFixed(2),
      ordinarymaintenance: (parseFloat(ordinarymaintenance)*TKmM).toFixed(2),
      electricsystem: (parseFloat(electricsystem)*TKmM).toFixed(2),
      brakingsystem: (parseFloat(brakingsystem)*TKmM).toFixed(2),
      suspension: (parseFloat(suspension)*TKmM).toFixed(2),
      transmissionsystem: (parseFloat(transmissionsystem)*TKmM).toFixed(2),
      enginerepair: (parseFloat(enginerepair)*TKmM).toFixed(2),
      tirealignmentKm: tiresAlignment,
      ordinarymaintenanceKm: ordinarymaintenance,
      electricsystemKm: electricsystem,
      brakingsystemKm: brakingsystem,
      suspensionKm: suspension,
      transmissionsystemKm: transmissionsystem,
      enginerepairKm: enginerepair,
      total: maintenamcecosts.total,
    }
  }
  FixedCostsF(travelsalary: number, generaldata: GeneralData, fixedcost: FixedCosts, TKmM: number, loadVehicle: number): FixedCostsForm {
    const salaryKm = travelsalary/TKmM;
    const garageKm = (generaldata.garage/TKmM);
    const registrationKm = ((fixedcost.vehicleRegistration/12)/TKmM);
    const sureKm = (fixedcost.insurance/TKmM);
    const revisionKm = (fixedcost.technicalReviews/TKmM);
    const billsKm = ((generaldata.adminexpensesmonth/loadVehicle)/TKmM);
    const servicesKm = ((generaldata.basicservicesmonth/loadVehicle)/TKmM);
    const costsKm = (fixedcost.financialCosts/TKmM);
    const depreciationsKm = (((generaldata.vehiclevalue*0.1)/12)/TKmM);
    const permissionsKm = ((generaldata.permitsqualifications/12)/TKmM);
    const gpsKm = (fixedcost.satelliteTracking/TKmM);
    const policiesKm = (fixedcost.andeanPolicy/TKmM);
    const total = salaryKm + garageKm + registrationKm + sureKm + revisionKm + billsKm + servicesKm + costsKm + depreciationsKm +
      permissionsKm + gpsKm + policiesKm;
    return {
      salaryA: (travelsalary*12).toFixed(2),
      salary: travelsalary,
      salaryKm: (travelsalary/TKmM).toFixed(5),
      garageA: (generaldata.garage*12).toFixed(2),
      garage: generaldata.garage,
      garageKm: (generaldata.garage/TKmM).toFixed(5),
      registrationA: fixedcost.vehicleRegistration,
      registration: (fixedcost.vehicleRegistration/12).toFixed(2),
      registrationKm: ((fixedcost.vehicleRegistration/12)/TKmM).toFixed(5),
      sureA: (fixedcost.insurance*12).toFixed(2),
      sure: fixedcost.insurance,
      sureKm: (fixedcost.insurance/TKmM).toFixed(5),
      revisionA: (fixedcost.technicalReviews*12).toFixed(2),
      revision: fixedcost.technicalReviews,
      revisionKm: (fixedcost.technicalReviews/TKmM).toFixed(5),
      billsA: ((generaldata.adminexpensesmonth/loadVehicle)*12).toFixed(2),
      bills: (generaldata.adminexpensesmonth/loadVehicle).toFixed(2),
      billsKm: ((generaldata.adminexpensesmonth/loadVehicle)/TKmM).toFixed(5),
      servicesA: ((generaldata.basicservicesmonth/loadVehicle)*12).toFixed(2),
      services: (generaldata.basicservicesmonth/loadVehicle).toFixed(2),
      servicesKm: ((generaldata.basicservicesmonth/loadVehicle)/TKmM).toFixed(5),
      costsA: (fixedcost.financialCosts*12).toFixed(2),
      costs: fixedcost.financialCosts,
      costsKm: (fixedcost.financialCosts/TKmM).toFixed(5),
      depreciationsA: (generaldata.vehiclevalue*0.1).toFixed(2),
      depreciations: ((generaldata.vehiclevalue*0.1)/12).toFixed(2),
      depreciationsKm: (((generaldata.vehiclevalue*0.1)/12)/TKmM).toFixed(5),
      permissionsA: generaldata.permitsqualifications,
      permissions: (generaldata.permitsqualifications/12).toFixed(2),
      permissionsKm: ((generaldata.permitsqualifications/12)/TKmM).toFixed(5),
      gpsA: (fixedcost.satelliteTracking*12).toFixed(2),
      gps: fixedcost.satelliteTracking,
      gpsKm: (fixedcost.satelliteTracking/TKmM).toFixed(5),
      policiesA: (fixedcost.andeanPolicy*12).toFixed(2),
      policies: fixedcost.andeanPolicy,
      policiesKm: (fixedcost.andeanPolicy/TKmM).toFixed(5),
      total: parseFloat(''+total).toFixed(2),
    }
  }

  ExtraCostF( data: BillTabulation[], kmv: number ): ExtraCostForm{
    let dieselCostv: number = 0;
    let tollCostv: number = 0;
    let viaticCostv: number = 0;
    let weightsScaleCostv: number = 0;
    let loadDownloadCostv: number = 0;
    let caravanCostv: number = 0;
    for(let item of data){
      if(item.concepts === 'DIESEL'){
        dieselCostv = item.amount;
      }
      if(item.concepts === 'PEAJE'){
        tollCostv = item.amount;
      }
      if(item.concepts === 'VIÁTICOS'){
        viaticCostv = item.amount;
      }
      if(item.concepts === 'PESAS Y BALANZA'){
        weightsScaleCostv = item.amount;
      }
      if(item.concepts === 'CARGUE Y DESCARGUE'){
        loadDownloadCostv = item.amount;
      }
      if(item.concepts === 'CARAVANA'){
        caravanCostv = item.amount;
      }
    }

    const total: number = ((dieselCostv/kmv)*1) + ((tollCostv/kmv)*10) + ((viaticCostv/kmv)*1)+
    ((weightsScaleCostv/kmv)*1) + ((loadDownloadCostv/kmv)*14) + ((caravanCostv/kmv)*14);
    return {
      dieselCostv: dieselCostv,
      dieselKmv: kmv,
      dieselCantv: 1,
      dieselCostKm: ((dieselCostv/kmv)*1).toFixed(5),
      tollCostv: tollCostv,
      tollKmv: kmv,
      tollCantv: 10,
      tollCostKm: ((tollCostv/kmv)*10).toFixed(5),
      viaticCostv: viaticCostv,
      viaticKmv: kmv,
      viaticCantv: 1,
      viaticCostKm: ((viaticCostv/kmv)*1).toFixed(5),
      weightsScaleCostv: weightsScaleCostv,
      weightsScaleKmv: kmv,
      weightsScaleCantv: 1,
      weightsScaleCostKm: ((weightsScaleCostv/kmv)*1).toFixed(5),
      loadDownloadCostv: loadDownloadCostv,
      loadDownloadKmv: kmv,
      loadDownloadCantv: 14,
      loadDownloadCostKm: ((loadDownloadCostv/kmv)*14).toFixed(5),
      caravanCostv: caravanCostv,
      caravanKmv: kmv,
      caravanCantv: 14,
      caravanCostKm: ((caravanCostv/kmv)*14).toFixed(5),
      total: (total).toFixed(2)
    };
  }

}
