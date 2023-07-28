import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AxesRoutingModule } from './axes-routing.module';
import { AxesComponent } from './axes.component';


@NgModule({
  declarations: [
    AxesComponent
  ],
  imports: [
    CommonModule,
    AxesRoutingModule
  ]
})
export class AxesModule { }
