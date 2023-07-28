import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehicleRoutingModule } from './vehicle-routing.module';
import { VehicleComponent } from './vehicle.component';
import { MaterialModule } from '@app/material.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DocumentsComponent } from './components/documents/documents.component';
import { FormComponent } from './components/form/form.component';
import { ViewComponent } from './components/view/view.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AssigntrailerComponent } from './components/assigntrailer/assigntrailer.component';
import { FixedcostsComponent } from './components/fixedcosts/fixedcosts.component';
import { MaintenancecostsComponent } from './components/maintenancecosts/maintenancecosts.component';
import { ExtracostsComponent } from './components/extracosts/extracosts.component';
import { GeneraldataComponent } from './components/generaldata/generaldata.component';


@NgModule({
  declarations: [
    VehicleComponent,
    DocumentsComponent,
    FormComponent,
    ViewComponent,
    AssigntrailerComponent,
    FixedcostsComponent,
    MaintenancecostsComponent,
    ExtracostsComponent,
    GeneraldataComponent
  ],
  imports: [
    CommonModule,
    VehicleRoutingModule,
    MaterialModule,
    MatPaginatorModule,
    ReactiveFormsModule
  ]
})
export class VehicleModule { }
