import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from './employees.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeesComponent
  },
  {
    path: 'employee',
    loadChildren: () => import('./documet/employee/employee.module').then(m => m.EmployeeModule)
  },
  {
    path: 'type',
    loadChildren: () => import('./documet/type/type.module').then(m => m.TypeModule)
  },
  {
    path: 'period',
    loadChildren: () => import('./payment/period/period.module').then(m => m.PeriodModule)
  },
  {
    path: 'labor',
    loadChildren: () => import('./payment/labor/labor.module').then(m => m.LaborModule)
  },
  {
    path: 'type',
    loadChildren: () => import('./position/type/type.module').then(m => m.TypeModule)
  },
  {
    path: 'position',
    loadChildren: () => import('./position/position/position.module').then(m => m.PositionModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule { }
