import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { Ripple } from 'primeng/ripple';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    Toast,
    ButtonModule,
    Ripple,
    ToastModule,
    RippleModule,
    DialogModule,
  ],
  providers: [MessageService],
})
export class AuthModule {}
