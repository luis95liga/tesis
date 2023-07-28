import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsComponent } from './clients.component';
import { FormComponent } from './components/form/form.component';
import { ViewComponent } from './components/view/view.component';
import { MaterialModule } from '@app/material.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ClientsComponent,
    FormComponent,
    ViewComponent
  ],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class ClientsModule { }
