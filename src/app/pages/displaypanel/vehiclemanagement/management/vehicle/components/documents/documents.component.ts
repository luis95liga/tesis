import { Component, OnInit,  Inject, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CatalogueService } from '@displaypanel/services/vehicle/catalogue.service';
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
  displayedColumns: string[] = [  'iddocument_vehicle','document_type','attachment','procedure_cost','issue_date','expiration_date','actions'];
  dataSource = new MatTableDataSource();
  message ='';
  new: boolean = false;
  edit: boolean = false;
  vehicle:any;
  id: any;
  documentform: any;
  idvehicle:any;
  account: any;
  length = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [];
  m: any;
  documentstype: any[] = [];
  form: any;
  errms: boolean= false;

  constructor(
    private catalogueSvc: CatalogueService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.List();
    this.DocumentForm();
  }

  DocumentForm(): void {
    this.documentform = this.fb.group({
      issue_date: ['',[Validators.required, Validators.minLength(5)]],
      expiration_date: ['',[Validators.required, Validators.minLength(5)]],
      attachment: [],
      procedure_cost: ['',[Validators.required, Validators.min(10)]],
      observations: ['',[Validators.required, Validators.minLength(5)]],
      iddocument_type: [,[Validators.required]],
      idvehicle: []
    });
    this.form = this.fb.group({
      document: ['']
    });
  }

  List(): void {
    console.log(this.data);
    this.vehicle = this.data.vehicle;
    this.idvehicle = this.vehicle.idvehicle;
    this.catalogueSvc.GetDocumentVehicle(this.idvehicle).subscribe(
      document=>{
        console.log(document);
        this.dataSource.data = document;
        this.length = document.length;
        this.pageSizeOptions = [5, 10, 20, document.length];
      },
      err => console.error(err)
    );
    this.catalogueSvc.GetDocumentType().subscribe(
      documenttype=>{
        this.documentstype = documenttype;
      },
      err => console.error(err)
    );
  }

  onOpenPdf(url: string): void {
    if(url.length){
      const pdf = environment.API_URL+url;
      window.open(pdf);
    }
  }

  cancel(is: boolean):boolean {
    this.actionTODO = Action.NEW;
    this.new = !this.new;
    this.documentform.reset();
    return this.new;
  }

  Edit(id: number | string):void{
    this.actionTODO = Action.EDIT;
    this.edit = !this.edit;
    this.new = !this.new;
    this.catalogueSvc.GetIdDocument(id).subscribe(
      document=>{
        this.id = document.iddocument_type;
        this.documentform.patchValue({
          issue_date: document.issue_date,
          expiration_date: document.expiration_date,
          //attachment: document.attachment,
          procedure_cost: document.procedure_cost,
          observations: document.observations,
          iddocument_type: document.iddocument_type,
          idvehicle: document.idvehicle
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
            formData.append('procedure_cost',this.documentform.value.procedure_cost);
            formData.append('observations',this.documentform.value.observations);
            formData.append('iddocument_type',this.documentform.value.iddocument_type);
            formData.append('idvehicle', this.idvehicle);
            this.catalogueSvc.PostDocument(formData).subscribe(
              (res: any) => {
                this.m = res;
                this.toastr.success(this.m.message, 'Creado',{
                  timeOut: 3000,
                });
                this.List();
                this.documentform.reset();
                return this.new;
              },
              err => console.error(err)
            );
          }else{
            this.documentform.patchValue({
              idemployee: this.idvehicle
            });
            this.documentform.updateValueAndValidity();
            const data = this.documentform.value;
            this.catalogueSvc.PostDocument(data).subscribe(
              (res: any) => {
                this.m = res;
                this.toastr.success(this.m.message, 'Creado',{
                  timeOut: 3000,
                });
                this.List();
                this.documentform.reset();
                return this.new;
              },
              err => console.error(err)
            );
          }
        }else{
          this.toastr.warning('Sin Datos', 'No Hay Registro',{
            timeOut: 3000,
          });
          return this.new;
        }
      }

      if(this.actionTODO === Action.EDIT ){
        if(this.documentform.valid){
          if(this.form.get('document').value){
            const formData = new FormData();
            formData.append('issue_date',this.documentform.value.issue_date);
            formData.append('expiration_date',this.documentform.value.expiration_date);
            formData.append('attachment', this.form.get('document').value);
            formData.append('procedure_cost',this.documentform.value.procedure_cost);
            formData.append('observations',this.documentform.value.observations);
            formData.append('iddocument_type',this.documentform.value.iddocument_type);
            formData.append('idvehicle', this.idvehicle);
            this.catalogueSvc.PutDocument(formData, this.id).subscribe(
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
              err => console.error(err)
            );
          }else{
            const data = this.documentform.value;
            this.catalogueSvc.PutDocument(data, this.id).subscribe(
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
              err => console.error(err)
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

  delete(id: any): void{
    if (window.confirm('Desea eliminar este Registro')) {
      this.catalogueSvc.DeleteDocument(id).subscribe((res: any) => {
        this.toastr.error('Registro Eliminado', 'Eliminado',{
          timeOut: 3000,
        });
          this.List();
        });
    }
  }

  getErrorMessage(field: string): string {
    const  { errors }   = this.documentform.get(field);
    let minlenght = errors?.minlength?.requiredLength;
    if (errors) {
      const messages:any = {
        required: 'el campo es requerido',
        min: 'El Valor no Puede ser menor a 10',
        minlength: `el valor ingresado es menor a ${ minlenght } carateres`,
      };
      const errorkey = Object.keys(errors).find(Boolean);
      return messages[errorkey|| ''];
    }
    return '';
  }

}
