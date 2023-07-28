import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientmanagementRoutingModule } from './clientmanagement-routing.module';
import { ClientmanagementComponent } from './clientmanagement.component';


@NgModule({
  declarations: [
    ClientmanagementComponent
  ],
  imports: [
    CommonModule,
    ClientmanagementRoutingModule
  ]
})
export class ClientmanagementModule { }
