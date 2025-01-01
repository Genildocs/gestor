import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EntradaComponent } from './entrada.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: EntradaComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class EntradaRoutingModule {}
