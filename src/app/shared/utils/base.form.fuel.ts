import { FormBuilder, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class  BaseFormFuel {

  constructor(
    private fb: FormBuilder
    ) {
      this.init();
    }

    fuelform: any;

    init(): void {
      this.fuelform = this.fb.group({
        type_fuel: [{value: '', disabled: true},[Validators.required, Validators.minLength(4)]],
        performance: [{value: '', disabled: true},[Validators.required, Validators.min(1)]],
      });
    }

    fromdisable(is: boolean): void {
      if(!is){
        this.fuelform.controls['type_fuel'].disable();
        this.fuelform.controls['performance'].disable();
      }else{
        this.fuelform.controls['type_fuel'].enable();
        this.fuelform.controls['performance'].enable();
      }
    }


    isValidField(field: string): boolean {
      return (this.fuelform.get(field).invalid && (this.fuelform.get(field).dirty || this.fuelform.get(field).touched));
    }

    errorMessage(field: string): string {
      const { errors } = this.fuelform.get(field);
      let minlenght = errors?.minlength?.requiredLength;
      if (errors) {
        const messages:any = {
          required: 'el campo es requerido',
          min: 'El Campo no puede ser menor a 1',
          minlength: `el valor ingesado es menor a ${ minlenght } carateres`,
        };
      const errorkey = Object.keys(errors).find(Boolean);
      return messages[errorkey|| ''];
      }
      return '';
    }
}
