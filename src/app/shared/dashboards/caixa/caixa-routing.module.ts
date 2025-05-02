import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CaixaComponent } from './caixa.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: CaixaComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class CaixaRoutingModule {}
