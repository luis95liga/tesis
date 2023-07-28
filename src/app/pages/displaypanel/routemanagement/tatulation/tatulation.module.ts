import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TatulationRoutingModule } from './tatulation-routing.module';
import { TatulationComponent } from './tatulation.component';
import { MaterialModule } from '@app/material.module';
import { FormComponent } from './components/form/form.component';
import { ViewComponent } from './components/view/view.component';
import { FreightComponent } from './components/freight/freight.component';
import { BillsComponent } from './components/bills/bills.component';


@NgModule({
  declarations: [
    TatulationComponent,
    FormComponent,
    ViewComponent,
    FreightComponent,
    BillsComponent
  ],
  imports: [
    CommonModule,
    TatulationRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class TatulationModule { }
