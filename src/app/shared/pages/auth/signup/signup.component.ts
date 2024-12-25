import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const formData = this.signupForm.value;
      this.apiService.registerUser(formData).subscribe({
        next: (response) => {
          console.log('User registered successfully:', response);
        },
        error: (error) => {
          console.error('Error registering user:', error);
        },
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
