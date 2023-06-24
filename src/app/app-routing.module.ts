import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './public/components/error-page/error-page.component';
import { BaseComponent } from './public/components/layout/base/base.component';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginGuard } from './core/guards/login.guard';

const routes: Routes = [
  { path:'auth', loadChildren: () => import('./public/components/auth/auth.module').then(m => m.AuthModule) },
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
        path: 'calendar',
        loadChildren: () => import('./public/components/calendar/calendar.module').then(m => m.CalendarModule)
      },
      {
        path: 'disqualification',
        loadChildren: () => import('./public/components/disqualification/disqualification.module').then(m => m.DisqualificationModule)
      },
      {
        path: 'time-zone',
        loadChildren: () => import('./public/components/time-zone/time-zone.module').then(m => m.TimeZoneModule)
      },
      {
        path: 'installers',
        loadChildren: () => import('./public/components/installers/installers.module').then(m => m.InstallersModule)
      },
      {
        path: 'energy-providers',
        loadChildren: () => import('./public/components/energy-providers/energy-providers.module').then(m => m.EnergyProvidersModule)
      },
      {
        path: 'state',
        loadChildren: () => import('./public/components/state/state.module').then(m => m.StateModule)
      },
      {
        path: 'providers',
        loadChildren: () => import('./public/components/providers/providers.module').then(m => m.ProvidersModule)
      },
      {
        path: 'type-roof',
        loadChildren: () => import('./public/components/type-roof/type-roof.module').then(m => m.TypeRoofModule)
      },
      {
        path: 'modulos',
        loadChildren: () => import('./public/components/modulos/modulos.module').then(m => m.ModulosModule)
      },
      {
        path: 'sales-rep',
        loadChildren: () => import('./public/components/sales-rep/sales-rep.module').then(m => m.SalesRepModule)
      },
      {
        path: 'appointment-outcome',
        loadChildren: () => import('./public/components/appointment-outcome/appointment-outcome.module').then(m => m.AppointmentOutcomeModule)
      },
      {
        path: 'rol-permiso',
        loadChildren: () => import('./public/components/rol-permiso/rol-permiso.module').then(m => m.RolPermisoModule)
      },
      {
        path: 'leaderboards',
        loadChildren: () => import('./public/components/leaderboards/leaderboards.module').then(m => m.LeaderboardsModule)
      },
      {
        path: 'leads',
        loadChildren: () => import('./public/components/leads/leads.module').then(m => m.LeadsModule)
      },
      {
        path: 'type-roof',
        loadChildren: () => import('./public/components/type-roof/type-roof.module').then(m => m.TypeRoofModule)
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
        path: 'assign-appmt',
        loadChildren: () => import('./public/components/assign-appmt/assign-appmt.module').then(m => m.AssignAppmtModule)
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
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
