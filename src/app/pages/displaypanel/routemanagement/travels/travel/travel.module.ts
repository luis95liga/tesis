import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TravelRoutingModule } from './travel-routing.module';
import { TravelComponent } from './travel.component';
import { GuideComponent } from './components/guide/guide.component';
import { MaterialModule } from '@app/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TrailerComponent } from './components/trailer/trailer.component';
import { GuideeditComponent } from './components/guideedit/guideedit.component';
import { GuidedetailComponent } from './components/guidedetail/guidedetail.component';


@NgModule({
  declarations: [
    TravelComponent,
    GuideComponent,
    TrailerComponent,
    GuideeditComponent,
    GuidedetailComponent
  ],
  imports: [
    CommonModule,
    TravelRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class TravelModule { }
