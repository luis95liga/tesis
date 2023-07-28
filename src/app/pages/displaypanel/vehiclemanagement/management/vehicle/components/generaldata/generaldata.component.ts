import { CatalogueService } from '@displaypanel/services/vehicle/catalogue.service';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GeneralData } from '@app/shared/models/vehicle.interface';
import { ToastrService } from 'ngx-toastr';

enum Action {
  EDIT = 'edit',
  NEW = 'new',
}

@Component({
  selector: 'app-generaldata',
  templateUrl: './generaldata.component.html',
  styleUrls: ['./generaldata.component.scss']
})
export class GeneraldataComponent implements OnInit {
  actionTODO = Action.NEW;
  generaldataform:any;
  message: any;
  idvehicle: any;
  idGeneralData: number = 0;
  m: any;
  ok: boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private catalogueSvc:CatalogueService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<GeneraldataComponent>
  ) {}

  ngOnInit(): void {
    this.GeneralDataForm();
    this.idvehicle =this.data.vehicle.idvehicle;
    if(this.data.vehicle.idvehicle){
      this.catalogueSvc.GetGeneralDataVehicle(this.idvehicle).subscribe(
        (res: any)=>{
          if(res.length){
            const generaldata: GeneralData = res[0];
            this.actionTODO = Action.EDIT;
            this.idGeneralData = generaldata.idgeneraldata;
            this.generaldataform.patchValue({
              nkmmonth: generaldata.nkmmonth,
              ntravelkmmonth: generaldata.ntravelkmmonth,
              adminexpensesmonth: generaldata.adminexpensesmonth,
              basicservicesmonth: generaldata.basicservicesmonth,
              garage: generaldata.garage,
              permitsqualifications: generaldata.permitsqualifications,
              vehiclevalue: generaldata.vehiclevalue,
              idvehicle: generaldata.idvehicle,
            });
            this.generaldataform.updateValueAndValidity();
          }else{
            this.actionTODO = Action.NEW;
          }
        },
        (err) => console.error(err)
      );
    }
  }

  GeneralDataForm(): void {
    this.generaldataform = this.fb.group({
      nkmmonth: ['',[Validators.required,Validators.min(1)]],
      ntravelkmmonth: ['',[Validators.required,Validators.min(1)]],
      adminexpensesmonth: ['',[Validators.required,Validators.min(1)]],
      basicservicesmonth: ['',[Validators.required,Validators.min(1)]],
      garage: ['',[Validators.required,Validators.min(1)]],
      permitsqualifications: ['',[Validators.required,Validators.min(1)]],
      vehiclevalue: ['',[Validators.required,Validators.min(1)]],
      idvehicle: ['',[]],
    });
  }

  save():void{
    if(this.generaldataform.invalid){
      return;
    }

    this.generaldataform.patchValue({
      idvehicle: this.idvehicle,
    });
    this.generaldataform.updateValueAndValidity();

    const data = this.generaldataform.value;

    if(this.actionTODO === Action.NEW ) {
      this.catalogueSvc.PostGeneralData(data).subscribe(
        (res:any)=>{
          this.m = res;
          this.ok = true;
          this.toastr.success(this.m.message, 'Creado',{
            timeOut: 3000,
          });
          this.dialogRef.close();
        }
      );
    }

    if(this.actionTODO === Action.EDIT ) {
      this.catalogueSvc.PutGeneralData(data,this.idGeneralData).subscribe(
        (res: any)=>{
          this.m = res;
          this.ok = true;
          this.toastr.warning(this.m.message, 'Actualizado',{
            timeOut: 3000,
          });
          this.dialogRef.close(true);
        }
      );
      this.actionTODO = Action.NEW;
    }
  }

  isvalid(field: string): boolean {
    const value = this.generaldataform.get(field);
    return (value.invalid && (value.dirty || value.touched));
  }

  messageerror(field: string): string {
    const { errors } = this.generaldataform.get(field);

    let minlength = errors?.minlength?.requiredLength;
    const messages:any = {
      required: 'Campo es requerido',
      min: 'En valor no puede ser menor a 1',
      pattern: 'Solo Números enteros',
      minlenght: `El valor Ingresado es menor a ${ minlength } caracteres`,

    };
    const errorkey = Object.keys(errors).find(Boolean);
    return messages[errorkey || ''];
  }
}
