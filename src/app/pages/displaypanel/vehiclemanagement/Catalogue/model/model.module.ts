import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModelRoutingModule } from './model-routing.module';
import { ModelComponent } from './model.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@app/material.module';
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
  declarations: [
    ModelComponent
  ],
  imports: [
    CommonModule,
    ModelRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    MatPaginatorModule,
  ]
})
export class ModelModule { }
