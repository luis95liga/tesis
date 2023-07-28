import { Component, OnInit, ViewChild } from '@angular/core';
import { Country, ProvinceList } from '@shared/models/company.interface';
import { PlaceService } from '@displaypanel/services/business/place.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';

enum Action {
  EDIT = 'edit',
  NEW = 'new',
}

@Component({
  selector: 'app-province',
  templateUrl: './province.component.html',
  styleUrls: ['./province.component.scss']
})
export class ProvinceComponent implements OnInit {

  @ViewChild('scheduledOrdersPaginator') set paginator(pager:MatPaginator) {
    if (pager) this.dataSource.paginator = pager;
  }

  actionTODO = '';
  isedit:string | number = 0;
  message ='';
  provinceform: any;
  displayedColumns: string[] = [ 'idprovince', 'name', 'country', 'actions'];
  dataSource = new MatTableDataSource();
  length = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [];
  numRegex = /^-?\d*[.,]?\d{0,2}$/;
  m: any = [];
  ed = false;
  cl = false;

  constructor(
    private placeSvc: PlaceService,
    private fb: FormBuilder,
    private toastr: ToastrService,
  ) { }

  provinces: ProvinceList[] = [];
  country: Country[] = [];


  ngOnInit(): void {
    this.cl = true;
    this.actionTODO = Action.NEW;
    this.list();
    this.provinceForm();
  }

  list(): void {
    this.placeSvc.GetProvince().subscribe(
      province=>{
        this.dataSource.data = province;
        this.length = province.length;
        this.pageSizeOptions = [5, 10, 20, province.length];
      },
      err => console.error(err)
    );
    this.placeSvc.GetCountry().subscribe(
      country=>{
        this.country = country;
      },
      err => console.error(err)
    );
  }

  provinceForm(): void {
    this.provinceform = this.fb.group({
      name: [{value: '', disabled: true},[Validators.required, Validators.minLength(4)]],
      idcountry: [{value: '', disabled: true},[Validators.required]],
    });
  }

  fromdisable(is: boolean): void {
    if(!is){
      this.provinceform.controls['name'].disable();
      this.provinceform.controls['idcountry'].disable();
    }else{
      this.provinceform.controls['name'].enable();
      this.provinceform.controls['idcountry'].enable();
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  save(): void {
    const province = this.provinceform.value;
    if(this.isedit ==0){
      if(this.actionTODO === Action.NEW ) {
        this.placeSvc.PostProvince(province).subscribe((res: any) => {
          this.m = res;
          this.toastr.success(this.m.message, 'Creado',{
            timeOut: 3000,
          });
          this.list();
          this.provinceform.reset();
          this.isedit = 0;
          this.cl = false;
          this.ed = false;
          this.fromdisable(this.ed);
        });
      }
    }else{
      if(this.actionTODO === Action.EDIT ) {
        this.placeSvc.PutProvince(province, this.isedit ).subscribe((res: any) => {
          this.m = res;
          this.toastr.warning(this.m.message, 'actulizado',{
            timeOut: 3000,
          });
          this.list();
          this.provinceform.reset();
          this.isedit = 0;
          this.actionTODO = Action.NEW;
          this.cl = false;
          this.ed = false;
          this.fromdisable(this.ed);
        });
      }
    }
  }

  new(): void {
    this.actionTODO = Action.NEW;
    this.provinceform.reset();
    this.isedit = 0;
    this.ed = true;
    this.fromdisable(this.ed);
    this.cl = true;
  }

  edit(idprovince: string): void {
    this.ed = true;
    this.fromdisable(this.ed);
    this.cl = true;
    this.actionTODO = Action.EDIT;
    this.isedit = idprovince;
    if(this.isedit){
      this.placeSvc.GetIdProvince(idprovince).subscribe((res: any)=>{
        this.provinceform.patchValue({
          name: res.name,
          idcountry: res.idcountry,
        });
        this.provinceform.updateValueAndValidity();
      });
    }
  }

  cancel(): void {
    this.ed = false;
    this.fromdisable(this.ed);
    this.cl = false;
    this.provinceform.reset();
    this.isedit = 0;
    this.actionTODO = Action.NEW;
  }

  delete(id: string| number ): void {
    if (window.confirm('Desea eliminar este Registro')) {
      this.placeSvc.DeleteProvince(id).subscribe((res: any) => {
        this.toastr.error('Registro Eliminado', 'Eliminado',{
          timeOut: 3000,
        });
          this.list();
        });
    }
  }

  isvalid(field: string): boolean {
    return (this.provinceform.get(field).invalid && (this.provinceform.get(field).dirty || this.provinceform.get(field).touched));
  }


  errorMessage(field: string): string {
    const  { errors }   = this.provinceform.get(field);
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
}
