import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientmanagementComponent } from './clientmanagement.component';

const routes: Routes = [{ path: '', component: ClientmanagementComponent }, { path: 'clients', loadChildren: () => import('./clients/clients.module').then(m => m.ClientsModule) }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientmanagementRoutingModule { }
