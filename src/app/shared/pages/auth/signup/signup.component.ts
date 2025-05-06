import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  loading: boolean = false;
  isValidFormSubmitted = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.signupForm = this.fb.group(
      {
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(20),
          ],
        ],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
            ),
          ],
        ],
      },
      {
        validators: this.passwordMatchValidator,
      }
    );
  }

  private passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');

    if (password?.value !== confirmPassword?.value) {
      confirmPassword?.setErrors({ passwordMismatch: true });
    } else {
      confirmPassword?.setErrors(null);
    }
  }

  getErrorMessage(controlName: string): string {
    const control = this.signupForm.get(controlName);

    if (!control?.errors || !this.isValidFormSubmitted) {
      return '';
    }

    if (control.errors['required']) {
      return 'Este campo é obrigatório';
    }

    if (control.errors['email']) {
      return 'Email inválido';
    }

    if (control.errors['minlength']) {
      return `Mínimo de ${control.errors['minlength'].requiredLength} caracteres`;
    }

    if (control.errors['maxlength']) {
      return `Máximo de ${control.errors['maxlength'].requiredLength} caracteres`;
    }

    if (control.errors['pattern']) {
      return 'A senha deve conter letras maiúsculas, minúsculas, números e caracteres especiais';
    }

    if (control.errors['passwordMismatch']) {
      return 'As senhas não coincidem';
    }

    return 'Campo inválido';
  }

  private showMessage(
    severity: string,
    summary: string,
    detail: string,
    life: number = 3000
  ): void {
    this.messageService.add({
      severity,
      summary,
      detail,
      life,
      sticky: severity === 'success',
    });
  }

  private showSuccessNotification(username: string): void {
    this.messageService.clear();
    this.showMessage(
      'success',
      'Conta criada com sucesso!',
      `Bem-vindo(a) ${username}! Você será redirecionado para a página de login.`,
      5000
    );
  }

  onSubmit(): void {
    this.isValidFormSubmitted = true;

    if (this.signupForm.invalid) {
      this.showMessage(
        'error',
        'Erro',
        'Por favor, preencha todos os campos corretamente'
      );
      return;
    }

    const formData = this.signupForm.value;
    this.loading = true;

    this.authService.registerUser(formData).subscribe({
      next: () => {
        this.loading = false;
        this.showSuccessNotification(formData.username);

        // Aguarda 3 segundos antes de redirecionar
        setTimeout(() => {
          this.router.navigate(['/auth/login']);
        }, 3000);
      },
      error: (error) => {
        this.loading = false;
        this.isValidFormSubmitted = false;
        console.error('Erro ao registrar usuário:', error);
        this.showMessage(
          'error',
          'Erro',
          error.error?.message || 'Erro ao realizar cadastro. Tente novamente.'
        );
      },
    });
  }
}
