import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManufacturerRoutingModule } from './manufacturer-routing.module';
import { ManufacturerComponent } from './manufacturer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@app/material.module';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [
    ManufacturerComponent
  ],
  imports: [
    CommonModule,
    ManufacturerRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    MatPaginatorModule,
  ]
})
export class ManufacturerModule { }
