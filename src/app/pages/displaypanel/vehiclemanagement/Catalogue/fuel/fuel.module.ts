import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FuelRoutingModule } from './fuel-routing.module';
import { FuelComponent } from './fuel.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@app/material.module';


@NgModule({
  declarations: [
    FuelComponent
  ],
  imports: [
    CommonModule,
    FuelRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
  ]
})
export class FuelModule { }
