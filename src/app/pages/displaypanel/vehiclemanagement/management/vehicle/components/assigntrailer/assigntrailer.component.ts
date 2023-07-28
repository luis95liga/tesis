import { CatalogueService } from './../../../../../services/vehicle/catalogue.service';
import { VehicleService } from './../../../../../services/vehicle/vehicle.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AssignTrailer, TechnicalDataTrailer, Trailer, TrailerList } from '@app/shared/models/vehicle.interface';
import { ToastrService } from 'ngx-toastr';


enum Action {
  EDIT = 'edit',
  NEW = 'new',
}

@Component({
  selector: 'app-assigntrailer',
  templateUrl: './assigntrailer.component.html',
  styleUrls: ['./assigntrailer.component.scss']
})
export class AssigntrailerComponent  implements OnInit {

  new: boolean = false;
  edit: boolean = false;
  actionTODO: any;
  data1: TrailerList[] = [];
  traileform:any;
  datafrom:any;
  result:TrailerList[] =[]
  trailer: TrailerList[] = [];
  technical: TechnicalDataTrailer[]= [];
  assigntrailerfrom: any;
  id: number = 0;
  idt: number = 0;
  m: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private vehicleSvc: VehicleService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<AssigntrailerComponent>
  ){}

  ngOnInit(): void {
    this.DataFrom();
    this.id = this.data.vehicle.idvehicle;
    this.assigntrailerfrom.patchValue({
      idvehicle: this.id
    });
    this.assigntrailerfrom.updateValueAndValidity();
    this.vehicleSvc.GetAssignVehiceTrailer(this.id).subscribe(
      (res: any)=>{
        if(res.length > 0){
          const assign: AssignTrailer = res[0];
          this.idt = assign.idassigntrailer;
          this.actionTODO = Action.EDIT;
          this.assigntrailerfrom.patchValue({
            dateassign: assign.dateassign,
            observations: assign.observations,
            idvehicle: assign.idvehicle,
            idtrailer: assign.idtrailer
          });
          this.assigntrailerfrom.updateValueAndValidity();
        }else{
          this.actionTODO = Action.NEW;
        }
      },
      (err)=> console.error(err)
    );
    this.vehicleSvc.GetTrailer().subscribe(
      (trailer:TrailerList[])=>{
        this.trailer = trailer;
        this.result = [...this.trailer];
        if(this.idt != 0 ){
          const id = this.assigntrailerfrom.value.idtrailer;
          const cap = this.trailer.filter((r)=> r.idtrailer == id);
          this.result = this.result.filter((r)=> r.idtrailer != id);
          this.data1.push(cap[0]);
        }
      }
    );
    this.vehicleSvc.GetVehicle().subscribe(
      (vehicle)=>{
        for(let i = 0; i < vehicle.length; i++){
          this.vehicleSvc.GetAssignVehiceTrailer(vehicle[i].idvehicle).subscribe(
            (res:any)=>{
              if(res.length > 0){
                this.result = this.result.filter((r)=> r.idtrailer != res[0].idtrailer);
              }
            }
          );
        }
      }
    );

  }

  DataFrom(): void{
    this.datafrom = this.fb.group({
      id: [,[Validators.required]]
    });
    this.traileform = this.fb.group({
      id: [,[Validators.required]]
    });

    this.assigntrailerfrom = this.fb.group({
      dateassign: [,[Validators.required, Validators.minLength(8)]],
      observations: ['',[]],
      idvehicle: [,[Validators.required]],
      idtrailer: [,[Validators.required]]
    });
  }

  cancel(is: boolean):boolean {
    this.actionTODO = Action.NEW;
    this.new = !this.new;
    //this.documentform.reset();
    return this.new;
  }

  selcion(): void {
    if(this.result.length > 0 && this.traileform.value.id){
      const id = this.traileform.value.id;
      const cap = this.trailer.filter((r)=> r.idtrailer == id);
      this.result = this.result.filter((r)=> r.idtrailer != id[0]);
      this.data1.push(cap[0]);
      this.traileform.reset();
      this.assigntrailerfrom.patchValue({
        idtrailer: cap[0].idtrailer
      });
      this.assigntrailerfrom.updateValueAndValidity();
    }
  }

  unselcion(): void {
    if(this.data1.length > 0 && this.datafrom.value.id){
      const id = this.datafrom.value.id;
      const cap = this.trailer.filter((r)=> r.idtrailer == id);
      this.data1 = this.data1.filter((r)=> r.idtrailer != id[0]);
      this.result.push(cap[0]);
      this.datafrom.reset();
      this.assigntrailerfrom.patchValue({
        idtrailer: '',
      });
      this.assigntrailerfrom.updateValueAndValidity();
    }
  }

  save(): void {
    if(this.assigntrailerfrom.invalid){
      return;
    }
    const data = this.assigntrailerfrom.value;
    if(this.actionTODO === Action.NEW){
      this.vehicleSvc.PostAssignTrailer(data).subscribe(
        (res: any) => {
          this.m = res;
          this.toastr.success(this.m.message, 'Creado',{
            timeOut: 3000,
          });
          this.dialogRef.close(true);
        }
      );
    }

    if(this.actionTODO === Action.EDIT){
      this.vehicleSvc.PutAssignTrailer(data, this.idt).subscribe(
        (res: any) => {
          this.m = res;
          this.toastr.warning(this.m.message, 'Actializado',{
            timeOut: 3000,
          });
          this.dialogRef.close(true);
        }
      );
    }

  }

  delete(): void {
    this.vehicleSvc.DeleteAssignTrailer(this.idt).subscribe(
      (res)=>{
        this.toastr.error('Registro Eliminado', 'Eliminado',{
          timeOut: 3000,
        });
      },
      (err)=>console.log(err)
    );
  }

  isvalid(field: string): boolean {
    return (this.assigntrailerfrom.get(field).invalid && (this.assigntrailerfrom.get(field).dirty || this.assigntrailerfrom.get(field).touched));
  }


  errorMessage(field: string): string {
    const  { errors }   = this.assigntrailerfrom.get(field);
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
