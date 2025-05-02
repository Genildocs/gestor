import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
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
    const formData = this.loginForm.value;
    this.loading = true;
    this.authService.loginUser(formData.email, formData.password).subscribe({
      next: (response: { token: string; username: string }) => {
        this.loading = false;
        // const { token } = response;
        // console.log(response);
        // this.authService.saveToken(token);
        this.router.navigate(['dashboard/home']);
      },
      error: (error) => {
        this.loading = false;
        this.isValidFormSubmitted = true;
        this.show();
        setTimeout(() => {
          this.isValidFormSubmitted = false;
        }, 3000);
        console.error('Error registering user:', error);
      },
      complete: () => {
        console.log('Login concluido');
      },
    });
  }
}
