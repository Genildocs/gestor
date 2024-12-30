import { Component } from '@angular/core';

@Component({
  selector: 'app-table-transacoes',
  templateUrl: './table-transacoes.component.html',
  styleUrl: './table-transacoes.component.css',
})
export class TableTransacoesComponent {
  isOpen: boolean = false;

  showModal() {
    document
      .getElementById('modal-adicionar')
      ?.classList.toggle('modalAdicionar');
  }
}
