import { TravelService } from '@displaypanel/services/guide/travel.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { VehicleService } from '@displaypanel/services/vehicle/vehicle.service';
import { CompanyService } from '@displaypanel/services/business/company.service';
import { FixedCosts, GeneralData, MaintenamceCosts, VehicleList } from '@app/shared/models/vehicle.interface';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { GuideComponent } from './components/guide/guide.component';
import { TabulationService } from '@displaypanel/services/routes/tabulation.service';
import { CatalogueService } from '@app/pages/displaypanel/services/vehicle/catalogue.service';
import { EmployeesService } from '@app/pages/displaypanel/services/business/employees.service';
import { formatDate } from '@angular/common';
import { TrailerComponent } from './components/trailer/trailer.component';
import { AuthService } from '@app/pages/auth/auth.service';
import { GuideService } from '@app/pages/displaypanel/services/guide/guide.service';
import { GuideList, Travel } from '@app/shared/models/guide.interface';
import { BillList, BillTabulation, TabulationList } from '@app/shared/models/router.interface';
import { UtilsService } from '@app/pages/displaypanel/services/routes/utils.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GuideeditComponent } from './components/guideedit/guideedit.component';

enum Action {
  EDIT = 'edit',
  NEW = 'new',
}

@Component({
  selector: 'app-travel',
  templateUrl: './travel.component.html',
  styleUrls: ['./travel.component.scss']
})
export class TravelComponent implements OnInit {

  actionTODO = '';
  idtravel = 0;
  text = 'nuevo';
  totalresult = false;
  vehicles: any[] = [];
  vehicles1: any[] = [];
  control = new FormControl('');
  filteredvehicle: Observable<string[]> | undefined;
  filteredempleyee: Observable<string[]> | undefined;
  travelform!: FormGroup;
  idcompany: any;
  idclient: any;
  name: any;
  idthenical: number = 0;
  guia: any[]=  [];
  start: any;
  end: any;
  client: any[] = [];
  dato: any[] = [];
  billtabulation: BillTabulation[] = [];
  generaldata: any;
  fixedcost: any;
  maintenamcecosts: any;
  kms = 0;
  hours =0;
  trayect: string='';
  travelsalary: number = 0;
  travelsalatyre: number = 0;
  tank: string = '';
  yield_gallon: any;
  performance: number = 0;
  fixedcostsform!: FormGroup;
  maintenamcecostsform!: FormGroup;
  resultform!: FormGroup;
  extracostform!: FormGroup;
  vehiclerelationshipform!: FormGroup;
  idvahicle: any;
  loadVehicle: any;
  totalvalue: any;
  guiaData: boolean = false;
  tabulation: TabulationList[] = [];
  bill:BillList[] =[];
  guiaList: GuideList[] = [];
  porcentage: number[] = [];
  reolad: boolean = false;
  m: any;
  constructor(
    private vehicleSvc: VehicleService,
    private authSvs: AuthService,
    private companySvc: CompanyService,
    private catalogueSvc: CatalogueService,
    private employeeSvc: EmployeesService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private tabulationSvc: TabulationService,
    private guideSvc: GuideService,
    private utilsSvc: UtilsService,
    private travelSvc: TravelService,
    private route: Router,
    private activatedr: ActivatedRoute,
  ) { }

