import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContasComponent } from './home/contas/contas.component';
import { TransacoesComponent } from './home/transacoes/transacoes.component';
import { ProfileComponent } from './home/profile/profile.component';

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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardsRoutingModule {}
