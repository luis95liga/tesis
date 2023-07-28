import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DestinationsRoutingModule } from './destinations-routing.module';
import { DestinationsComponent } from './destinations.component';
import { MapsComponent } from './components/maps/maps.component';
import { MaterialModule } from '@app/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';


@NgModule({
  declarations: [
    DestinationsComponent,
    MapsComponent
  ],
  imports: [
    CommonModule,
    DestinationsRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    GooglePlaceModule,
  ]
})
export class DestinationsModule { }
