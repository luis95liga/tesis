import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@app/material.module';
import { BusinessmanagementRoutingModule } from './businessmanagement-routing.module';
import { BusinessmanagementComponent } from './businessmanagement.component';


@NgModule({
  declarations: [
    BusinessmanagementComponent
  ],
  imports: [
    CommonModule,
    BusinessmanagementRoutingModule,
    MaterialModule,
  ]
})
export class BusinessmanagementModule { }