  TravelForm(): void {

    this.travelform = this.fb.group({
      idemployee: [null,[Validators.required]],
      idvehicle: [null,[Validators.required]],
      employee: [null,[Validators.required]],
      use: [null,[Validators.required]],
      agination_date: [null,[Validators.required]],
      vehicle_use: [null,[Validators.required]],
      client: [null,[Validators.required]],
      guide: [[],[Validators.required]],
      trayect: [[],[Validators.required]],
      kms: [null,[ Validators.required,Validators.pattern(/\d/), Validators.min(1)]],
      kmsdes: [null,[Validators.pattern(/\d/), Validators.required, Validators.min(0)]],
      datestart: [null,[Validators.required]],
      dateend: [null,[Validators.required]],
      hours: [null,[Validators.required,Validators.pattern(/\d/), Validators.min(1)]],
      salary: [null,[Validators.required,Validators.pattern(/\d/), Validators.min(1)]],
      feeding: [null,[Validators.required,Validators.pattern(/\d/), Validators.min(1)]],
      totalsalary: [null,[Validators.required,Validators.pattern(/\d/), Validators.min(1)]],
      receivesalary: [null,[Validators.required,Validators.pattern(/\d/), Validators.min(1)]],
      s: [null,[Validators.required,Validators.required]],
      stay: [false,[Validators.required]],
      idtrailer:[null,[Validators.required]],
      tuition: [null,[Validators.required]],
      trailer_use: [null,[Validators.required]],
      kml: [null,[Validators.required]],
      ltes: [null,[Validators.required]],
      tank: [null,[]],
      ltgas: [null,[Validators.required]],
      dif: [null,[Validators.required]],
      observations: [null,[Validators.required]],
      performance: [null,[Validators.required,Validators.pattern(/\d/), Validators.min(1)]],
      subtotal: [null,[Validators.required,Validators.pattern(/\d/), Validators.min(1)]],
      percentage: [null,[Validators.required,Validators.pattern(/\d/), Validators.min(1)]],
      total: [null,[Validators.required,Validators.pattern(/\d/), Validators.min(1)]],
      profitability:[null,[Validators.required,Validators.pattern(/\d/), Validators.min(1)]]
    });

    this.vehiclerelationshipform = this.fb.group({
      kmOD: [,[]],
      kmV: [,[]],
      kmM:[,[]],
      TKmM: [,[]],
    });

    this.fixedcostsform = this.fb.group({
      salaryA: [,[]],
      salary: [,[]],
      salaryKm: [,[]],
      garageA:[,[]],
      garage:[,[]],
      garageKm:[,[]],
      registrationA:[,[]],
      registration:[,[]],
      registrationKm:[,[]],
      sureA:[,[]],
      sure:[,[]],
      sureKm:[,[]],
      revisionA:[,[]],
      revision:[,[]],
      revisionKm:[,[]],
      billsA:[,[]],
      bills:[,[]],
      billsKm:[,[]],
      servicesA:[,[]],
      services:[,[]],
      servicesKm:[,[]],
      costsA:[,[]],
      costs:[,[]],
      costsKm:[,[]],
      depreciationsA:[,[]],
      depreciations:[,[]],
      depreciationsKm:[,[]],
      permissionsA:[,[]],
      permissions:[,[]],
      permissionsKm:[,[]],
      gpsA:[,[]],
      gps:[,[]],
      gpsKm:[,[]],
      policiesA:[,[]],
      policies:[,[]],
      policiesKm:[,[]],
      total: [,[]],
    });

    this.maintenamcecostsform =this.fb.group({
      tirealignmentA: ['',[]],
      ordinarymaintenanceA: ['',[]],
      electricsystemA: ['',[]],
      brakingsystemA: ['',[]],
      suspensionA: ['',[]],
      transmissionsystemA: ['',[]],
      enginerepairA: ['',[]],
      tirealignment: ['',[]],
      ordinarymaintenance: ['',[]],
      electricsystem: ['',[]],
      brakingsystem: ['',[]],
      suspension: ['',[]],
      transmissionsystem: ['',[]],
      enginerepair: ['',[]],
      tirealignmentKm: ['',[]],
      ordinarymaintenanceKm: ['',[]],
      electricsystemKm: ['',[]],
      brakingsystemKm: ['',[]],
      suspensionKm: ['',[]],
      transmissionsystemKm: ['',[]],
      enginerepairKm: ['',[]],
      total: ['',[]],
    });

    this.extracostform = this.fb.group({
      dieselCostv: ['',[]],
      dieselKmv: ['',[]],
      dieselCantv: ['',[]],
      dieselCostKm: ['',[]],
      tollCostv: ['',[]],
      tollKmv: ['',[]],
      tollCantv: ['',[]],
      tollCostKm: ['',[]],
      viaticCostv: ['',[]],
      viaticKmv: ['',[]],
      viaticCantv: ['',[]],
      viaticCostKm: ['',[]],
      weightsScaleCostv: ['',[]],
      weightsScaleKmv: ['',[]],
      weightsScaleCantv: ['',[]],
      weightsScaleCostKm: ['',[]],
      loadDownloadCostv: ['',[]],
      loadDownloadKmv: ['',[]],
      loadDownloadCantv: ['',[]],
      loadDownloadCostKm: ['',[]],
      caravanCostv: ['',[]],
      caravanKmv: ['',[]],
      caravanCantv: ['',[]],
      caravanCostKm: ['',[]],
      total: ['',[]],
    });

  }

