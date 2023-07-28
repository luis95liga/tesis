import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehicleUseComponent } from './vehicle-use.component';

const routes: Routes = [{ path: '', component: VehicleUseComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehicleUseRoutingModule { }
