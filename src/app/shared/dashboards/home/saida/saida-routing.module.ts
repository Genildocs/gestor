import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SaidaComponent } from './saida.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: SaidaComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class SaidaRoutingModule {}
