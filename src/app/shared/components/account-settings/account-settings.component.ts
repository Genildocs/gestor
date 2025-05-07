import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrl: './account-settings.component.css',
  providers: [MessageService],
})
export class AccountSettingsComponent implements OnInit {
  profileForm: FormGroup;
  passwordForm: FormGroup;
  languages = ['Português', 'English', 'Español'];
  selectedLanguage = 'Português';
  darkMode = false;
  notifications = true;

  constructor(private fb: FormBuilder, private messageService: MessageService) {
    this.profileForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      telefone: [
        '',
        [Validators.required, Validators.pattern(/^\(\d{2}\) \d{5}-\d{4}$/)],
      ],
      dataNascimento: [null, Validators.required],
    });

    this.passwordForm = this.fb.group({
      senhaAtual: ['', [Validators.required, Validators.minLength(6)]],
      novaSenha: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    // Carregar dados do usuário
    this.carregarDadosUsuario();
  }

  private carregarDadosUsuario(): void {
    // Simular carregamento de dados
    this.profileForm.patchValue({
      nome: 'João Silva',
      email: 'joao@email.com',
      telefone: '(11) 99999-9999',
      dataNascimento: new Date('1990-01-01'),
    });
  }

  salvarPerfil(): void {
    if (this.profileForm.valid) {
      // Simular salvamento
      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Perfil atualizado com sucesso!',
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Por favor, preencha todos os campos corretamente.',
      });
    }
  }

  atualizarSenha(): void {
    if (this.passwordForm.valid) {
      // Simular atualização de senha
      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Senha atualizada com sucesso!',
      });
      this.passwordForm.reset();
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Por favor, preencha todos os campos corretamente.',
      });
    }
  }

  toggleDarkMode(): void {
    this.darkMode = !this.darkMode;
    // Implementar lógica de tema
  }

  toggleNotifications(): void {
    this.notifications = !this.notifications;
    // Implementar lógica de notificações
  }

  alterarIdioma(idioma: string): void {
    this.selectedLanguage = idioma;
    // Implementar lógica de idioma
  }
}
