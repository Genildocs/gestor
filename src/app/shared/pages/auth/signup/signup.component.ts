import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  signupForm: FormGroup;
  loading: boolean = false;
  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit() {
    const formData = this.signupForm.value;
    this.loading = true;
    this.authService.registerUser(formData).subscribe({
      next: (response) => {
        this.loading = false;
        console.log('User registered successfully:', response);
      },
      error: (error) => {
        this.loading = false;
        console.error('Error registering user:', error);
      },
    });
  }
}
