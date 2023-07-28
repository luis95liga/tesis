import { Component, OnInit, ViewChild } from '@angular/core';
import { Manufacturer } from '@shared/models/vehicle.interface';
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
  selector: 'app-manufacturer',
  templateUrl: './manufacturer.component.html',
  styleUrls: ['./manufacturer.component.scss']
})
export class ManufacturerComponent implements OnInit {
  m: any;
  @ViewChild('scheduledOrdersPaginator') set paginator(pager:MatPaginator) {
    if (pager) this.dataSource.paginator = pager;
  }

  actionTODO = '';
  isedit:string | number = 0;
  message ='';
  manufacturerform: any;
  displayedColumns: string[] = [ 'idmanufacturer', 'name', 'model_types','actions'];
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

  manufacturers: Manufacturer[] = [];
  manufacturer: any = [];

  ngOnInit(): void {
    this.actionTODO = Action.NEW;
    this.list();
    this.manufacturerForm();
  }

  list(): void {
    this.ed = false;
    this.catalogueSvc.GetManufacturer().subscribe(
      manufacturer=>{
        this.dataSource.data = manufacturer;
        this.length = manufacturer.length;
        this.pageSizeOptions = [5, 10, 20, manufacturer.length];
      },
      err => console.error(err)
    );
  }

  manufacturerForm(): void {
    this.manufacturerform = this.fb.group({
      name: [{value: '', disabled: true},[Validators.required, Validators.minLength(4)]],
      model_types: [{value: '', disabled: true},[Validators.required, Validators.minLength(4)]],
    });
  }

  fromdisable(is: boolean): void {
    if(!is){
      this.manufacturerform.controls['name'].disable();
      this.manufacturerform.controls['model_types'].disable();
    }else{
      this.manufacturerform.controls['name'].enable();
      this.manufacturerform.controls['model_types'].enable();
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  save(): void {
    const manufacturer = this.manufacturerform.value;
    if(this.isedit ==0){
      if(this.actionTODO === Action.NEW ) {
        console.log('new', manufacturer);
        this.catalogueSvc.PostManufacturer(manufacturer).subscribe((res) => {
          this.m = res;
          this.toastr.success(this.m.message, 'Creado',{
            timeOut: 3000,
          });
          this.list();
          this.manufacturerform.reset();
          this.isedit = 0;
          this.ed = false;
          this.fromdisable(this.ed);
        });
      }
    }else{
      if(this.actionTODO === Action.EDIT ) {
        console.log('update',manufacturer);
        this.catalogueSvc.PutManufacturer(manufacturer, this.isedit ).subscribe((res) => {
          this.m = res;
          this.toastr.warning(this.m.message, 'Actualizado',{
            timeOut: 3000,
          });
          this.list();
          this.manufacturerform.reset();
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
    this.manufacturerform.reset();
    this.isedit = 0;
    this.ed = true;
    this.fromdisable(this.ed);
  }

  edit(manufacturer: Manufacturer): void {
    this.ed = true;
    this.fromdisable(this.ed);
    this.actionTODO = Action.EDIT;
    this.isedit = manufacturer.idmanufacturer;
    this.manufacturerform.patchValue({
      name: manufacturer.name,
      model_types: manufacturer.model_types,
    });
    this.manufacturerform.updateValueAndValidity();
  }

  cancel(): void {
    this.manufacturerform.reset();
    this.isedit = 0;
    this.actionTODO = Action.NEW;
    this.ed = false;
    this.fromdisable(this.ed);
  }

  delete(id: string| number ): void {
    if (window.confirm('Desea eliminar este Registro')) {
      this.catalogueSvc.DeleteManufacturer(id).subscribe((res) => {
        this.m = res;
          this.toastr.error('Registro Eliminado', 'Eliminado',{
            timeOut: 3000,
          });
          this.list();
        });
    }
  }

  isvalid(field: string): boolean {
    return (this.manufacturerform.get(field).invalid && (this.manufacturerform.get(field).dirty || this.manufacturerform.get(field).touched));
  }


  errorMessage(field: string): string {
    const  { errors }   = this.manufacturerform.get(field);let minlenght = '';
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
