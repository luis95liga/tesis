import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TatulationComponent } from './tatulation.component';

const routes: Routes = [{ path: '', component: TatulationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TatulationRoutingModule { }
