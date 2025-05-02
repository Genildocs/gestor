import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  loading: boolean = false;
  isValidFormSubmitted = false;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
  show() {
    this.messageService.add({
      severity: 'error',
      summary: 'Error de login',
      detail: 'Email ou senha inválidos',
    });
  }
  onSubmit() {
    this.isValidFormSubmitted = true;
    
    if (this.loginForm.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Por favor, preencha todos os campos corretamente'
      });
      return;
    }

    const formData = this.loginForm.value;
    this.loading = true;
    
    this.authService.loginUser(formData.email, formData.password).subscribe({
      next: () => {
        this.loading = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Login realizado com sucesso!'
        });
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.loading = false;
        this.isValidFormSubmitted = false;
        console.error('Erro ao fazer login:', error.error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: error.error?.message || 'Erro ao fazer login. Tente novamente.'
        });
      }
    });
  }
}
