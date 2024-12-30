import { Component, OnInit } from '@angular/core';
import { Tipo } from '../../interfaces/contas';

@Component({
  selector: 'app-modal-adicionar',
  templateUrl: './modal-adicionar.component.html',
  styleUrl: './modal-adicionar.component.css',
})
export class ModalAdicionarComponent implements OnInit {
  tipos!: Tipo[];

  selectedTipo: Tipo | undefined;
  ngOnInit(): void {
    this.tipos = [
      {
        nome: 'Credito',
        code: 'Cdt',
      },
      {
        nome: 'Debito',
        code: 'Dbt',
      },
      {
        nome: 'Pix',
        code: 'Pix',
      },
      {
        nome: 'Receber',
        code: 'Rcv',
      },
      {
        nome: 'Pagar',
        code: 'Pgr',
      },
    ];
  }
  closeModal() {
    document.getElementById('modal-adicionar')?.classList.add('modalAdicionar');
  }
}
