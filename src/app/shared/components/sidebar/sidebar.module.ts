import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar.component';
import { AppRoutingModule } from '@app/app-routing.module';
import { MaterialModule } from '@app/material.module';
import { UtilsService } from '@shared/service/utils.service';



@NgModule({
  declarations: [SidebarComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    MaterialModule,
  ],
  exports: [
    SidebarComponent
  ],
  providers: [
    UtilsService
  ],
})
export class SidebarModule { }
