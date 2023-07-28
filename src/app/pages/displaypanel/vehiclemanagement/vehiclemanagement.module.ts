import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehiclemanagementRoutingModule } from './vehiclemanagement-routing.module';
import { VehiclemanagementComponent } from './vehiclemanagement.component';
import { MaterialModule } from '@app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    VehiclemanagementComponent
  ],
  imports: [
    CommonModule,
    VehiclemanagementRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class VehiclemanagementModule { }
