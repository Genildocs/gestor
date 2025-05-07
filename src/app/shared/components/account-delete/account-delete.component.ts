import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-account-delete',
  templateUrl: './account-delete.component.html',
  styleUrl: './account-delete.component.css',
  providers: [MessageService],
})
export class AccountDeleteComponent {
  deleteForm: FormGroup;
  confirmacao = false;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private router: Router
  ) {
    this.deleteForm = this.fb.group({
      senha: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  excluirConta(): void {
    if (this.deleteForm.valid && this.confirmacao) {
      // Simular exclusão de conta
      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Conta excluída com sucesso!',
      });

      // Redirecionar para a página inicial após 2 segundos
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 2000);
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail:
          'Por favor, confirme sua senha e marque a caixa de confirmação.',
      });
    }
  }

  contatarSuporte(): void {
    // Implementar lógica de contato com suporte
    this.messageService.add({
      severity: 'info',
      summary: 'Suporte',
      detail: 'Nossa equipe de suporte entrará em contato em breve.',
    });
  }
}
