import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehicleUseRoutingModule } from './vehicle-use-routing.module';
import { VehicleUseComponent } from './vehicle-use.component';
import { MaterialModule } from '@app/material.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    VehicleUseComponent
  ],
  imports: [
    CommonModule,
    VehicleUseRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class VehicleUseModule { }
