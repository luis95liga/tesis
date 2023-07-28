import { Component, OnInit, ViewChild } from '@angular/core';
import { Country } from '@shared/models/company.interface';
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
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {
  @ViewChild('scheduledOrdersPaginator') set paginator(pager:MatPaginator) {
    if (pager) this.dataSource.paginator = pager;
  }

  actionTODO = '';
  isedit:string | number = 0;
  message ='';
  countryform: any;
  displayedColumns: string[] = [ 'idcountry', 'initials', 'name', 'actions'];
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

  countrys: Country[] = [];
  country: any = [];

  ngOnInit(): void {
    this.cl = false;
    this.actionTODO = Action.NEW;
    this.list();
    this.countryForm();
  }

  list(): void {
    this.placeSvc.GetCountry().subscribe(
      country=>{
        this.dataSource.data = country;
        this.length = country.length;
        this.pageSizeOptions = [5, 10, 20, country.length];
      },
      err => console.error(err)
    );
  }

  countryForm(): void {
    this.countryform = this.fb.group({
      initials: [{value: '', disabled: true},[Validators.required, Validators.minLength(2)]],
      name: [{value: '', disabled: true},[Validators.required, Validators.minLength(5)]],
    });
  }

  fromdisable(is: boolean): void {
    if(!is){
      this.countryform.controls['initials'].disable();
      this.countryform.controls['name'].disable();
    }else{
      this.countryform.controls['initials'].enable();
      this.countryform.controls['name'].enable();
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  save(): void {
    const country = this.countryform.value;
    if(this.isedit ==0){
      if(this.actionTODO === Action.NEW ) {
        this.placeSvc.PostCountry(country).subscribe((res: any) => {
          this.m = res;
          this.toastr.success(this.m.message, 'Creado',{
            timeOut: 3000,
          });
          this.list();
          this.countryform.reset();
          this.isedit = 0;
          this.cl = false;
          this.ed = false;
          this.fromdisable(this.ed);
        });
      }
    }else{
      if(this.actionTODO === Action.EDIT ) {
        this.placeSvc.PutCountry(country, this.isedit ).subscribe((res: any) => {
          this.m = res;
          this.toastr.warning(this.m.message, 'actulizado',{
            timeOut: 3000,
          });
          this.list();
          this.countryform.reset();
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
    this.countryform.reset();
    this.isedit = 0;
    this.ed = true;
    this.fromdisable(this.ed);
    this.cl = true;
  }

  edit(country: Country): void {
    this.ed = true;
    this.fromdisable(this.ed);
    this.actionTODO = Action.EDIT;
    this.isedit = country.idcountry;
    this.countryform.patchValue({
      initials: country.initials,
      name: country.name,
    });
    this.countryform.updateValueAndValidity();
  }

  cancel(): void {
    this.ed = false;
    this.fromdisable(this.ed);
    this.cl = false;
    this.countryform.reset();
    this.isedit = 0;
    this.actionTODO = Action.NEW;
  }

  delete(id: string| number ): void {
    if (window.confirm('Desea eliminar este Registro')) {
      this.placeSvc.DeleteCountry(id).subscribe((res: any) => {
        this.toastr.error('Registro Eliminado', 'Eliminado',{
          timeOut: 3000,
        });
          this.list();
        });
    }
  }

  isvalid(field: string): boolean {
    return (this.countryform.get(field).invalid && (this.countryform.get(field).dirty || this.countryform.get(field).touched));
  }


  errorMessage(field: string): string {
    const  { errors }   = this.countryform.get(field);
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
