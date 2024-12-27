import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
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
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit() {
    const formData = this.loginForm.value;
    this.loading = true;
    this.authService.loginUser(formData).subscribe({
      next: (response: any) => {
        this.loading = false;
        const { token } = response.status;
        this.authService.saveToken(token);
        this.router.navigate(['dashboard/home']);
      },
      error: (error) => {
        this.loading = false;
        this.isValidFormSubmitted = true;
        setTimeout(() => {
          this.isValidFormSubmitted = false;
        }, 3000);
        console.error('Error registering user:', error);
      },
    });
  }
}
