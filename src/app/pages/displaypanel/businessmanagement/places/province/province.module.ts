import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@app/material.module';
import { ProvinceRoutingModule } from './province-routing.module';
import { ProvinceComponent } from './province.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
  declarations: [
    ProvinceComponent
  ],
  imports: [
    CommonModule,
    ProvinceRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    MatPaginatorModule,
  ]
})
export class ProvinceModule { }
