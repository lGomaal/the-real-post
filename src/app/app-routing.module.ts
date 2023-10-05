import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/main/main.module').then(m => m.MainModule),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'stand-alone',
    loadChildren: () =>
      import('./modules/stand-alone-pages/stand-alone-pages.module').then(
        m => m.StandAlonePagesModule,
      ),
  },
  {
    path: '**',
    redirectTo: 'stand-alone/error-404',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
