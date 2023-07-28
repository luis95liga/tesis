import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@app/material.module';
import { CountryRoutingModule } from './country-routing.module';
import { CountryComponent } from './country.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
  declarations: [
    CountryComponent
  ],
  imports: [
    CommonModule,
    CountryRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    MatPaginatorModule,
  ]
})
export class CountryModule { }
