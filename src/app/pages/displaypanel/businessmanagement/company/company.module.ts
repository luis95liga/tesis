import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@app/material.module';
import { CompanyRoutingModule } from './company-routing.module';
import { CompanyComponent } from './company.component';
import { AccountsComponent } from './components/accounts/accounts.component';
import { DocumentsComponent } from './components/documents/documents.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CompanyComponent,
    AccountsComponent,
    DocumentsComponent
  ],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class CompanyModule { }
