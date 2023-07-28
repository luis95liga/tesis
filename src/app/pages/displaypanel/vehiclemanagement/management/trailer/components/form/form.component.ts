import { Component, OnInit,  Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VehicleModels,VehicleUse, OwnerList } from '@shared/models/vehicle.interface';
import { VehicleService } from '@displaypanel/services/vehicle/vehicle.service';
import { CatalogueService } from '@displaypanel/services/vehicle/catalogue.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { environment } from '@env/environment';

enum Action {
  EDIT = 'edit',
  NEW = 'new',
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit{
  form: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private vehicleSvc: VehicleService,
    private catalogueSvc: CatalogueService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ){

  }

  actionTODO = Action.NEW;
  hide = true;
  mensaje =''
  trailerform: any;
  owners: OwnerList[] = [];
  vehiclemodels: VehicleModels[] = [];
  vehicleuse: VehicleUse[] = [];
  Idcompany=0;
  message: any;
  m: any;
  idTrailer: any;
  text: any;
  IdtechnicaldataTrailer = 0;
  tuition: any[] = [];
  img = './../../../../../../assets/noimage.png';

  ngOnInit(): void {
    this.list();
    this.TrailerForm();
    const user = JSON.parse(localStorage.getItem('user')|| '{}');
    this.Idcompany = user.Idcompany;
    const c = this.data.trailers;
    let c1 = [];
    for (const key in this.data.trailers) {
      c1.push(c[key].tuition);
    }
    this.tuition = c1;
    if(this.data.trailer.idtrailer){
      this.idTrailer = this.data.trailer.idtrailer;
      this.IdtechnicaldataTrailer = this.data.trailer.idtechnical_datatrailer;
      this.actionTODO = Action.EDIT;
      this.text = 'Editar';
      this.vehicleSvc.GetIdTrailer(this.idTrailer).subscribe(
        trailer=>{
          if(trailer.image){
            this.img = environment.API_URL+trailer.image;
          }
          else{
            this.img='./../../../../../../assets/noimage.png';
          }
          this.trailerform.patchValue({
            tuition: trailer.tuition,
            state: trailer.state,
            idowner: trailer.idowner,
            idvehicle_model: trailer.idvehicle_model,
            idvehicle_use: trailer.idvehicle_use,
          });
          this.trailerform.updateValueAndValidity();
          this.catalogueSvc.GetIdTechnicalDataTrailer(this.IdtechnicaldataTrailer).subscribe(
            techinal=>{
              this.trailerform.patchValue({
                load_capacity: techinal.load_capacity,
                color: techinal.color,
                idadministrative_data: techinal.idadministrative_data,
                observation: techinal.observation,
                hours_use: techinal.hours_use,
              });
              this.trailerform.updateValueAndValidity();
            });
        });
    }else{
      this.actionTODO = Action.NEW;
      this.text = 'Nuevo';
    }
  }

