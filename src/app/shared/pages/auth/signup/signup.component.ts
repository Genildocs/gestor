import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../../services/auth.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
     signupForm: FormGroup;
     loading: boolean = false;
     isValidFormSubmitted = false;
     resErro: { error: string } = { error: '' };
     error: string = '';
     constructor(
       private fb: FormBuilder,
       private authService: AuthService,
       private messageService: MessageService,
       private router: Router
     ) {
       this.signupForm = this.fb.group({
         email: ['', [Validators.required, Validators.email]],
         username: ['', Validators.required],
         password: ['', [Validators.required, Validators.minLength(8)]],
       });
     }
     showSuccess() {
       this.messageService.add({
         severity: 'success',
         summary: 'Success',
         detail: 'Usuario cadastrado com sucesso',
       });
     }
     onSubmit() {
       this.isValidFormSubmitted = true;
       
       if (this.signupForm.invalid) {
         this.messageService.add({
           severity: 'error',
           summary: 'Erro',
           detail: 'Por favor, preencha todos os campos corretamente'
         });
         return;
       }

       const formData = this.signupForm.value;
       this.loading = true;
       
       this.authService.registerUser(formData.email).subscribe({
         next: (response) => {
           this.loading = false;
           this.messageService.add({
             severity: 'success',
             summary: 'Sucesso',
             detail: 'Cadastro realizado com sucesso!'
           });
           this.router.navigate(['/auth/login']);
         },
         error: (error) => {
           this.loading = false;
           this.isValidFormSubmitted = false;
           console.error('Erro ao registrar usuário:', error.error);
           this.messageService.add({
             severity: 'error',
             summary: 'Erro',
             detail: error.error?.message || 'Erro ao realizar cadastro. Tente novamente.'
           });
         }
       });
     }
}
