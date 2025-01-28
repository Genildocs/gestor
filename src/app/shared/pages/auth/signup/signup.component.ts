import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  //   signupForm: FormGroup;
  //   loading: boolean = false;
  //   isValidFormSubmitted = false;
  //   resErro: { error: string } = { error: '' };
  //   error: string = '';
  //   constructor(
  //     private fb: FormBuilder,
  //     private authService: AuthService,
  //     private messageService: MessageService
  //   ) {
  //     this.signupForm = this.fb.group({
  //       email: ['', [Validators.required, Validators.email]],
  //       username: ['', Validators.required],
  //       password: ['', [Validators.required, Validators.minLength(8)]],
  //     });
  //   }
  //   showSuccess() {
  //     this.messageService.add({
  //       severity: 'success',
  //       summary: 'Success',
  //       detail: 'Usuario cadastrado com sucesso',
  //     });
  //   }
  //   onSubmit() {
  //     const formData = this.signupForm.value;
  //     this.loading = true;
  //     this.authService.registerUser(formData).subscribe({
  //       next: (response) => {
  //         this.loading = false;
  //         this.showSuccess();
  //         console.log('User registered successfully:', response);
  //       },
  //       error: (error) => {
  //         this.loading = false;
  //         this.isValidFormSubmitted = true;
  //         setTimeout(() => {
  //           this.isValidFormSubmitted = false;
  //         }, 3000);
  //         console.error('Error registering user:', error.error);
  //         this.resErro = { error: error.error };
  //         this.error = Object.values(this.resErro.error)[0];
  //       },
  //     });
  //   }
}
