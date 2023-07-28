import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@app/material.module';
import { DisplaypanelRoutingModule } from './displaypanel-routing.module';
import { DisplaypanelComponent } from './displaypanel.component';
import { UserprofileComponent } from './components/userprofile/userprofile.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DisplaypanelComponent,
    UserprofileComponent
  ],
  imports: [
    CommonModule,
    DisplaypanelRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class DisplaypanelModule { }
