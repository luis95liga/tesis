import { Component, OnInit,  Inject} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CompanyService } from '@displaypanel/services/business/company.service';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from '@env/environment';

enum Action {
  EDIT = 'edit',
  NEW = 'new',
}

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {

  actionTODO = '';
  displayedColumns: string[] = [  'iddocument','type_document','attachment','issue_date','expiration_date','cost_procedure','actions'];
  dataSource = new MatTableDataSource();
  message ='';
  new: boolean = false;
  edit: boolean = false;
  company:any;
  id: any;
  documentform: any;
  idcompany:any;
  account: any;
  length = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [];
  m: any;
  documentstype: any[] = [];
  form: any;
  errms: boolean = false;

  constructor(
    private companySvc: CompanyService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.List();
    this.DocumentForm();
  }

  List(): void {
    this.company = this.data.company.idcompany;
    this.idcompany = this.company.idcompany;
    this.companySvc.GetDocumentCompany(this.company).subscribe(
      document=>{
        this.dataSource.data = document;
        this.length = document.length;
        this.pageSizeOptions = [5, 10, 20, document.length];
      },
      err => console.error(err)
    );
    this.companySvc.GetTypeDocuments().subscribe(
      documenttype=>{
        this.documentstype = documenttype;
      },
      err => console.error(err)
    );
  }

  DocumentForm(): void {
    this.documentform = this.fb.group({
      issue_date: ['',[Validators.required, Validators.minLength(5)]],
      expiration_date: ['',[Validators.required, Validators.minLength(5)]],
      attachment: [],
      cost_procedure: ['',[Validators.required, Validators.min(100)]],
      observations: ['',[Validators.required, Validators.minLength(5)]],
      idtype_document: [,[Validators.required]],
      idcompany: []
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
    this.documentform.reset();
    return this.new;
  }

  onChange(ev: any): void {
    if (ev.target.files.length > 0) {
      if(ev.target.files[0].size > 5048576){
        this.message = `El documento excede el tamaño máximo de 5 MB`;
        const errms = true;
      }else{
        const file = ev.target.files[0];
        this.form.get('document').setValue(file);
        this.message='';
        this.errms = false;
      }
    }
  }

  Edit(id: number | string):void{
    this.actionTODO = Action.EDIT;
    this.edit = !this.edit;
    this.new = !this.new;
    this.companySvc.GetIdDocument(id).subscribe(
      document=>{
        console.log(document);
        this.id = document.iddocument;
        this.documentform.patchValue({
          issue_date: document.issue_date,
          expiration_date: document.expiration_date,
          //attachment: document.attachment,
          cost_procedure: document.cost_procedure,
          observations: document.observations,
          idtype_document: document.idtype_document,
          idcompany: document.idcompany
        });
        this.documentform.updateValueAndValidity();
      });
  }

  New(is: boolean): boolean {
    if(is){
      if(this.actionTODO === Action.NEW){
        if(this.documentform.valid){
          if(this.form.get('document').value){
            const formData = new FormData();
            formData.append('issue_date',this.documentform.value.issue_date);
            formData.append('expiration_date',this.documentform.value.expiration_date);
            formData.append('attachment', this.form.get('document').value);
            formData.append('cost_procedure',this.documentform.value.cost_procedure);
            formData.append('observations',this.documentform.value.observations);
            formData.append('idtype_document',this.documentform.value.idtype_document);
            formData.append('idcompany', this.company);
            this.companySvc.PostDocument(formData).subscribe(
              (res: any) => {
                this.m = res;
                this.toastr.success(this.m.message, 'Creado',{
                  timeOut: 3000,
                });
                this.List();
                this.documentform.reset();
                return this.new;
              },
              (err: any) => console.log(err)
            );
          }else{
            this.documentform.patchValue({
              idcompany: this.company
            });
            this.documentform.updateValueAndValidity();
            const data = this.documentform.value;
            this.companySvc.PostDocument(data).subscribe(
              (res: any) => {
                this.m = res;
                this.toastr.success(this.m.message, 'Creado',{
                  timeOut: 3000,
                });
                this.List();
                this.documentform.reset();
                return this.new;
              },
              (err: any) => console.log(err)
            );
          }
        }else{
          this.toastr.warning('Sin Datos', 'No Hay Registro',{
            timeOut: 3000,
          });
          return this.new;
        }
      }
      if(this.actionTODO === Action.EDIT){
        if(this.documentform.valid){
          if(this.form.get('document').value){
            const formData = new FormData();
          formData.append('issue_date',this.documentform.value.issue_date);
          formData.append('expiration_date',this.documentform.value.expiration_date);
          formData.append('attachment',this.form.get('document').value);
          formData.append('cost_procedure',this.documentform.value.cost_procedure);
          formData.append('observations',this.documentform.value.observations);
          formData.append('idtype_document',this.documentform.value.idtype_document);
          formData.append('idcompany', this.company);
          this.companySvc.PutDocument(formData, this.id).subscribe(
            (res: any)=>{
              this.m = res;
              this.toastr.warning(this.m.message, 'actulizado',{
                timeOut: 3000,
              });
              this.List();
              this.documentform.reset();
              this.edit = !this.edit;
              this.actionTODO = Action.NEW;
              return this.new;
            },
            err=>console.error(err)
          );
          }else{
            this.documentform.patchValue({
              idcompany: this.company
            });
            this.documentform.updateValueAndValidity();
            const data = this.documentform.value;
            this.companySvc.PutDocument(data, this.id).subscribe(
              (res: any)=>{
                this.m = res;
                this.toastr.warning(this.m.message, 'actulizado',{
                  timeOut: 3000,
                });
                this.List();
                this.documentform.reset();
                this.edit = !this.edit;
                this.actionTODO = Action.NEW;
                return this.new;
              },
              err=>console.error(err)
            );
          }
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
    return (this.documentform.get(field).invalid && (this.documentform.get(field).dirty || this.documentform.get(field).touched));
  }

  delete(id: any): void{
    if (window.confirm('Desea eliminar este Registro')) {
      this.companySvc.DeleteDocument(id).subscribe((res: any) => {
        this.toastr.error('Registro Eliminado', 'Eliminado',{
          timeOut: 3000,
        });
          this.List();
        });
    }
  }

  errorMessage(field: string): string {
    const  { errors }   = this.documentform.get(field);
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
