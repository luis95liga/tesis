import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehiclemanagementComponent } from './vehiclemanagement.component';

const routes: Routes = [
  {
    path: '', component: VehiclemanagementComponent
  },
  {
    path: 'vehicle',
    loadChildren: () => import('./management/vehicle/vehicle.module').then(m => m.VehicleModule)
  },
  {
    path: 'gps',
    loadChildren: () => import('./gps/gps/gps.module').then(m => m.GpsModule)
  },
  {
    path: 'axes',
    loadChildren: () => import('./Catalogue/axes/axes.module').then(m => m.AxesModule)
  },
  {
    path: 'fuel',
    loadChildren: () => import('./Catalogue/fuel/fuel.module').then(m => m.FuelModule)
  },
  {
    path: 'manufacturer',
    loadChildren: () => import('./Catalogue/manufacturer/manufacturer.module').then(m => m.ManufacturerModule)
  },
  {
    path: 'model',
    loadChildren: () => import('./Catalogue/model/model.module').then(m => m.ModelModule)
  },
  {
    path: 'owner',
    loadChildren: () => import('./Catalogue/owner/owner.module').then(m => m.OwnerModule)
  },
  {
    path: 'technical-data',
    loadChildren: () => import('./Catalogue/technical-data/technical-data.module').then(m => m.TechnicalDataModule)
  },
  {
    path: 'vehicle-use',
    loadChildren: () => import('./Catalogue/vehicle-use/vehicle-use.module').then(m => m.VehicleUseModule)
  },
  {
    path: 'vehicle-type',
    loadChildren: () => import('./Catalogue/vehicle-type/vehicle-type.module').then(m => m.VehicleTypeModule)
  },
  { path: 'trailer',
  loadChildren: () => import('./management/trailer/trailer.module').then(m => m.TrailerModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehiclemanagementRoutingModule { }
