import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehicleTypeRoutingModule } from './vehicle-type-routing.module';
import { VehicleTypeComponent } from './vehicle-type.component';
import { MaterialModule } from '@app/material.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    VehicleTypeComponent
  ],
  imports: [
    CommonModule,
    VehicleTypeRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class VehicleTypeModule { }
