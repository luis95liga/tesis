import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TechnicalDataRoutingModule } from './technical-data-routing.module';
import { TechnicalDataComponent } from './technical-data.component';


@NgModule({
  declarations: [
    TechnicalDataComponent
  ],
  imports: [
    CommonModule,
    TechnicalDataRoutingModule
  ]
})
export class TechnicalDataModule { }
