import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LaborRoutingModule } from './labor-routing.module';
import { LaborComponent } from './labor.component';


@NgModule({
  declarations: [
    LaborComponent
  ],
  imports: [
    CommonModule,
    LaborRoutingModule
  ]
})
export class LaborModule { }
