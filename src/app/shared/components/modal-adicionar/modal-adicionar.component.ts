import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContaService } from '../../services/conta.service';
import { MessageService } from 'primeng/api';
import { Tipo } from '../../interfaces/contas';

@Component({
  selector: 'app-modal-adicionar',
  templateUrl: './modal-adicionar.component.html',
  styleUrl: './modal-adicionar.component.css',
})
export class ModalAdicionarComponent implements OnInit {
  contaForm: FormGroup;
  tipos!: Tipo[];

  selectedTipo: Tipo | undefined;
  constructor(
    private fb: FormBuilder,
    private contaService: ContaService,
    private messageService: MessageService
  ) {
    this.contaForm = this.fb.group({
      nome: ['', Validators.required],
      description: ['', Validators.required],
      valor: ['', Validators.required],
      vencimento: ['', Validators.required],
      selectedTipo: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.tipos = [
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
  showError() {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Erro ao criar conta.',
    });
  }
  onSubmit() {
    const contForm = this.contaForm.value;
    this.contaService.createConta(contForm).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (err) => {
        this.showError();
        const { error } = err.error;
        console.log(error);
      },
    });
  }

  closeModal() {
    document.getElementById('modal-adicionar')?.classList.add('modalAdicionar');
  }
}