  ngOnInit(): void {
    this.actionTODO = Action.NEW;
    this.TravelForm();
    this.list();
    this.filteredvehicle = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

    for(let i =0; i<= 100; i += 5){
      if(i !=0 ){
        this.porcentage.push(i);
      }
    }

    this.activatedr.params.subscribe(
      (res: any)=>{
        if(res.id != undefined ){
          this.actionTODO = Action.EDIT
        this.travelSvc.GetIdTravel(res.id).subscribe(
          (travel: Travel)=>{
            this.idtravel = res.id;
            const def = this.vehicles1.filter(v =>v.idvehicle == travel.idvehicle);
            this.control.setValue(def[0].tuition);
            this.DataVehicle(this.vehicles1,def[0].tuition);
            this.guideSvc.GetGuide().subscribe(
              (guide: GuideList[])=>{
                const dato: GuideList[] = [];
                for(let i of travel.guide){
                  const d = guide.filter(res => res.idguide == i);
                  dato.push(d[0]);
                }
                this.guiaList = dato;
                this.Costs();
                this.GuiaList(dato);
                this.GenerateTotal();
                this.travelform.patchValue({
                  datestart: travel.datestart,
                  dateend: travel.datestart,
                  performance: travel.performance,
                  subtotal: travel.subtotal,
                  percentage: travel.percentage,
                  total: travel.total,
                  profitability: travel.profitability,
                  observations: travel.observations
                });
                this.travelform.updateValueAndValidity();
              },
              (err)=> console.log(err)
            );
          }
        );
        }else{
          this.actionTODO = Action.NEW;
        }
      });

    if(localStorage.getItem('travelform') ){
      this.reolad = true;
    }else{
      this.reolad = false;
    }
  }

  private _filter(value: string): string[] {
    this.DataVehicle(this.vehicles1, value);
    const filterValue = this._normalizeValue(value);
    return this.vehicles.filter(street => this._normalizeValue(street).includes(filterValue));
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  private list(): void {
    this.idcompany = this.authSvs.userValue.idcompany;
    this.companySvc.GetIdCompany(this.authSvs.userValue.idcompany).subscribe(
      (company)=>{
        this.loadVehicle = company.default_load_type;
        this.travelform.patchValue({
          company: company.name,
        });
        this.travelform.updateValueAndValidity();
      },
      (err)=> console.log(err)
    );
    this.vehicleSvc.GetVehicle().subscribe(
      (vehicles: VehicleList[]) => {
        this.vehicles1 = vehicles.filter(rs=> rs.vehicle_model != 'TODOREMOLQUES');
        const date = this.vehicles1.map(rs => rs.tuition);
        this.vehicles = date;
      },
      (err)=> console.log(err)
    );
    this.tabulationSvc.GetBill().subscribe(
      (bill:BillList[])=>{
        this.bill = bill;
      },
      (err)=> console.error(err)
    );
  }

  onOpenModalGuiaDeactivate(): void {
    let dialogRef = this.dialog.open(GuideComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '80%',
      width: '90%',
      hasBackdrop: true,
      data: { title: 'Guia', idvehicle: this.travelform.get('idvehicle')?.value },
    });

    dialogRef.afterClosed().subscribe((result: GuideList[]) => {
      if(result){
        this.GuiaList(result);
        this.guiaList = result;
        this.Costs();
        //this.GenerateTotal();
      }
    });
  }

  onOpenModalGuiaActivate(): void {
    let dialogRef = this.dialog.open(GuideeditComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '80%',
      width: '90%',
      hasBackdrop: true,
      data: { title: 'Guia',idtravel: this.idtravel , idvehicle: this.travelform.get('idvehicle')?.value, tution: this.control.value},
    });

