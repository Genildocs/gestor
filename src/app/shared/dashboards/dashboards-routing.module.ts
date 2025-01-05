import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContasComponent } from './home/contas/contas.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './home/profile/profile.component';
import { TransacoesComponent } from './home/transacoes/transacoes.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: 'contas',
        component: ContasComponent,
      },
      {
        path: 'transacoes',
        component: TransacoesComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'produtos',
        loadChildren: () =>
          import('./home/produtos/produtos-routing.module').then(
            (m) => m.ProdutosRoutingModule
          ),
      },

      {
        path: 'clientes',
        loadChildren: () =>
          import('./home/clientes/clientes-routing.module').then(
            (m) => m.ClientesRoutingModule
          ),
      },
      {
        path: 'caixa',
        loadChildren: () =>
          import('./home/caixa/caixa-routing.module').then(
            (m) => m.CaixaRoutingModule
          ),
      },
      {
        path: 'calendar',
        loadChildren: () =>
          import('./home/calendar/calendar-routing.module').then(
            (m) => m.CalendarRoutingModule
          ),
      },
      {
        path: 'relatorio',
        loadChildren: () =>
          import('./home/relatorio/relatorio-routing.module').then(
            (m) => m.RelatorioRoutingModule
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
