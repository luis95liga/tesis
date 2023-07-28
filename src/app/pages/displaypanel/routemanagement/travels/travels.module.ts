import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TravelsRoutingModule } from './travels-routing.module';
import { TravelsComponent } from './travels.component';
import { MaterialModule } from '@app/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MapComponent } from './components/map/map.component';


@NgModule({
  declarations: [
    TravelsComponent,
    MapComponent
  ],
  imports: [
    CommonModule,
    TravelsRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class TravelsModule { }
