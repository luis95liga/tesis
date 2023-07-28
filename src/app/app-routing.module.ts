import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckAdminGuard } from '@shared/guard/check-admin.guard';
import { CheckLoginGuard } from '@shared/guard/check-login.guard';
import { CheckUserGuard } from '@shared/guard/check-user.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule),
    canActivate: [CheckLoginGuard],
  },
  {
    path: 'not-found',
    loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/auth/login/login.module').then(m => m.LoginModule),
    canActivate: [CheckLoginGuard],
  },
  {
    path: 'displaypanel',
    loadChildren: () => import('./pages/displaypanel/displaypanel.module').then(m => m.DisplaypanelModule),
    canActivate: [CheckUserGuard],
  },
  { path: 'admin', loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule) },
  {
    path: 'reset-password/:encoded_pk/:token',
    loadChildren: () => import('./pages/auth/reset-password/reset-password.module').then(m => m.ResetPasswordModule),
    canActivate: [CheckLoginGuard],
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./pages/auth/forgotpassword/forgotpassword.module').then(m => m.ForgotpasswordModule),
    canActivate: [CheckLoginGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
