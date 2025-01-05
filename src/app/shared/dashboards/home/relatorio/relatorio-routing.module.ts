import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RelatorioComponent } from './relatorio.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: RelatorioComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class RelatorioRoutingModule {}