    dialogRef.afterClosed().subscribe((result: GuideList[]) => {
      if(result){
        this.GuiaList(result);
        this.guiaList = result;
        this.Costs();
        //this.GenerateTotal();
      }
    });
  }

  onGuide(): void {
    if(this.actionTODO === Action.EDIT) {
      this.onOpenModalGuiaActivate();
    }else{
      this.onOpenModalGuiaDeactivate();
    }
  }

  onOpenModalTrailer(): void {
    let dialogRef = this.dialog.open(TrailerComponent, {
      width: '550px',
      hasBackdrop: false,
      data: { title: 'Remolques' },
    });
    dialogRef.afterClosed().subscribe(
      (result: number) => {
      if(result){
        const def = this.vehicles1.filter(v =>v.idvehicle == result);
        this.control.setValue(def[0].tuition);
        this.DataVehicle(this.vehicles1,def[0].tuition);
      }
      (err: any)=> console.error(err)
    });
  }

  onfeeding(env: any): void{
    const n1 = parseFloat(this.travelform.value.salary);
    const n2 = parseFloat(this.travelform.value.feeding);
    const n3 = parseFloat(this.travelform.value.s) || 0;
    console.log(n1);
    this.travelform.patchValue({
      receivesalary: n1 + n2 + n3,
      totalsalary: n1 + n2,
    });
    this.travelform.updateValueAndValidity();
  }

  onStay(env: any){
    if(this.travelform.value.stay){
      //this.travelform.controls['s'].enable();
    }else{
      //this.travelform.controls['s'].disable();
      //this.travelform.patchValue({
        //receivesalary: this.travelsalary,
      //});
      //this.travelform.updateValueAndValidity();
    }
  }

  ondif(ev: any){
    const num = parseFloat(this.travelform.value.ltgas)|| 0;
    const num1 = parseFloat(this.travelform.value.ltes);
    const num2 = parseFloat(''+this.kms/num + 0).toFixed(2);

    if(this.travelform.value.ltgas){
      let n = 0;
      console.log(n);
      this.travelform.patchValue({
        dif: parseFloat(''+(num1-num)).toFixed(2),
        tank: num2,
      });
      this.travelform.updateValueAndValidity();
    }else{
      this.travelform.patchValue({
        dif: num1,
        tank: '',
      });
      this.travelform.updateValueAndValidity();
    }

  }

  onKms(ev: any){
    if(ev.target.value != '' && ev.target.value != 0){
      const kmsdes = parseFloat(this.travelform.value.kmsdes);
      const kml = parseFloat(this.travelform.value.kml);
      const kms = this.kms + kmsdes;
      const kmM = parseFloat(this.vehiclerelationshipform.value.kmM);

      this.travelform.patchValue({
        ltes: parseFloat('' + ( kms / kml )).toFixed(2),
        dif: parseFloat('' + ( kms / kml )).toFixed(2),
      });
      this.travelform.updateValueAndValidity();

      this.vehiclerelationshipform.patchValue({
        kmOD: parseInt(''+ kms),
        kmV:  parseInt(''+ kms * 2 ),
        TKmM: parseInt('' + (kms * 2) * kmM),
      });
      this.vehiclerelationshipform.updateValueAndValidity();
      this.Costs();
      //this.total();
    }else{
      const kml = parseFloat(this.travelform.value.kml);
      const ltes = parseFloat(''+(this.kms / kml )).toFixed(2);
      this.travelform.patchValue({
        ltes: ltes,
        dif: ltes,
      });
      this.travelform.updateValueAndValidity();
      const kmM = parseFloat(this.vehiclerelationshipform.value.kmM);
      this.vehiclerelationshipform.patchValue({
        kmOD: parseInt(''+ this.kms),
        kmV:  parseInt(''+ this.kms* 2 ),
        TKmM: parseInt(''+ (this.kms * 2) * kmM),
      });
      this.vehiclerelationshipform.updateValueAndValidity();
      this.Costs();
    }
  }

  GenerateTotal() {
    this.totalresult = true;
    const fixedcost = parseFloat(this.fixedcostsform.value.total);
    const maintenamcecost = parseFloat(this.maintenamcecostsform.value.total);
    const extracost = parseFloat(this.extracostform.value.total);
    const total = fixedcost + maintenamcecost + extracost;
    this.totalvalue = (total).toFixed(2);
    const kmOD:number = this.vehiclerelationshipform.value.kmOD;
    const subtotal = kmOD * this.totalvalue;
    const totalr = (subtotal * .20) + subtotal;
    const rentabilidad = totalr - subtotal;
    this.travelform.patchValue({
      subtotal: (subtotal).toFixed(2),
      percentage: 20,
      total: (totalr).toFixed(2),
      profitability: (rentabilidad).toFixed(2)
    });
    this.travelform.updateValueAndValidity();
  }

  private DataVehicle(data: VehicleList[],value: string): void{
    this.totalresult = false;
    const def = data.filter(v => v.tuition.includes(value));
    if (def.length == 1) {
      this.guiaData = true;
      this.vehicleSvc.GetAssignVehiceTrailer(def[0].idvehicle).subscribe(
        (assign:any)=>{
          this.vehicleSvc.GetIdTrailer(assign[0].idtrailer).subscribe(res=>{
            this.catalogueSvc.GetIdVehicleUse(res.idvehicle_use).subscribe(tec=>{
              this.travelform.patchValue({
                idtrailer: res.idtrailer,
                tuition: res.tuition,
                trailer_use: tec.vehicle_use,
              });
              this.travelform.updateValueAndValidity();
            });
          });
        },
        (err)=>console.error(err)
      );
      this.catalogueSvc.GetIdTechnicalData(def[0].idtechnical_data).subscribe(
        technical=>{
          this.tank = parseFloat(''+(technical.tank_capacity*3.785)).toFixed(2);
          this.yield_gallon = technical.yield_gallon;
          this.catalogueSvc.GetIdFuel(technical.idfuel).subscribe(fuel=>{
            this.performance = parseFloat(fuel.performance);
          });
        });
        const id = def[0].idvehicle;
        this.idvahicle = id;
        const date = new Date();
        const datestart = formatDate(date,'yyyy-MM-dd','en');
        this.vehicleSvc.GetIdVehicle(id).subscribe(
          (vehicle)=>{
          this.employeeSvc.GetIdEmployee(vehicle.idemployee).subscribe(
            (employe)=>{
              this.travelsalary = parseFloat(employe.salary);
              this.travelform.patchValue({
                idvehicle: def[0].idvehicle,
                idemployee: def[0].idemployee,
                employee: def[0].employee,
                use: def[0].vehicle_use,
                agination_date: def[0].agination_date,
                vehicle_use: def[0].vehicle_use,
                salary: employe.salary,
                feeding: 10,
                totalsalary: parseFloat(employe.salary) + 10,
                receivesalary: parseFloat(employe.salary) + 10,
                kml: this.yield_gallon,
                s:0,
                datestart: datestart,
                stay: false,
                tank: ''
              });
              this.travelform.updateValueAndValidity();
            });
        });
        this.catalogueSvc.GetGeneralDataVehicle(this.idvahicle).subscribe(
          (res: any)=>{
            this.generaldata = res[0];
          },
          (err)=> console.error(err)
        );
        this.catalogueSvc.GetFixedCostsVehicle(this.idvahicle).subscribe(
          (res: any)=>{
            this.fixedcost = res[0];
          },
          (err)=> console.error(err)
        );
        this.catalogueSvc.GetMaintenamceCostsVehicle(this.idvahicle).subscribe(
          (res: any)=>{
            this.maintenamcecosts = res[0];
          },
          (err)=> console.error(err)
        );
    }else{
      this.guiaData = false;
      this.travelform.reset();
    }
  }

  private GuiaList(guia: GuideList[]): void {
    this.guia = guia.map((r:any)=>'0000'+r.idguide);
    this.start = guia[0].location;
    let n = 0;
    if(guia.length>0){
      n = guia.length - 1;
    }else{
      n= 0;
    }
    this.end = guia[n].destinations;
    this.trayect = this.start + ' - ' + this.end;
    const d = guia.map((r)=>r.client);
    this.client = Array.from(new Set(d));
    this.travelform.patchValue({
      client: guia.map((r)=>r.client),
      guide: this.guia,
      trayect: this.trayect
    });
    const k = guia.map((r:any)=>r.km);
    const h = guia.map((r:any)=>r.hours);
    let c = 0;
    let c1 = 0;
    for (const key in k) {
      c += k[key];
    }
    for (const key in h) {
      c1 += h[key];
    }
    this.kms = c;
    const kml = parseFloat(this.travelform.value.kml);
    const ltess = parseFloat(''+(c/kml)).toFixed(2);
    const performance = parseFloat(''+this.performance* parseFloat(ltess)).toFixed(2);
    this.hours = c1;
    this.travelform.patchValue({
      kms: this.kms,
      hours: this.hours,
      kmsdes: 0,
      ltes: ltess,
      performance: performance,
      company: this.client,
      ltgas: 0,
      dif: ltess,
    });
    this.travelform.updateValueAndValidity();
    this.vehiclerelationshipform.patchValue({
      kmOD: this.kms,
      kmV: this.kms*2,
      kmM: this.generaldata.ntravelkmmonth,
      TKmM: parseInt(''+(this.generaldata.ntravelkmmonth*(this.kms*2))),
    });
    this.vehiclerelationshipform.updateValueAndValidity();
  }

  private Costs(): void {
    const r = this.guiaList.map(res => res.idguide);
    this.tabulationSvc.GetBillTabulation(r).subscribe(
      ( billtabulation: BillTabulation[])=>{
        this.billtabulation = billtabulation;
        const kmv = parseInt(this.vehiclerelationshipform.value.kmV);
        let data = this.utilsSvc.ExtraCostF(this.billtabulation, kmv);
        this.extracostform.setValue(data);
      }
    );
    const TKmM = parseFloat(this.vehiclerelationshipform.value.TKmM);
    const fcosts = this.utilsSvc.FixedCostsF(this.travelsalary,this.generaldata, this.fixedcost,TKmM, this.loadVehicle);
    this.fixedcostsform.setValue(fcosts);
    const mdata = this.utilsSvc.MaintenamceCostsF(this.maintenamcecosts, TKmM);
    this.maintenamcecostsform.setValue(mdata);
  }

  porcentageSelect(ev: any){
    if(ev.target.value != ''){
      const por = parseInt(ev.target.value)/100;
      const fixedcost = parseFloat(this.fixedcostsform.value.total);
      const maintenamcecost = parseFloat(this.maintenamcecostsform.value.total);
      const extracost = parseFloat(this.extracostform.value.total);
      const total = fixedcost + maintenamcecost + extracost;
      this.totalvalue = (total).toFixed(2);
      const kmOD:number = this.vehiclerelationshipform.value.kmOD;
      const subtotal = kmOD * this.totalvalue;
      const totalr = (subtotal * por) + subtotal;
      const rentabilidad = totalr - subtotal;
      this.travelform.patchValue({
        subtotal: (subtotal).toFixed(2),
        total: (totalr).toFixed(2),
        profitability: (rentabilidad).toFixed(2)
      });
      this.travelform.updateValueAndValidity();
    }
  }

  save(): void {
    const data = this.travelform.value;
    const travelform = {
      //idtravel: 0,
      dateend: data.dateend,
      datestart: data.datestart,
      dif: data.dif,
      feeding: data.feeding,
      guide: data.guide,
      hours: data.hours,
      idtrailer: data.idtrailer,
      idvehicle: data.idvehicle,
      kms: data.kms,
      kmsdes: data.kmsdes,
      ltes: data.ltes,
      ltgas: data.ltgas,
      observations: data.observations,
      percentage: data.percentage,
      performance: data.performance,
      profitability: data.profitability,
      salary: data.salary,
      subtotal: data.subtotal,
      tank: data.tank,
      total: data.total
    };

    if(this.actionTODO === Action.NEW ) {
      this.travelSvc.PostTravel(travelform).subscribe(
        (res)=>{
          this.m = res;
          this.toastr.success(this.m.message, 'Creado',{
            timeOut: 3000,
          });
          this.route.navigate(['/displaypanel/route/travels']);
        },
        (err)=>console.error(err)
      );
    }
    if(this.actionTODO === Action.EDIT ) {
      this.travelSvc.PutTravel(travelform,this.idtravel).subscribe(
        (res)=>{
          this.m = res;
          this.toastr.warning(this.m.message, 'Actualizado',{
            timeOut: 3000,
          });
          this.route.navigate(['/displaypanel/route/travels']);
        },
        (err)=>console.error(err)
      );
    }

  }

  savedraft(): void {
    const data = this.travelform.value;
    const travelform = {
      guide: this.guiaList,
      data: data,
    };
    localStorage.setItem('travelform', JSON.stringify(travelform));
    this.reolad = true;
  }

  cacel(): void {
    localStorage.removeItem('travelform');
    this.reolad = false;
    this.travelform.reset();
  }

  reoladdata(): void{
    const travel  = JSON.parse(localStorage.getItem('travelform')|| '{}');
    if(travel){
      this.totalresult = true;
      const data = travel.data;
      this.travelform.setValue(data);
      const def = this.vehicles1.filter(v => v.idvehicle == data.idvehicle );
      this.control.setValue(def[0].tuition);
      this.DataVehicle(this.vehicles1,def[0].tuition);
      this.GuiaList(travel.guide);
      this.guiaList = travel.guide;
      this.Costs();
    }
    this.GenerateTotal();
  }

  newdata(): void {
    localStorage.removeItem('travelform');
    this.reolad = false;
    this.travelform.reset();
    this.reolad = false;
  }

  isvalid(field: string): boolean {
    const form = this.travelform.get(field);
    return (form?.invalid && (form.dirty || form.touched)) || false;
  }

  errorMessage(field: string): string {
    const  errors: any  = this.travelform.get(field)?.errors;
    if (errors) {
      const minlength = errors?.minlength?.requiredLength;
      const messages:any = {
        required: '* Ser Requerido',
        minlength: `* Mínimo ${minlength} Caracteres`,
        mismatch: '* Coincidir'
      };
      const errorKey = Object.keys(errors).find(Boolean);
      return messages[ errorKey || '' ];
    }
    return '';
  }
}

