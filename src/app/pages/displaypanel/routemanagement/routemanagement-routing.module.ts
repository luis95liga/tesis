import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutemanagementComponent } from './routemanagement.component';

const routes: Routes = [{ path: '', component: RoutemanagementComponent }, { path: 'cellars', loadChildren: () => import('./places/cellars/cellars.module').then(m => m.CellarsModule) }, { path: 'destinations', loadChildren: () => import('./places/destinations/destinations.module').then(m => m.DestinationsModule) }, { path: 'travels', loadChildren: () => import('./travels/travels.module').then(m => m.TravelsModule) }, { path: 'tatulation', loadChildren: () => import('./tatulation/tatulation.module').then(m => m.TatulationModule) }, { path: 'routes', loadChildren: () => import('./routes/routes.module').then(m => m.RoutesModule) }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutemanagementRoutingModule { }
