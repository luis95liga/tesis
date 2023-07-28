import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Owner } from '@shared/models/vehicle.interface';
import { CatalogueService } from '@displaypanel/services/vehicle/catalogue.service';
import { CompanyService } from '@displaypanel/services/business/company.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';

enum Action {
  EDIT = 'edit',
  NEW = 'new',
}

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.scss']
})
export class OwnerComponent implements OnInit {
  @ViewChild('scheduledOrdersPaginator') set paginator(pager:MatPaginator) {
    if (pager) this.dataSource.paginator = pager;
  }

  actionTODO = '';
  isedit:string | number = 0;
  mensaje ='';
  options = [1];
  selectopcion = false;
  selecvalue = '';
  ownerform: any;
  displayedColumns: string[] = ['idowner', 'name', 'company','actions'];
  dataSource = new MatTableDataSource();
  length = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [];
  ed = false;
  m: any;

  constructor(
    private catagueSvc: CatalogueService,
    private companySvc: CompanyService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService,
  ) { }

   owners: Owner[] = [];
   owner: any = [];
   company: any= [];

  ngOnInit(): void {
    this.actionTODO = Action.NEW;
    this.list();
    this.ownerForm();
    this.selectopcion = false;
    this.selecvalue = '';

  }

  ownerForm(): void {
    this.ownerform = this.fb.group({
      name:[{value: '', disabled: true},[Validators.required, Validators.minLength(8)]],
      idcompany:[{value: '', disabled: true},[Validators.required]],
    });
  }

  fromdisable(is: boolean): void {
    if(!is){
      this.ownerform.controls['name'].disable();
      this.ownerform.controls['idcompany'].disable();
    }else{
      this.ownerform.controls['name'].enable();
      this.ownerform.controls['idcompany'].enable();
    }
  }

  list(): void {
    this.ed = false;
    this.catagueSvc.GetOwer().subscribe(
      owner=>{
        this.dataSource.data = owner;
        this.length = owner.length;
        this.pageSizeOptions = [5, 10, 20, owner.length];
      },
      err => console.error(err)
    );
    this.companySvc.GetCompany().subscribe(
      comany=>{
        this.company = comany;
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
}

  save(): void {
    const owner = this.ownerform.value;
    if(this.isedit ==0){
      if(this.actionTODO === Action.NEW ) {
        this.catagueSvc.PostOwer(owner).subscribe((res) => {
          this.m = res;
          this.toastr.success(this.m.message, 'Creado',{
            timeOut: 3000,
          });
          this.list();
          this.ownerform.reset();
          this.isedit = 0;
          this.ed = false;
          this.fromdisable(this.ed);
        });
      }
    }else{
      if(this.actionTODO === Action.EDIT ) {
        this.catagueSvc.PutOwer(owner, this.isedit ).subscribe((res) => {
          this.m = res;
          this.toastr.warning(this.m.message, 'Actualizado',{
            timeOut: 3000,
          });
          this.list();
          this.ownerform.reset();
          this.isedit = 0;
          this.actionTODO = Action.NEW;
          this.ed = false;
          this.fromdisable(this.ed);
        });
      }
    }
  }

  New(): void {
    this.ownerform.reset();
    this.isedit = 0;
    this.ed = true;
    this.fromdisable(this.ed);
  }

  edit(id: string| number): void {
    this.ed = true;
    this.fromdisable(this.ed);
    this.actionTODO = Action.EDIT;
    this.catagueSvc.GetIdOwer(id).subscribe(
      owner=>{
        this.ownerform.patchValue({
          name: owner.name,
          idcompany: owner.idcompany,
        });
        this.ownerform.updateValueAndValidity();
      },
      err => console.error(err)
    );
    this.isedit = id;
    this.selectopcion = true;
    this.selecvalue = this.owner.company;
  }

  cancel(): void {
    this.ownerform.reset();
    this.isedit = 0;
    this.actionTODO = Action.NEW;
    this.selectopcion = false;
    this.selecvalue = '';
    this.ed = false;
    this.fromdisable(this.ed);
  }

  delete(id: string| number ): void {
    if (window.confirm('Desea eliminar este propietario')) {
      this.catagueSvc.DeleteOwer(id).subscribe((res) => {
        this.toastr.error('Registro Eliminado', 'Eliminado',{
          timeOut: 3000,
        });
        this.list();
      });
    }
  }

  isvalid(field: string): boolean {
    return (this.ownerform.get(field).invalid && (this.ownerform.get(field).dirty || this.ownerform.get(field).touched));
  }


  errorMessage(field: string): string {
    const  { errors }   = this.ownerform.get(field);
    let minlength = errors?.minlength?.requiredLength;;
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
