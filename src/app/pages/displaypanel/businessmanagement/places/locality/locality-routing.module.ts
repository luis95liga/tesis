import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocalityComponent } from './locality.component';

const routes: Routes = [{ path: '', component: LocalityComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocalityRoutingModule { }
