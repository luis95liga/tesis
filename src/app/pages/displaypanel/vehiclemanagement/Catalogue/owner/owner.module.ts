import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OwnerRoutingModule } from './owner-routing.module';
import { OwnerComponent } from './owner.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@app/material.module';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [
    OwnerComponent
  ],
  imports: [
    CommonModule,
    OwnerRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    MatPaginatorModule,
  ]
})
export class OwnerModule { }
