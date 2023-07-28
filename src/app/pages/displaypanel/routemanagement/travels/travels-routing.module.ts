import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TravelsComponent } from './travels.component';

const routes: Routes = [
  {
    path: '',
    component: TravelsComponent
  },
  {
    path: 'travel',
    loadChildren: () => import('./travel/travel.module').then(m => m.TravelModule)
  },
  {
    path: 'travel/:id',
    loadChildren: () => import('./travel/travel.module').then(m => m.TravelModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TravelsRoutingModule { }
