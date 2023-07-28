import { Component, OnInit,  Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { CompanyService } from '@displaypanel/services/business/company.service';
import { ClientService } from '@displaypanel/services/client/client.service';
import { PlacesService } from '@displaypanel/services/routes/places.service';
import { ToastrService } from 'ngx-toastr';

enum Action {
  EDIT = 'edit',
  NEW = 'new',
}


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  date = false;

  constructor(
    private fb: FormBuilder,
    private companySvc: CompanyService,
    private clientSvc: ClientService,
    private placeSvc: PlacesService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogo: MatDialogRef<FormComponent>,
  ) { }

  clientform: any;
  destinations: any[]= [];
  periodpayment: any[]= [];
  position: any[]= [];
  message: any;
  idcompany = 0;
  private isValidEmail = /\S+@\S+\.\S+/;
  s = false;
  img: any;
  m: any = [];
  text = '';
  actionTODO = '';
  id= '';

  ngOnInit(): void {
    this.ClientForm();
    this.List();
    if(this.data.client.idclient){
      this.actionTODO = Action.EDIT;
      this.text = 'Editar';
      this.id = this.data.client.idclient;
      this.clientSvc.GetIdClient(this.id).subscribe(res=>{
        this.clientform.patchValue({
          identificationcard: res.identificationcard,
          names: res.names,
          lastnames: res.lastnames,
          birth_date: res.birth_date,
          address: res.address,
          email: res.email,
          phone: res.phone,
          cell: res.cell,
          observations: res.observations,
          entry_date: res.entry_date,
          iddestinations: res.iddestinations,
          idcompany: res.idcompany
        });
        this.clientform.updateValueAndValidity();
      },err=>console.error(err));
    }else{
      this.actionTODO = Action.NEW;
      this.text = 'Nuevo';
    }
  }

  ClientForm(): void {
    this.clientform = this.fb.group({
      identificationcard: ['',[Validators.required, Validators.minLength(10)]],
      names: ['',[Validators.required, Validators.minLength(4)]],
      lastnames: ['',[Validators.required, Validators.minLength(4)]],
      birth_date: ['',[Validators.required, Validators.minLength(4)]],
      address: ['',[Validators.required, Validators.minLength(4)]],
      email: ['',[Validators.required, Validators.minLength(6),Validators.pattern(this.isValidEmail)]],
      phone: ['',[Validators.required, Validators.minLength(8)]],
      cell: ['',[Validators.required, Validators.minLength(8)]],
      observations: ['',[Validators.required, Validators.minLength(4)]],
      entry_date: ['',[Validators.required, Validators.minLength(4)]],
      iddestinations: [,[Validators.required]],
      idcompany: [this.idcompany]
    });
  }

  List(): void {
    this.placeSvc.GetDestinations().subscribe(
      (destinations)=>{
      this.destinations = destinations;
      },
      err=>console.error(err)
    );
    const user = JSON.parse(localStorage.getItem('user')|| '{}');
    this.idcompany = user.Idcompany;
    this.clientform.updateValueAndValidity();
  }

  save(): void {
    if(this.actionTODO === Action.NEW ) {
      this.clientform.patchValue({
        idcompany: this.idcompany,
      });
      this.clientform.updateValueAndValidity();
      const form = this.clientform.value;
      this.clientSvc.PostClient(form).subscribe(res=>{
        this.m = res;
        this.s = true;
        this.toastr.success(this.m.message, 'Creado',{
          timeOut: 3000,
        });
        this.dialogo.close(true);
      },err=>console.error(err));
    }else{
      this.clientform.patchValue({
        idcompany: this.idcompany,
      });
      this.clientform.updateValueAndValidity();
      const form = this.clientform.value;
      this.clientSvc.PutClient(form,this.id).subscribe(res=>{
        this.m = res;
        this.s = true;
        this.toastr.warning(this.m.message, 'Actualizado',{
          timeOut: 3000,
        });
        this.dialogo.close(true);
      },err=>console.error(err));
    }


  }

  isvalid(field: string): boolean {
    return (this.clientform.get(field).invalid && (this.clientform.get(field).dirty || this.clientform.get(field).touched));
  }

  errorMessage(field: string): string {
    const  { errors }   = this.clientform.get(field);
    let minlenght = errors?.minlength?.requiredLength;
    if (errors) {
      const messages:any = {
        required: 'el campo es requerido',
        pattern: 'Correo electronico no es corecto',
        minlength: `el valor ingresado es menor a ${ minlenght } carateres`,
      };
      const errorkey = Object.keys(errors).find(Boolean);
      return messages[errorkey|| ''];
    }
    return '';
  }

  onAgeCalculator(ev: any){
    if(this.clientform.value.birth_date){
      const convertAge = new Date(this.clientform.value.birth_date);
      const timeDiff = Math.abs(Date.now() - convertAge.getTime());
      const age = Math.floor((timeDiff / (1000 * 3600 * 24))/365);
      if(age < 18){
        this.message = 'No es mayor de edad'
        this.date = true;
      }else{
        this.date = false;
      }
    }
  }

}

