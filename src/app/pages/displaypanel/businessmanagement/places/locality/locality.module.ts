import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@app/material.module';
import { LocalityRoutingModule } from './locality-routing.module';
import { LocalityComponent } from './locality.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MapsComponent } from './components/maps/maps.component';
import { AgmCoreModule } from '@agm/core';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';

@NgModule({
  declarations: [
    LocalityComponent,
    MapsComponent
  ],
  imports: [
    CommonModule,
    LocalityRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    GooglePlaceModule
  ]
})
export class LocalityModule { }