  onChange(event:any){
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('profile').setValue(file);
    }
  }

  list(): void {
    this.catalogueSvc.GetOwer().subscribe(
      owner=>{
        this.owners = owner;
      },
      err => console.error(err)
    );
    this.catalogueSvc.GetVehicleModel().subscribe(
      vehiclemodels=>{
        this.vehiclemodels = vehiclemodels.filter(r=>r.model==='TODOREMOLQUES');
      },
      err => console.error(err)
    );
    this.catalogueSvc.GetVehicleUse().subscribe(
      vehicleuse=>{
        this.vehicleuse = vehicleuse;
      },
      err => console.error(err)
    );
  }

  TrailerForm(): void {
    this.trailerform = this.fb.group({
      image: [],
      tuition: ['',[Validators.required, Validators.minLength(7)]],
      state: [true],
      idowner: [,[Validators.required]],
      idvehicle_model: [,[Validators.required]],
      idvehicle_use: [,[Validators.required]],
      load_capacity: [,[Validators.required]],
      color: ['',[Validators.required, Validators.minLength(4)]],
      idadministrative_data: [,[Validators.required]],
      observation: ['',[Validators.required, Validators.minLength(4)]],
      hours_use: ['',[Validators.required, Validators.minLength(4)]],
    });
    this.form = this.fb.group({
      profile: ['']
    });
  }

  isvalid(field: string): boolean {
    return (this.trailerform.get(field).invalid && (this.trailerform.get(field).dirty || this.trailerform.get(field).touched));
  }


  errorMessage(field: string): string {
    const  { errors }   = this.trailerform.get(field);
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

  IsTuitionValidate(ev: any){
    const filter = this.tuition.filter(r=> r.includes(ev.target.value));
    if(filter.length){
      window.alert('Maticula ya Exixte');
      this.trailerform.patchValue({
        tuition: '',
      });
      this.trailerform.updateValueAndValidity();
    }
  }

  save(): void {
    if(this.form.get('profile').value){
      if(this.actionTODO === Action.NEW ) {
        const formData = new FormData();
        formData.append('image', this.form.get('profile').value);
        formData.append('tuition', this.trailerform.value.tuition);
        formData.append('state', this.trailerform.value.state);
        formData.append('idowner', this.trailerform.value.idowner);
        formData.append('idvehicle_model', this.trailerform.value.idvehicle_model);
        formData.append('idvehicle_use', this.trailerform.value.idvehicle_use);
        formData.append('load_capacity', this.trailerform.value.load_capacity);
        formData.append('color', this.trailerform.value.color);
        formData.append('idadministrative_data', this.trailerform.value.idadministrative_data);
        formData.append('observation', this.trailerform.value.observation);
        formData.append('hours_use', this.trailerform.value.hours_use);
        this.vehicleSvc.PostCreateTrailer(formData).subscribe(
          (res: any) => {
          this.m = res;
          this.toastr.success(this.m.message, 'Creado',{
            timeOut: 3000,
          });
        });
      }

      if(this.actionTODO === Action.EDIT ) {
        const formData = new FormData();
        formData.append('image', this.form.get('profile').value);
        formData.append('tuition', this.trailerform.value.tuition);
        formData.append('state', this.trailerform.value.state);
        formData.append('idowner', this.trailerform.value.idowner);
        formData.append('idvehicle_model', this.trailerform.value.idvehicle_model);
        formData.append('idvehicle_use', this.trailerform.value.idvehicle_use);
        formData.append('idtechnical_datatrailer', ''+this.IdtechnicaldataTrailer);

        const data = {
          load_capacity: this.trailerform.value.load_capacity,
          color: this.trailerform.value.color,
          idadministrative_data: this.trailerform.value.idadministrative_data,
          observation: this.trailerform.value.observation,
          hours_use: this.trailerform.value.hours_use
        }
        this.vehicleSvc.PutTrailer(formData, this.idTrailer).subscribe((res: any) => {
          this.m = res;
            this.toastr.warning(this.m.message, 'Actulizado',{
              timeOut: 3000,
            });
        });
        this.catalogueSvc.PutTechnicalDataTrailer(data, this.IdtechnicaldataTrailer).subscribe((res: any) => {
          this.m = res;
            this.toastr.warning(this.m.message, 'Actulizado',{
              timeOut: 3000,
            });
        });
      }
    }else{
      if(this.actionTODO === Action.NEW ) {
        const data = this.trailerform.value;
        this.vehicleSvc.PostCreateTrailer(data).subscribe((res: any) => {
          this.m = res;
          this.toastr.success(this.m.message, 'Creado',{
            timeOut: 3000,
          });
      });
      }

      if(this.actionTODO === Action.EDIT ) {
        const data1 = {
          image: null,
          tuition: this.trailerform.value.tuition,
          state: this.trailerform.value.state,
          idowner: this.trailerform.value.idowner,
          idvehicle_model: this.trailerform.value.idvehicle_model,
          idvehicle_use: this.trailerform.value.idvehicle_use,
          idtechnical_datatrailer: this.IdtechnicaldataTrailer
        }
        const data2 = {
          load_capacity: this.trailerform.value.load_capacity,
          color: this.trailerform.value.color,
          idadministrative_data: this.trailerform.value.idadministrative_data,
          observation: this.trailerform.value.observation,
          hours_use: this.trailerform.value.hours_use
        }
        this.vehicleSvc.PutTrailer(data1, this.idTrailer).subscribe((res: any) => {
          this.m = res;
            this.toastr.warning(this.m.message, 'Actulizado',{
              timeOut: 3000,
            });
        });
        this.catalogueSvc.PutTechnicalDataTrailer(data2, this.IdtechnicaldataTrailer).subscribe((res: any) => {
          this.m = res;
            this.toastr.warning(this.m.message, 'Actulizado',{
              timeOut: 3000,
            });
        });
      }
    }
  }

}
