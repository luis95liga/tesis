import { Component, OnInit, ViewChild } from '@angular/core';
import { VehicleUse } from '@shared/models/vehicle.interface';
import { CatalogueService } from '@displaypanel/services/vehicle/catalogue.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';

enum Action {
  EDIT = 'edit',
  NEW = 'new',
}

@Component({
  selector: 'app-vehicle-use',
  templateUrl: './vehicle-use.component.html',
  styleUrls: ['./vehicle-use.component.scss']
})
export class VehicleUseComponent implements OnInit {
  m: any;
  @ViewChild('scheduledOrdersPaginator') set paginator(pager:MatPaginator) {
    if (pager) this.dataSource.paginator = pager;
  }

  actionTODO = '';
  isedit:string | number = 0;
  message ='';
  vehicleuseform: any;
  displayedColumns: string[] = ['idvehicle_use', 'vehicle_use', 'category', 'apply_in','actions'];
  dataSource = new MatTableDataSource();
  length = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [];
  ed = false;

  constructor(
    private catalogurSvc: CatalogueService,
    private fb: FormBuilder,
    private toastr: ToastrService,
  ) { }

  vehicleuses: VehicleUse[] = [];
  vehicleuse: any = [];

  ngOnInit(): void {
    this.actionTODO = Action.NEW;
    this.list();
    this.vehicleUseForm();
  }

  list(): void {
    this.ed = false;
    this.catalogurSvc.GetVehicleUse().subscribe(
      vehicleuses=>{
        this.dataSource.data = vehicleuses;
        this.length = vehicleuses.length;
        this.pageSizeOptions = [5, 10, 20, vehicleuses.length];
      },
      err => console.error(err)
    );
  }

  vehicleUseForm(): void {
    this.vehicleuseform = this.fb.group({
      vehicle_use:[{value: '', disabled: true},[Validators.required, Validators.minLength(4)]],
      category:[{value: '', disabled: true},[Validators.required, Validators.minLength(4)]],
      apply_in:[{value: '', disabled: true},[Validators.required, Validators.minLength(4)]],
    });
  }

  fromdisable(is: boolean): void {
    if(!is){
      this.vehicleuseform.controls['vehicle_use'].disable();
      this.vehicleuseform.controls['category'].disable();
      this.vehicleuseform.controls['apply_in'].disable();
    }else{
      this.vehicleuseform.controls['vehicle_use'].enable();
      this.vehicleuseform.controls['category'].enable();
      this.vehicleuseform.controls['apply_in'].enable();
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  save(): void {
    const vehicleuse = this.vehicleuseform.value;
    if(this.isedit ==0){
      if(this.actionTODO === Action.NEW ) {
        console.log('new', vehicleuse);
        this.catalogurSvc.PostVehicleUse(vehicleuse).subscribe((res) => {
          this.m = res;
          this.toastr.success(this.m.message, 'Creado',{
            timeOut: 3000,
          });
          this.list();
          this.vehicleuseform.reset();
          this.isedit = 0;
          this.ed = false;
          this.fromdisable(this.ed);
        });
      }
    }else{
      if(this.actionTODO === Action.EDIT ) {
        console.log('update',vehicleuse);
        this.catalogurSvc.PutVehicleUse(vehicleuse, this.isedit ).subscribe((res) => {
          this.m = res;
          this.toastr.warning(this.m.message, 'Actualizado',{
            timeOut: 3000,
          });
          this.list();
          this.vehicleuseform.reset();
          this.isedit = 0;
          this.actionTODO = Action.NEW;
          this.ed = false;
          this.fromdisable(this.ed);
        });
      }
    }
  }

  New(): void {
    this.vehicleuseform.reset();
    this.isedit = 0;
    this.ed = true;
    this.fromdisable(this.ed);
  }

  edit(vehicleuse: VehicleUse): void {
    this.ed = true;
    this.fromdisable(this.ed);
    this.actionTODO = Action.EDIT;
    this.isedit = vehicleuse.idvehicle_use;
    this.vehicleuseform.patchValue({
      vehicle_use: vehicleuse.vehicle_use,
      category: vehicleuse.category,
      apply_in: vehicleuse.apply_in,
    });
    this.vehicleuseform.updateValueAndValidity();
  }

  cancel(): void {
    this.vehicleuseform.reset();
    this.isedit = 0;
    this.actionTODO = Action.NEW;
    this.ed = false;
    this.fromdisable(this.ed);
  }

  delete(id: string| number ): void {
    if (window.confirm('Desea eliminar este Este Registro')) {
      this.catalogurSvc.DeleteVehicleUse(id).subscribe((res) => {
        this.toastr.error('Registro Eliminado', 'Eliminado',{
          timeOut: 3000,
        });
        this.list();
      });
    }
  }

  isvalid(field: string): boolean {
    return (this.vehicleuseform.get(field).invalid && (this.vehicleuseform.get(field).dirty || this.vehicleuseform.get(field).touched));
  }


  errorMessage(field: string): string {
    const  { errors }   = this.vehicleuseform.get(field);
    let minlength = errors?.minlength?.requiredLength;
    if (errors) {
      const messages:any = {
        required: 'el campo es requerido',
        minlength: `el valor ingesado es menor a ${ minlength } carateres`,
     };
      const errorkey = Object.keys(errors).find(Boolean);
      return messages[errorkey|| ''];
    }
    return '';
  }
}
