import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CellarsRoutingModule } from './cellars-routing.module';
import { CellarsComponent } from './cellars.component';
import { MapsComponent } from './components/maps/maps.component';
import { MaterialModule } from '@app/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';

@NgModule({
  declarations: [
    CellarsComponent,
    MapsComponent
  ],
  imports: [
    CommonModule,
    CellarsRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    GooglePlaceModule,
  ]
})
export class CellarsModule { }
