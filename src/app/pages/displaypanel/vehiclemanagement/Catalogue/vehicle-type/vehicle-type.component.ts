import { Component, OnInit, ViewChild } from '@angular/core';
import { VehicleType } from '@shared/models/vehicle.interface';
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
  selector: 'app-vehicle-type',
  templateUrl: './vehicle-type.component.html',
  styleUrls: ['./vehicle-type.component.scss']
})
export class VehicleTypeComponent implements OnInit {
  m: any;
  @ViewChild('scheduledOrdersPaginator') set paginator(pager:MatPaginator) {
    if (pager) this.dataSource.paginator = pager;
  }

  actionTODO = '';
  isedit:string | number = 0;
  message ='';
  vehicletypeform: any;
  displayedColumns: string[] = [ 'idvehicle_type', 'name', 'depends_other_vehicle','actions'];
  dataSource = new MatTableDataSource();
  length = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [];
  ed = false;

  constructor(
    private catalogueSvc: CatalogueService,
    private fb: FormBuilder,
    private toastr: ToastrService,
  ) { }

  vehicletypes: VehicleType[] = [];
  vehicletype: any = [];

  ngOnInit(): void {
    this.actionTODO = Action.NEW;
    this.list();
    this.vehicletypeForm();
  }

  list(): void {
    this.ed = false;
    this.catalogueSvc.GetVehicleType().subscribe(
      vehicletype=>{
        this.dataSource.data = vehicletype;
        this.length = vehicletype.length;
        this.pageSizeOptions = [5, 10, 20, vehicletype.length];
      },
      err => console.error(err)
    );
  }

  vehicletypeForm(): void {
    this.vehicletypeform = this.fb.group({
      name: [{value: '', disabled: true},[Validators.required, Validators.minLength(4)]],
      depends_other_vehicle: [{value: false, disabled: true},[]],
    });
  }

  fromdisable(is: boolean): void {
    if(!is){
      this.vehicletypeform.controls['name'].disable();
      this.vehicletypeform.controls['depends_other_vehicle'].disable();
    }else{
      this.vehicletypeform.controls['name'].enable();
      this.vehicletypeform.controls['depends_other_vehicle'].enable();
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  save(): void {
    const vehicletype = this.vehicletypeform.value;
    if(this.isedit ==0){
      if(this.actionTODO === Action.NEW ) {
        this.catalogueSvc.PostVehicleType(vehicletype).subscribe((res) => {
          this.m = res;
          this.toastr.success(this.m.message, 'Creado',{
            timeOut: 3000,
          });
          this.list();
          this.vehicletypeform.reset();
          this.isedit = 0;
          this.ed = false;
          this.fromdisable(this.ed);
        });
      }
    }else{
      if(this.actionTODO === Action.EDIT ) {
        this.catalogueSvc.PutVehicleType(vehicletype, this.isedit ).subscribe((res) => {
          this.m = res;
          this.toastr.warning(this.m.message, 'Actualizado',{
            timeOut: 3000,
          });
          this.list();
          this.vehicletypeform.reset();
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
    this.vehicletypeform.reset();
    this.isedit = 0;
    this.ed = true;
    this.fromdisable(this.ed);
    this.vehicletypeform.patchValue({
      depends_other_vehicle: false,
    });
    this.vehicletypeform.updateValueAndValidity();
  }

  edit(vehicletype: VehicleType): void {
    this.ed = true;
    this.fromdisable(this.ed);
    this.actionTODO = Action.EDIT;
    this.isedit = vehicletype.idvehicle_type;
    this.vehicletypeform.patchValue({
      name: vehicletype.name,
      depends_other_vehicle: vehicletype.depends_other_vehicle,
    });
    this.vehicletypeform.updateValueAndValidity();
  }

  cancel(): void {
    this.vehicletypeform.reset();
    this.isedit = 0;
    this.actionTODO = Action.NEW;
    this.ed = false;
    this.fromdisable(this.ed);
  }

  delete(id: string| number ): void {
    if (window.confirm('Desea eliminar este Registro')) {
      this.catalogueSvc.DeleteVehicleType(id).subscribe((res) => {
        this.toastr.error('Registro Eliminado', 'Eliminado',{
          timeOut: 3000,
        });
        this.list();
      });
    }
  }

  isvalid(field: string): boolean {
    return (this.vehicletypeform.get(field).invalid && (this.vehicletypeform.get(field).dirty || this.vehicletypeform.get(field).touched));
  }


  errorMessage(field: string): string {
    const  { errors }   = this.vehicletypeform.get(field);
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
