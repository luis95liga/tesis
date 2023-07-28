import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusinessmanagementComponent } from './businessmanagement.component';

const routes: Routes = [
  {
    path: '', component: BusinessmanagementComponent
  },
  {
    path: 'company',
    loadChildren: () => import('./company/company.module').then(m => m.CompanyModule)
  },
  {
    path: 'locality',
    loadChildren: () => import('./places/locality/locality.module').then(m => m.LocalityModule)
  },
  {
    path: 'country',
    loadChildren: () => import('./places/country/country.module').then(m => m.CountryModule)
  },
  {
    path: 'province',
    loadChildren: () => import('./places/province/province.module').then(m => m.ProvinceModule)
  },
  {
    path: 'employees',
    loadChildren: () => import('./employees/employees.module').then(m => m.EmployeesModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessmanagementRoutingModule { }
