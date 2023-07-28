import { Component, OnInit,  Inject} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CompanyService } from '@displaypanel/services/business/company.service';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';

enum Action {
  EDIT = 'edit',
  NEW = 'new',
}

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {

  actionTODO = '';
  displayedColumns: string[] = [ 'idbank_account', 'bank_name', 'account_number', 'default','actions'];
  dataSource = new MatTableDataSource();
  message ='';
  new: boolean = false;
  edit: boolean = false;
  company:any;
  id: any;
  acountform: any;
  idcompany:any;
  account: any;
  length = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [];
  m: any;
  constructor(
    private companySvc: CompanyService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.List();
    this.AcountForm();
  }

  List(): void {
    this.company = this.data.company.idcompany;
    this.idcompany = this.company.idcompany;
    this.companySvc.getCompanyAccount(this.company).subscribe(
      account=>{
        this.dataSource.data = account;
        this.length = account.length;
        this.pageSizeOptions = [5, 10, 20, account.length];
      },
      err => console.error(err)
    );
  }

  AcountForm(): void {
    this.acountform = this.fb.group({
      bank_name: ['',[Validators.required, Validators.minLength(5)]],
      account_number: ['',[Validators.required, Validators.minLength(10)]],
      default: [false],
      idcompany: [],
    });
  }


  cancel(is: boolean):boolean {
    this.actionTODO = Action.NEW;
    this.new = !this.new;
    this.acountform.reset();
    return this.new;
  }

  Edit(id: number | string):void{
    this.actionTODO = Action.EDIT;
    this.edit = !this.edit;
    this.new = !this.new;
    this.companySvc.GetIdBankAccount(id).subscribe(
      account=>{
        this.id = account.idbank_account;
        this.acountform.patchValue({
          bank_name: account.bank_name,
          account_number: account.account_number,
          default:account.default,
          idcompany: account.idcompany,
        });
        this.acountform.updateValueAndValidity();
      }
    );
  }

  New(is: boolean): boolean {
    if(is){
      if(this.actionTODO === Action.NEW){
        if(this.acountform.valid){
          this.acountform.patchValue({
            idcompany: this.company
          });
          this.acountform.updateValueAndValidity();
          const data = this.acountform.value;
          this.companySvc.PostBankAccount(data).subscribe(
            (res: any) => {
              this.m = res;
              this.toastr.success(this.m.message, 'Creado',{
                timeOut: 3000,
              });
              this.List();
              this.acountform.reset();
              return this.new;
            });
        }else{
          this.toastr.warning('Sin Datos', 'No Hay Registro',{
            timeOut: 3000,
          });
          return this.new;
        }
      }
      if(this.actionTODO === Action.EDIT ){
        const data = this.acountform.value;
        this.companySvc.PutBankAccount(data, this.id).subscribe(
          (res: any)=>{
            this.m = res;
            this.toastr.warning(this.m.message, 'actulizado',{
            timeOut: 3000,
            });
            this.List();
            this.acountform.reset();
            this.edit = !this.edit;
            this.actionTODO = Action.NEW;
            return this.new;
          }
        );
      }
    }
    this.actionTODO = Action.NEW;
    this.edit = !this.edit;
    this.new = !this.new;
    return this.new;
  }

  isvalid(field: string): boolean {
    return (this.acountform.get(field).invalid && (this.acountform.get(field).dirty || this.acountform.get(field).touched));
  }

  delete(id: any): void{
    if (window.confirm('Desea eliminar este Registro')) {
      this.companySvc.DeleteBankAccount(id).subscribe((res: any) => {
        this.toastr.error('Registro Eliminado', 'Eliminado',{
          timeOut: 3000,
        });
          this.List();
        });
    }
  }

  errorMessage(field: string): string {
    const  { errors }   = this.acountform.get(field);
    let minlenght = errors?.minlength?.requiredLength;
    if (errors) {
      const messages:any = {
        required: 'el campo es requerido',
        minlength: `el Texto ingresado tiene menos de ${ minlenght } carateres`,
      };
      const errorkey = Object.keys(errors).find(Boolean);
      return messages[errorkey|| ''];
    }
    return '';
  }

}
