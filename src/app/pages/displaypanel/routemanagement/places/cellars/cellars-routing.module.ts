import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CellarsComponent } from './cellars.component';

const routes: Routes = [{ path: '', component: CellarsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CellarsRoutingModule { }
