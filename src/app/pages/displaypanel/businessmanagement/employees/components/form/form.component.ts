import { Component, OnInit,  Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { EmployeesService } from '@displaypanel/services/business/employees.service';
import { PlaceService } from '@displaypanel/services/business/place.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '@app/pages/auth/auth.service';
import { UserResponse } from '@app/shared/models/user.interface';
import { environment } from '@env/environment';
import { MatDialogRef } from '@angular/material/dialog';
import { EmployeeList } from '@app/shared/models/employee.interface';

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
  form: any;
  cederror: boolean = false;
  cedmessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authSvc: AuthService,
    private employeeSvc: EmployeesService,
    private placeSvc: PlaceService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<FormComponent>
  ) { }

  employeeform: any;
  location: any[]= [];
  periodpayment: any[]= [];
  position: any[]= [];
  message ='';
  idcompany = 0;
  s = false;
  img: string = './../../../../../../assets/noimage.png';
  m: any = [];
  text = '';
  actionTODO = '';
  id= '';
  private isValidEmail = /\S+@\S+\.\S+/;

  ngOnInit(): void {
    this.EmployeeForm();
    this.List();
    if(this.data.employee.idemployee){
      this.actionTODO = Action.EDIT;
      this.text = 'Editar';
      this.id = this.data.employee.idemployee;
      this.employeeSvc.GetIdEmployee(this.id).subscribe(res=>{
        if(res.photo){
          this.img = environment.API_URL+res.photo;
        }else{
          this.img = './../../../../../../assets/noimage.png';
        }
        this.employeeform.patchValue({
          identificationcard: res.identificationcard,
          names: res.names,
          lastnames: res.lastnames,
          birth_date: res.birth_date,
          photo: res.phone,
          address: res.address,
          email: res.email,
          phone: res.phone,
          cell: res.cell,
          observations: res.observations,
          salary: res.salary,
          entry_date: res.entry_date,
          idlocation: res.idlocation,
          idposition: res.idposition,
          idperiod_payment: res.idperiod_payment,
          idcompany: res.idcompany
        });
        this.employeeform.updateValueAndValidity();
      },err=>console.error(err));
    }else{
      this.actionTODO = Action.NEW;
      this.text = 'Nuevo';
    }
  }

  EmployeeForm(): void {
    this.employeeform = this.fb.group({
      identificationcard: ['',[Validators.required, Validators.minLength(10)]],
      names: ['',[Validators.required, Validators.minLength(4)]],
      lastnames: ['',[Validators.required, Validators.minLength(4)]],
      birth_date: ['',[Validators.required, Validators.minLength(4)]],
      photo:['',[]],
      address: ['',[Validators.required, Validators.minLength(4)]],
      email: ['',[Validators.required, Validators.minLength(4), Validators.pattern(this.isValidEmail)]],
      phone: ['',[Validators.required, Validators.minLength(8)]],
      cell: ['',[Validators.required, Validators.minLength(8)]],
      observations: ['',[Validators.required, Validators.minLength(4)]],
      salary: ['',[Validators.required,Validators.min(100)]],
      entry_date: ['',[Validators.required, Validators.minLength(4)]],
      idlocation: [,[Validators.required]],
      idposition: [,[Validators.required]],
      idperiod_payment: [,[Validators.required]],
      idcompany: [this.idcompany]
    });
    this.form = this.fb.group({
      profile: ['']
    });
  }

  List(): void {
    this.placeSvc.GetLocation().subscribe(location=>{
      this.location = location;
    },err=>console.error(err));

    this.employeeSvc.Getperiodpayment().subscribe(periodpayment=>{
      this.periodpayment = periodpayment;
    },err=>console.error(err));

    this.employeeSvc.GetPosition().subscribe(position=>{
      this.position = position;
    },err=>console.error(err));

    this.authSvc.user$.subscribe(
      (user: UserResponse) => {
        this.idcompany = user.idcompany;
      },
      (error: any) => {
        console.log(error);
      }
    );

  }

  onChangeced( event: any ){
    if(event.target.value.length === 10 && event.target.value !='' ) {
      let cedula = event.target.value;
      let total: number = 0;
      let longitud: number = event.target.value.length;
      let longcheck = longitud - 1;
      for(let i = 0; i < longcheck; i++){
        if (i%2 === 0) {
          let aux = cedula.charAt(i) * 2;
          if (aux > 9) aux -= 9;
          total += aux;
        } else {
          total += parseInt(cedula.charAt(i));
        }
      }
      total = total % 10 ? 10 - total % 10 : 0;
      if (cedula.charAt(longitud-1) == total) {
        this.employeeSvc.getEmployee().subscribe(
          (employee: EmployeeList[])=>{
            const emp = employee.filter(e=>e.identificationcard === cedula);
            if(this.actionTODO == Action.EDIT){
              this.employeeSvc.GetIdEmployee(this.id).subscribe(res=>{
                if(res.identificationcard === cedula){
                  this.cederror= false;
                }else{
                  if(emp.length > 0){
                    this.cedmessage = "Existe un Empleado con esta Cedula";
                    this.cederror= true;
                  }else{
                    this.cederror= false;
                  }
                }
              });
            }else{
              if(emp.length > 0){
                this.cedmessage = "Existe un Empleado con esta Cedula";
                this.cederror= true;
              }else{
                this.cederror= false;
              }
            }
          }
        );
      }else{
        this.cederror = true;
        this.cedmessage = "Cedula inválidad";
      }
    }else{
      this.cederror= false;
    }
  }

  onChange(event:any){
    if(event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('profile').setValue(file);
    }
  }

  save(): void {
    this.employeeform.patchValue({
      idcompany: this.idcompany,
    });
    this.employeeform.updateValueAndValidity();

    if(this.form.get('profile').value){
      const formData = new FormData();
      formData.append('identificationcard', this.employeeform.value.identificationcard);
       formData.append('names', this.employeeform.value.names);
       formData.append('lastnames', this.employeeform.value.lastnames);
       formData.append('birth_date', this.employeeform.value.birth_date);
       formData.append('photo', this.form.get('profile').value);
       formData.append('address', this.employeeform.value.address);
       formData.append('email', this.employeeform.value.email);
       formData.append('phone', this.employeeform.value.phone);
       formData.append('cell', this.employeeform.value.cell);
       formData.append('observations', this.employeeform.value.observations);
       formData.append('salary', this.employeeform.value.salary);
       formData.append('entry_date', this.employeeform.value.entry_date);
       formData.append('idlocation', this.employeeform.value.idlocation);
       formData.append('idposition', this.employeeform.value.idposition);
       formData.append('idperiod_payment', this.employeeform.value.idperiod_payment);
       formData.append('idcompany', this.employeeform.value.idcompany);
       if(this.actionTODO === Action.NEW ) {
        this.employeeSvc.PostEmployee(formData).subscribe(res=>{
          this.m = res;
          this.toastr.success(this.m.message, 'Creado',{
            timeOut: 3000,
          });
          this.dialogRef.close(true);
        },err=>console.error(err));
       }

       if(this.actionTODO === Action.EDIT ) {
        this.employeeSvc.PutEmployee(formData,this.id).subscribe(res=>{
          this.m = res;
          this.toastr.warning(this.m.message, 'Creado',{
            timeOut: 3000,
          });
          this.dialogRef.close(true);
        },err=>console.error(err));
       }

    }else{
      if(this.actionTODO === Action.NEW ) {
        const form = this.employeeform.value;
        this.employeeSvc.PostEmployee(form).subscribe(res=>{
          this.m = res;
          this.toastr.success(this.m.message, 'Creado',{
            timeOut: 3000,
          });
          this.dialogRef.close(true);
        },err=>console.error(err));
      }

      if(this.actionTODO === Action.EDIT ) {
        const form = this.employeeform.value;
        this.employeeSvc.PutEmployee(form,this.id).subscribe(res=>{
          this.m = res;
          this.toastr.warning(this.m.message, 'Creado',{
            timeOut: 3000,
          });
          this.dialogRef.close(true);
        },err=>console.error(err));
      }
    }
  }

  isvalid(field: string): boolean {
    return (this.employeeform.get(field).invalid && (this.employeeform.get(field).dirty || this.employeeform.get(field).touched));
  }

  errorMessage(field: string): string {
    const  { errors }   = this.employeeform.get(field);
    let minlength = errors?.minlength?.requiredLength;
    if (errors) {
      const messages:any = {
        required: 'el campo es requerido',
        pattern: 'El Campo no es un Correo Electronico Valido',
        min: 'El campo no puede tener menos de 100',
        minlength: `el valor ingresado es menor a ${ minlength } carateres`,
      };
      const errorkey = Object.keys(errors).find(Boolean);
      return messages[errorkey|| ''];
    }
    return '';
  }

  closeDialog() {

  }
}

