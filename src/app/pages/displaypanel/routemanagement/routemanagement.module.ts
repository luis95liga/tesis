import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoutemanagementRoutingModule } from './routemanagement-routing.module';
import { RoutemanagementComponent } from './routemanagement.component';


@NgModule({
  declarations: [
    RoutemanagementComponent
  ],
  imports: [
    CommonModule,
    RoutemanagementRoutingModule
  ]
})
export class RoutemanagementModule { }
