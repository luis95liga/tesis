import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TechnicalDataComponent } from './technical-data.component';

const routes: Routes = [{ path: '', component: TechnicalDataComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TechnicalDataRoutingModule { }
