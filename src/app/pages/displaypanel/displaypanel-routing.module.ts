import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisplaypanelComponent } from './displaypanel.component';

const routes: Routes = [
  {
    path: '',
    component: DisplaypanelComponent
  },
  {
    path: 'business',
    loadChildren: () => import('./businessmanagement/businessmanagement.module').then(m => m.BusinessmanagementModule)
  },
  {
    path: 'route',
    loadChildren: () => import('./routemanagement/routemanagement.module').then(m => m.RoutemanagementModule)
  },
  {
    path: 'vehicle',
    loadChildren: () => import('./vehiclemanagement/vehiclemanagement.module').then(m => m.VehiclemanagementModule)
  },
  {
    path: 'client',
    loadChildren: () =>
    import('./clientmanagement/clientmanagement.module').then(m => m.ClientmanagementModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DisplaypanelRoutingModule { }
