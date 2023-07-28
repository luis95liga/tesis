import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@app/material.module';
import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeesComponent } from './employees.component';
import { DocumentsComponent } from './components/documents/documents.component';
import { FormComponent } from './components/form/form.component';
import { ViewComponent } from './components/view/view.component';


@NgModule({
  declarations: [
    EmployeesComponent,
    DocumentsComponent,
    FormComponent,
    ViewComponent
  ],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
  ]
})
export class EmployeesModule { }
