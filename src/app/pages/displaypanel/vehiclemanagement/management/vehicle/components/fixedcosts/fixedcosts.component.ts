import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CatalogueService } from '@app/pages/displaypanel/services/vehicle/catalogue.service';
import { FixedCosts } from '@app/shared/models/vehicle.interface';
import { ToastrService } from 'ngx-toastr';

enum Action {
  EDIT = 'edit',
  NEW = 'new',
}

@Component({
  selector: 'app-fixedcosts',
  templateUrl: './fixedcosts.component.html',
  styleUrls: ['./fixedcosts.component.scss']
})
export class FixedcostsComponent implements OnInit {

  fixedcostsform: any;
  actionTODO = Action.NEW;
  idvehicle: any;
  idfixedcosts: number = 0;
  m: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private catalogueSvc:CatalogueService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<FixedcostsComponent>
    ) {}
  ngOnInit(): void {
    this.FixedCostsFom();
    this.List();
  }

  FixedCostsFom(): void {
    this.fixedcostsform = this.fb.group({
      vehicleRegistration: [,[Validators.required, Validators.min(0)]],
      insurance: [,[Validators.required, Validators.min(0)]],
      technicalReviews: [,[Validators.required, Validators.min(0)]],
      financialCosts: [,[Validators.required, Validators.min(0)]],
      satelliteTracking: [,[Validators.required, Validators.min(0)]],
      andeanPolicy: [,[Validators.required, Validators.min(0)]],
      idvehicle: ['',[]],
    });
  }

  List(): void {
    this.idvehicle =this.data.vehicle.idvehicle;
    if(this.data.vehicle.idvehicle){
      this.catalogueSvc.GetFixedCostsVehicle(this.idvehicle).subscribe(
        (res: any)=>{
          if(res.length){
            const fixedcosts: FixedCosts = res[0];
            this.actionTODO = Action.EDIT;
            this.idfixedcosts = fixedcosts.idfixedcosts;
            this.fixedcostsform.patchValue({
              vehicleRegistration: fixedcosts.vehicleRegistration,
              insurance: fixedcosts.insurance,
              technicalReviews: fixedcosts.technicalReviews,
              financialCosts: fixedcosts.financialCosts,
              satelliteTracking: fixedcosts.satelliteTracking,
              andeanPolicy: fixedcosts.andeanPolicy,
              idvehicle: fixedcosts.idvehicle,
            });
            this.fixedcostsform.updateValueAndValidity();
          }else{
            this.actionTODO = Action.NEW;
          }
        },
        (err) => console.log(err)
      );
    }
  }

  save():void{
    if(this.fixedcostsform.invalid){
      return;
    }
    this.fixedcostsform.patchValue({
      idvehicle: this.idvehicle,
    });
    this.fixedcostsform.updateValueAndValidity();

    const data = this.fixedcostsform.value;
    if(this.actionTODO === Action.NEW ) {
      this.catalogueSvc.PostFixedCosts(data).subscribe(
        (res: any)=>{
          this.m = res;
          this.toastr.warning(this.m.message, 'Actualizado',{
            timeOut: 3000,
          });
          this.dialogRef.close(true);
        }
      );
    }
    if(this.actionTODO === Action.EDIT ) {
      this.catalogueSvc.PutFixedCosts(data,this.idfixedcosts).subscribe(
        (res: any)=>{
          this.m = res;
          this.toastr.warning(this.m.message, 'Actualizado',{
            timeOut: 3000,
          });
          this.dialogRef.close(true);
        }
      );
    }
  }

  isvalid(field: string): boolean {
    const value = this.fixedcostsform.get(field);
    return (value.invalid && (value.dirty || value.touched));
  }

  messageerror(field: string): string {
    const { errors } = this.fixedcostsform.get(field);

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
