import { Component, OnInit,  Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { VehicleModels,VehicleUse,Fuel, OwnerList } from '@shared/models/vehicle.interface';
import { Employee } from '@shared/models/employee.interface';
import { VehicleService } from '@displaypanel/services/vehicle/vehicle.service';
import { CatalogueService } from '@displaypanel/services/vehicle/catalogue.service';
import { EmployeesService } from '@displaypanel/services/business/employees.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { environment } from '@env/environment';
import { UtilsService } from '@app/shared/service/utils.service';

enum Action {
  EDIT = 'edit',
  NEW = 'new',
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  actionTODO = Action.NEW;
  hide = true;
  mensaje =''
  vehicleform: any;
  owners: OwnerList[] = [];
  vehiclemodels: VehicleModels[] = [];
  vehicleuse: VehicleUse[] = [];
  fuel: Fuel[] = [];
  employee: Employee[] = [];
  Idcompany=0;
  message: any;
  m: any;
  idVehicle: any;
  text: any;
  Idtechnicaldata = 0;
  tuition: any[] = [];
  form: any;
  img = './../../../../../../assets/noimage.png';
  errtuition: boolean = false;
  errmessage: string = '';
  years: any[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private vehicleSvc: VehicleService,
    private employeeSvc: EmployeesService,
    private catalogueSvc: CatalogueService,
    private utilsSvc: UtilsService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<FormComponent>
  ) { }

  ngOnInit(): void {
    this.years = this.utilsSvc.year();
    const user = JSON.parse(localStorage.getItem('user')|| '{}');
    this.Idcompany = user.Idcompany;
    this.vehicleForm();
    this.list();
    const c = this.data.vehicles;
    let c1 = [];
    for (const key in this.data.vehicles) {
      c1.push(c[key].tuition);
    }
    this.tuition = c1;
    if (this.data.vehicle.idvehicle) {
      this.idVehicle = this.data.vehicle.idvehicle;
      this.Idtechnicaldata = this.data.vehicle.idtechnical_data;
      this.actionTODO = Action.EDIT;
      this.text = 'Editar';
      this.vehicleSvc.GetIdVehicle(this.idVehicle).subscribe(vehicle=>{
        if(vehicle.image){
          this.img = environment.API_URL+vehicle.image;
        }
        else{
          this.img='./../../../../../../assets/noimage.png';
        }
        this.vehicleform.patchValue({
          agination_date: vehicle.agination_date,
          tuition: vehicle.tuition,
          engine_series: vehicle.engine_series,
          state: vehicle.state,
          idowner: vehicle.idemployee,
          idvehicle_model: vehicle.idvehicle_model,
          idemployee: vehicle.idemployee,
          idvehicle_use: vehicle.idvehicle_use,
        });
        this.vehicleform.updateValueAndValidity();
        this.catalogueSvc.GetIdTechnicalData(vehicle.idtechnical_data).subscribe(technicaldata=>{
          this.vehicleform.patchValue({
            load_capacity: technicaldata.load_capacity,
            color: technicaldata.color,
            mileage: technicaldata.mileage,
            year: technicaldata.year,
            tank_capacity: technicaldata.tank_capacity,
            yield_gallon: technicaldata.yield_gallon,
            idgps: technicaldata.idgps,
            idfuel: technicaldata.idfuel,
            observation: technicaldata.observation,
            hours_use: technicaldata.hours_use,
          });
          this.vehicleform.updateValueAndValidity();
        });
      });
    }else{
      this.actionTODO = Action.NEW;
      this.text = 'Nuevo';
    }
  }

  list(): void {
    this.catalogueSvc.GetOwer().subscribe(
      owner=>{
        this.owners = owner;
      },
      err => console.error(err)
    );
    this.catalogueSvc.GetVehicleModel().subscribe(
      vehiclemodels=>{
        this.vehiclemodels = vehiclemodels.filter(r=>r.model !='TODOREMOLQUES');
      },
      err => console.error(err)
    );
    this.catalogueSvc.GetVehicleUse().subscribe(
      vehicleuse=>{
        this.vehicleuse = vehicleuse;
      },
      err => console.error(err)
    );
    this.catalogueSvc.GetFuel().subscribe(
      fuel=>{
        this.fuel = fuel;
      },
      err => console.error(err)
    );

    this.employeeSvc.GetPositionEmployee(this.Idcompany).subscribe(
      employee=>{
        this.employee = employee;
        const v = this.data.vehicles;
        for(let i = 0; v.length > i; i++){
          this.employee = this.employee.filter((r)=>r.idemployee !=  v[i].idemployee);
        }
    });
  }

  vehicleForm(): void {
    this.vehicleform = this.fb.group({
      agination_date: ['',[Validators.required, Validators.minLength(8)]],
      image: [],
      tuition: ['',[Validators.required, Validators.minLength(7)]],
      engine_series: ['',[Validators.required, Validators.minLength(8)]],
      state: [true],
      idowner: [,[Validators.required]],
      idvehicle_model: [,[Validators.required]],
      idemployee: [,[Validators.required]],
      idvehicle_use: [,[Validators.required]],
      load_capacity: [,[Validators.required]],
      color: ['',[Validators.required, Validators.minLength(4)]],
      mileage: [,[Validators.required]],
      year: [,[Validators.required]],
      tank_capacity: [,[Validators.required]],
      yield_gallon: [,[Validators.required]],
      idgps: [,[Validators.required]],
      idfuel: [,[Validators.required]],
      observation: ['',[Validators.required, Validators.minLength(4)]],
      hours_use: ['',[Validators.required, Validators.minLength(4)]],
    });

    this.form = this.fb.group({
      profile: ['']
    });

  }

  onChange(event:any){
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('profile').setValue(file);
    }
  }

  agination(id: any): boolean {
    const employee = this.data.vehicles.map((res:any)=>{ return res.idemployee});
    const emp = employee.filter((r: any)=>{ return r === id});
    if(emp.length > 0){
      return true;
    }else{
      return false;
    }
    return false;
  }

  save(): void {
    if(this.form.get('profile').value){
      if(this.actionTODO === Action.NEW ) {
        const formData = new FormData();
        formData.append('agination_date', this.vehicleform.value.agination_date);
        formData.append('image', this.form.get('profile').value);
        formData.append('tuition', this.vehicleform.value.tuition);
        formData.append('engine_series', this.vehicleform.value.engine_series);
        formData.append('state', this.vehicleform.value.state);
        formData.append('idowner', this.vehicleform.value.idowner)
        formData.append('idvehicle_model', this.vehicleform.value.idvehicle_model);
        formData.append('idemployee', this.vehicleform.value.idemployee);
        formData.append('idvehicle_use', this.vehicleform.value.idvehicle_use);
        formData.append('load_capacity', this.vehicleform.value.load_capacity);
        formData.append('color', this.vehicleform.value.color);
        formData.append('mileage', this.vehicleform.value.mileage);
        formData.append('year', this.vehicleform.value.year);
        formData.append('tank_capacity', this.vehicleform.value.tank_capacity);
        formData.append('yield_gallon', this.vehicleform.value.yield_gallon);
        formData.append('idgps', this.vehicleform.value.idgps);
        formData.append('idfuel', this.vehicleform.value.idfuel);
        formData.append('observation', this.vehicleform.value.observation);
        formData.append('hours_use', this.vehicleform.value.hours_use);
        this.vehicleSvc.PostCreateVehicle(formData).subscribe((res: any) => {
          this.m = res;
          this.toastr.success(this.m.message, 'Creado',{
            timeOut: 3000,
          });
          this.dialogRef.close(true);
        });
      }
      if( this.actionTODO === Action.EDIT){
        const formData = new FormData();
        formData.append('agination_date', this.vehicleform.value.agination_date);
        formData.append('image', this.form.get('profile').value);
        formData.append('tuition', this.vehicleform.value.tuition);
        formData.append('engine_series', this.vehicleform.value.engine_series);
        formData.append('state', this.vehicleform.value.state);
        formData.append('idowner', this.vehicleform.value.idowner);
        formData.append('idvehicle_model', this.vehicleform.value.idvehicle_model);
        formData.append('idemployee', this.vehicleform.value.idemployee);
        formData.append('idvehicle_use', this.vehicleform.value.idvehicle_use);
        formData.append('idtechnical_data', ''+this.Idtechnicaldata);
        const data = {
          load_capacity: this.vehicleform.value.load_capacity,
          color: this.vehicleform.value.color,
          mileage: this.vehicleform.value.mileage,
          idadministrative_data: this.vehicleform.value.idadministrative_data,
          tank_capacity: this.vehicleform.value.tank_capacity,
          yield_gallon: this.vehicleform.value.yield_gallon,
          idgps: this.vehicleform.value.idgps,
          idfuel: this.vehicleform.value.idfuel,
          observation: this.vehicleform.value.observation,
          hours_use: this.vehicleform.value.hours_use
        }
        this.catalogueSvc.PutTechnicalData(data, this.Idtechnicaldata).subscribe((res: any) => {
          this.m = res;
          this.toastr.warning(this.m.message, 'Actulizado',{
            timeOut: 3000,
          });
          this.dialogRef.close(true);
        });

        this.vehicleSvc.PutVehicle(formData, this.idVehicle).subscribe((res: any) => {
          this.m = res;
          this.toastr.warning(this.m.message, 'Actulizado',{
            timeOut: 3000,
          });
          this.dialogRef.close(true);
        });
      }
    }else{
      if( this.actionTODO === Action.NEW){
        const data = this.vehicleform.value;
        this.vehicleSvc.PostCreateVehicle(data).subscribe((res: any) => {
          this.m = res;
          this.toastr.success(this.m.message, 'Creado',{
            timeOut: 3000,
          });
          this.dialogRef.close(true);
        });
      }

      if( this.actionTODO === Action.EDIT){
        const data1 = {
          agination_date: this.vehicleform.value.agination_date,
          image: null,
          tuition: this.vehicleform.value.tuition,
          engine_series: this.vehicleform.value.engine_series,
          state: this.vehicleform.value.state,
          idowner: this.vehicleform.value.idowner,
          idvehicle_model: this.vehicleform.value.idvehicle_model,
          idemployee: this.vehicleform.value.idemployee,
          idvehicle_use: this.vehicleform.value.idvehicle_use,
          idtechnical_data: this.Idtechnicaldata
        }
        const data2 = {
          load_capacity: this.vehicleform.value.load_capacity,
          color: this.vehicleform.value.color,
          mileage: this.vehicleform.value.mileage,
          year: this.vehicleform.value.year,
          tank_capacity: this.vehicleform.value.tank_capacity,
          yield_gallon: this.vehicleform.value.yield_gallon,
          idgps: this.vehicleform.value.idgps,
          idfuel: this.vehicleform.value.idfuel,
          observation: this.vehicleform.value.observation,
          hours_use: this.vehicleform.value.hours_use
        }
        this.catalogueSvc.PutTechnicalData(data2, this.Idtechnicaldata).subscribe((res: any) => {
          this.m = res;
            this.toastr.warning(this.m.message, 'Actulizado',{
              timeOut: 3000,
            });
        });
        this.vehicleSvc.PutVehicle(data1, this.idVehicle).subscribe((res: any) => {
          this.m = res;
            this.toastr.warning(this.m.message, 'Actulizado',{
              timeOut: 3000,
            });
            this.dialogRef.close(true);
        });
      }
    }
  }

  isvalid(field: string): boolean {
    return (this.vehicleform.get(field).invalid && (this.vehicleform.get(field).dirty || this.vehicleform.get(field).touched));
  }


  errorMessage(field: string): string {
    const  { errors }   = this.vehicleform.get(field);
    let minlenght = errors?.minlength?.requiredLength;
    if (errors) {
      const messages:any = {
        required: 'el campo es requerido',
        minlength: `el valor ingresado es menor a ${ minlenght } carateres`,
      };
      const errorkey = Object.keys(errors).find(Boolean);
      return messages[errorkey|| ''];
    }
    return '';
  }

  IsTuitionValidate(ev: any){
    if(ev.target.value.length >= 7 && ev.target.value !='' ) {
      const filter = this.tuition.filter(r=>{ return r.includes(ev.target.value)});
      if(filter.length > 0) {
        this.data.vehicle.tuition;
        if(this.actionTODO === Action.EDIT && this.data.vehicle.tuition === filter[0]){
          this.errtuition = false;
          this.errmessage = '';
        }else{
          this.errtuition = true;
          this.errmessage = 'Matrícula ya Existe';
        }
      }else{
        this.errtuition = false;
        this.errmessage = '';
      }
    }
  }

}
