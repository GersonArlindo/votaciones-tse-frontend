import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './public/components/error-page/error-page.component';
import { BaseComponent } from './public/components/layout/base/base.component';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginGuard } from './core/guards/login.guard';

const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./public/components/auth/auth.module').then(m => m.AuthModule) },
  {
    path: 'error',
    component: ErrorPageComponent,
    data: {
      'type': 404,
      'title': 'Page Not Found',
      'desc': 'Oopps!! The page you were looking for doesn\'t exist.'
    }
  },
  {
    path: '',
    component: BaseComponent,
    canActivate: [LoginGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./public/components/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'general',
        loadChildren: () => import('./public/components/general/general.module').then(m => m.GeneralModule)
      },
      {
        path: 'language',
        loadChildren: () => import('./public/components/language/language.module').then(m => m.LanguageModule)
      },
      {
        path: 'modulos',
        loadChildren: () => import('./public/components/modulos/modulos.module').then(m => m.ModulosModule)
      },
      {
        path: 'rol-permiso',
        loadChildren: () => import('./public/components/rol-permiso/rol-permiso.module').then(m => m.RolPermisoModule)
      },
      {
        path: 'modulos',
        loadChildren: () => import('./public/components/modulos/modulos.module').then(m => m.ModulosModule)

      },
      {
        path: 'permisos',
        loadChildren: () => import('./public/components/permisos/permisos.module').then(m => m.PermisosModule)

      },
      {
        path: 'roles',
        loadChildren: () => import('./public/components/roles/roles.module').then(m => m.RolesModule)

      },
      {

        path: 'partidos-politicos',
        loadChildren: () => import('./public/components/partidos-politicos/partidos-politicos.module').then(m => m.PartidosPoliticosModule)
      },
      {
        path: 'persona-natural',
        loadChildren: () => import('./public/components/persona-natural/persona-natural.module').then(m => m.PersonaNaturalModule)

      },
      {
        path: 'candidatos',
        loadChildren: () => import('./public/components/candidato/candidato.module').then(m => m.CandidatoModule)
      },

      {
        path: 'jrv',
        loadChildren: () => import('./public/components/jrv/jrv.module').then(m => m.JrvModule)
      },
      {
        path: 'users',
        loadChildren: () => import('./public/components/users/users.module').then(m => m.UsersModule)
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ]
  },
  {
    path: 'error',
    component: ErrorPageComponent,
    data: {
      'type': 404,
      'title': 'Page Not Found',
      'desc': 'Oopps!! The page you were looking for doesn\'t exist.'
    }
  },
  {
    path: 'error/:type',
    component: ErrorPageComponent
  },
  { path: '**', redirectTo: 'error', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
