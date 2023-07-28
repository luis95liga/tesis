import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '@app/pages/auth/auth.service';
import { TabulationService } from '@app/pages/displaypanel/services/routes/tabulation.service';
import { Concepts } from '@app/shared/models/router.interface';
import { environment } from '@env/environment';
import { ToastrService } from 'ngx-toastr';

enum Action {
  EDIT = 'edit',
  NEW = 'new',
}

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.scss']
})
export class BillsComponent implements OnInit{

  actionTODO = '';
  displayedColumns: string[] = [  'idbill','concepts','amount','actions'];
  dataSource = new MatTableDataSource();
  message ='';
  new: boolean = false;
  edit: boolean = false;
  id: any;
  billform: any;
  company:any;
  idtabulation:any;
  account: any;
  length = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [];
  m: any;
  concepts: Concepts[] = [];
  form: any;
  errms: boolean = false;
  constructor(
    private tabulationSvc: TabulationService,
    private authSvc: AuthService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<BillsComponent>
  ) {}

  ngOnInit(): void {
    this.List();
    this.BillForm();
  }

  List(): void {
    this.company = this.authSvc.userValue.idcompany;
    this.idtabulation = this.data.route.idtabulation;
    this.tabulationSvc.GetBillCompany(this.company,this.idtabulation).subscribe(
      bill=>{
        this.dataSource.data = bill;
        this.length = bill.length;
        this.pageSizeOptions = [5, 10, 20, bill.length];
      },
      err => console.error(err)
    );
    this.tabulationSvc.GetConcepts().subscribe(
      concepts=>{
        this.concepts = concepts;
      },
      err => console.error(err)
    );
  }

  BillForm(): void {
    this.billform = this.fb.group({
      idconcepts: [,[Validators.required]],
      amount: ['',[Validators.required, Validators.min(0)]],
      idtabulation: [,[Validators.required]],
      idcompany: [,[Validators.required]]
    });
    this.form = this.fb.group({
      document: ['']
    });
  }

  onOpenModal(url: any): void {
    const pdf = environment.API_URL+url;
    window.open(pdf);
  }

  cancel(is: boolean):boolean {
    this.actionTODO = Action.NEW;
    this.new = !this.new;
    this.billform.reset();
    return this.new;
  }

  Edit(id: number | string):void{
    this.actionTODO = Action.EDIT;
    this.edit = !this.edit;
    this.new = !this.new;
    this.tabulationSvc.GetIdBill(id).subscribe(
      bill=>{
        this.id = bill.idbill;
        this.billform.patchValue({
          idconcepts: bill.idconcepts,
          amount: bill.amount,
          idtabulation: bill.idtabulation,
          idcompany: bill.idcompany
        });
        this.billform.updateValueAndValidity();
      });
  }

  New(is: boolean): boolean {
    if(is){
      if(this.actionTODO === Action.NEW){
        this.billform.get('idcompany').setValue(this.company);
        this.billform.get('idtabulation').setValue(this.idtabulation);
        if(this.billform.valid){
          const data = this.billform.value;
          this.tabulationSvc.PostBill(data).subscribe(
            (res:any)=>{
              this.m = res;
              this.toastr.success(this.m.message, 'Creado',{
                timeOut: 3000,
              });
              this.List();
              this.billform.reset();
              return this.new;
            },
            (err)=> console.error(err)
          );
        }else{
          this.toastr.warning('Sin Datos', 'No Hay Registro',{
            timeOut: 3000,
          });
          return this.new;
        }
      }
      if(this.actionTODO === Action.EDIT){
        this.billform.get('idcompany').setValue(this.company);
        this.billform.get('idtabulation').setValue(this.idtabulation);
        if(this.billform.valid){
          const data = this.billform.value;
          this.tabulationSvc.PutBill(data, this.id).subscribe(
            (res:any)=>{
              this.m = res;
              this.toastr.warning(this.m.message, 'Actualizado',{
                timeOut: 3000,
              });
              this.List();
              this.billform.reset();
              return this.new;
            },
            (err)=> console.error(err)
          );
        }else{
          this.toastr.warning('Sin Datos', 'No Hay Registro',{
            timeOut: 3000,
          });
          return this.new;
        }
      }
      this.form.reset();
    }
    this.actionTODO = Action.NEW;
    this.edit = !this.edit;
    this.new = !this.new;
    return this.new;
  }

  isvalid(field: string): boolean {
    return (this.billform.get(field).invalid && (this.billform.get(field).dirty || this.billform.get(field).touched));
  }

  delete(id: any): void{
    if (window.confirm('Desea eliminar este Registro')) {
      this.tabulationSvc.DeleteBill(id).subscribe((res: any) => {
        this.toastr.error('Registro Eliminado', 'Eliminado',{
          timeOut: 3000,
        });
          this.List();
        });
    }
  }

  errorMessage(field: string): string {
    const  { errors }   = this.billform.get(field);
    let minlength = errors?.minlength?.requiredLength;
    if (errors) {
      const messages:any = {
        required: 'El campo es requerido',
        min: 'El Valor no Puede ser menor a 100',
        minlength: `El valor ingresado es menor a ${ minlength } carateres`,
      };
      const errorkey = Object.keys(errors).find(Boolean);
      return messages[errorkey|| ''];
    }
    return '';
  }

}
