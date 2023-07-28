import { Component, OnInit, ViewChild } from '@angular/core';
import { VehicleModels, VehicleModel, Manufacturer,VehicleType,Fuel, Axis } from '@shared/models/vehicle.interface';
import { CatalogueService } from '@displaypanel/services/vehicle/catalogue.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';


enum Action {
  EDIT = 'EDIT',
  NEW = 'NEW',
}

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.scss']
})
export class ModelComponent implements OnInit {
  @ViewChild('scheduledOrdersPaginator') set paginator(pager:MatPaginator) {
    if (pager) this.dataSource.paginator = pager;
  }

  actionTODO = Action.NEW;
  isedit:string | number = 0;
  message ='';
  vehiclemodelform: any;
  displayedColumns: string[] = [ 'idvehicle_model', 'manufacturer', 'model','year','vehicle_type','kind','fuel','axis','actions'];
  dataSource = new MatTableDataSource();
  length = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [];
  ed = false;

  constructor(
    private catalogueSvc: CatalogueService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) { }

  vehiclemodels: VehicleModels[] = [];
  vehiclemodel: any = [];
  m: any = [];
  manufacturer: Manufacturer[] = [];
  vehicletype: VehicleType[] = [];
  fuel: Fuel[] = [];
  axis:Axis[] = [];

  ngOnInit(): void {
    this.actionTODO = Action.NEW;
    this.list();
    this.vehicleModelForm();
  }

  list(): void {
    this.ed = false;
    this.catalogueSvc.GetManufacturer().subscribe(
      manufacturer =>{
        this.manufacturer = manufacturer;
      },
      err => console.error(err)
    );
    this.catalogueSvc.GetVehicleType().subscribe(
      vehicletype =>{
        this.vehicletype = vehicletype;
      },
      err => console.error(err)
    );
    this.catalogueSvc.GetFuel().subscribe(
      fuel =>{
        this.fuel = fuel;
      },
      err => console.error(err)
    );
    this.catalogueSvc.GetAxis().subscribe(
      axis =>{
        this.axis = axis;
      },
      err => console.error(err)
    );
    this.catalogueSvc.GetVehicleModel().subscribe(
      vehiclemodel=>{
        this.dataSource.data = vehiclemodel;
        this.length = vehiclemodel.length;
        this.pageSizeOptions = [5, 10, 20, vehiclemodel.length];
      },
      err => console.error(err)
    );
  }

  vehicleModelForm(): void {
    this.vehiclemodelform = this.fb.group({
      model: [{value: '', disabled: true},[Validators.required, Validators.minLength(4)]],
      year: [{value: '', disabled: true},[Validators.required]],
      kind: [{value: '', disabled: true},[Validators.required, Validators.minLength(4)]],
      idmanufacturer: [{value: '', disabled: true},[Validators.required]],
      idvehicle_type: [{value: '', disabled: true},[Validators.required]],
      idfuel: [{value: '', disabled: true},[Validators.required]],
      idaxis: [{value: '', disabled: true},[Validators.required]],
    });
  }

  fromdisable(is: boolean): void {
    if(!is){
      this.vehiclemodelform.controls['model'].disable();
      this.vehiclemodelform.controls['year'].disable();
      this.vehiclemodelform.controls['kind'].disable();
      this.vehiclemodelform.controls['idmanufacturer'].disable();
      this.vehiclemodelform.controls['idvehicle_type'].disable();
      this.vehiclemodelform.controls['idfuel'].disable();
      this.vehiclemodelform.controls['idaxis'].disable();
    }else{
      this.vehiclemodelform.controls['model'].enable();
      this.vehiclemodelform.controls['year'].enable();
      this.vehiclemodelform.controls['kind'].enable();
      this.vehiclemodelform.controls['idmanufacturer'].enable();
      this.vehiclemodelform.controls['idvehicle_type'].enable();
      this.vehiclemodelform.controls['idfuel'].enable();
      this.vehiclemodelform.controls['idaxis'].enable();
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  save(): void {
    const vehiclemodel = this.vehiclemodelform.value;
    if(this.isedit ==0){
      if(this.actionTODO === Action.NEW ) {
        console.log('new', vehiclemodel);
        this.catalogueSvc.PostVehicleModel(vehiclemodel).subscribe(res => {
          this.m = res;
          this.m.message
          this.toastr.success(this.m.message, 'Creado',{
            timeOut: 3000,
          });
          this.list();
          this.vehiclemodelform.reset();
          this.isedit = 0;
          this.ed = false;
          this.fromdisable(this.ed);
        });
      }
    }else{
      if(this.actionTODO === Action.EDIT ) {
        console.log('update',vehiclemodel);
        this.catalogueSvc.PutVehicleModel(vehiclemodel, this.isedit ).subscribe(res => {
          this.m = res;
          this.toastr.warning(this.m.message, 'actulizado',{
            timeOut: 3000,
          });
          this.list();
          this.vehiclemodelform.reset();
          this.isedit = 0;
          this.actionTODO = Action.NEW;
          this.ed = false;
          this.fromdisable(this.ed);
        });
      }
    }
  }

  New(): void {
    this.actionTODO = Action.NEW;
    this.vehiclemodelform.reset();
    this.isedit = 0;
    this.ed = true;
    this.fromdisable(this.ed);
  }

  edit(vehiclemodel: VehicleModel): void {
    this.ed = true;
    this.fromdisable(this.ed);
    this.actionTODO = Action.EDIT;
    this.catalogueSvc.GetIdVehicleModel(vehiclemodel.idvehicle_model).subscribe(
      vehiclem =>{
        this.vehiclemodelform.patchValue({
          model: vehiclem.model,
          year: vehiclem.year,
          kind: vehiclem.kind,
          idmanufacturer: vehiclem.idmanufacturer,
          idvehicle_type: vehiclem.idvehicle_type,
          idfuel: vehiclem.idfuel,
          idaxis: vehiclem.idaxis,
        });
      },
      err => console.error(err)
    );
    this.isedit = vehiclemodel.idvehicle_model;
    this.vehiclemodelform.updateValueAndValidity();
  }


  cancel(): void {
    this.vehiclemodelform.reset();
    this.isedit = 0;
    this.actionTODO = Action.NEW;
    this.ed = false;
    this.fromdisable(this.ed);
  }

  delete(id: string| number ): void {
    if (window.confirm('Desea eliminar este Registro')) {
      this.catalogueSvc.DeleteVehicleModel(id).subscribe((res) => {
          this.toastr.error('Registro Eliminado', 'Eliminado',{
            timeOut: 3000,
          });
          this.list();
        });
    }
  }

  isvalid(field: string): boolean {
    return (this.vehiclemodelform.get(field).invalid && (this.vehiclemodelform.get(field).dirty || this.vehiclemodelform.get(field).touched));
  }


  errorMessage(field: string): string {
    const  { errors }   = this.vehiclemodelform.get(field);

    if (errors) {
      const messages:any = {
        required: 'el campo es requerido',
        minlength: `el valor ingesado es menor a 4 carateres`,
      };
    const errorkey = Object.keys(errors).find(Boolean);
    return messages[errorkey|| ''];
    }
    return '';
  }
}
