import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrailerRoutingModule } from './trailer-routing.module';
import { TrailerComponent } from './trailer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MaterialModule } from '@app/material.module';
import { FormComponent } from './components/form/form.component';
import { ViewComponent } from './components/view/view.component';


@NgModule({
  declarations: [
    TrailerComponent,
    FormComponent,
    ViewComponent
  ],
  imports: [
    CommonModule,
    TrailerRoutingModule,
    MaterialModule,
    MatPaginatorModule,
    ReactiveFormsModule
  ]
})
export class TrailerModule { }
