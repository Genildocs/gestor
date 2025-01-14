import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from '../components/dashboard-layout/dashboard-layout.component';
import { HomeComponent } from './home/home.component';
import { TransacoesComponent } from './transacoes/transacoes.component';
import { ContasComponent } from './contas/contas.component';
import { AuthGuard } from '../services/auth.guard';
const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'contas',
        component: ContasComponent,
      },
      {
        path: 'transacoes',
        component: TransacoesComponent,
      },

      {
        path: 'produtos',
        loadChildren: () =>
          import('./produtos/produtos-routing.module').then(
            (m) => m.ProdutosRoutingModule
          ),
      },

      {
        path: 'clientes',
        loadChildren: () =>
          import('./clientes/clientes-routing.module').then(
            (m) => m.ClientesRoutingModule
          ),
      },

      {
        path: 'calendar',
        loadChildren: () =>
          import('./calendar/calendar-routing.module').then(
            (m) => m.CalendarRoutingModule
          ),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./profile/profile-routing.module').then(
            (m) => m.ProfileRoutingModule
          ),
      },

      {
        path: 'caixa',
        loadChildren: () =>
          import('./caixa/caixa-routing.module').then(
            (m) => m.CaixaRoutingModule
          ),
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('./settings/settings-routing.module').then(
            (m) => m.SettingsRoutingModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardsRoutingModule {}
