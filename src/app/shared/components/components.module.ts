import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from './side-bar/side-bar.component';
import { HeaderComponent } from './header/header.component';
import { ModalProfileComponent } from './modal-profile/modal-profile.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TableContasComponent } from './table-contas/table-contas.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { Dialog } from 'primeng/dialog';
import { Ripple } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { FileUpload } from 'primeng/fileupload';
import { SelectModule } from 'primeng/select';
import { Tag } from 'primeng/tag';
import { RadioButton } from 'primeng/radiobutton';
import { Rating } from 'primeng/rating';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputNumber } from 'primeng/inputnumber';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ProductService } from '../services/productservice';
import { TableTransacoesComponent } from './table-transacoes/table-transacoes.component';
import { ModalAdicionarComponent } from './modal-adicionar/modal-adicionar.component';
import { Select } from 'primeng/select';

@NgModule({
  declarations: [
    SideBarComponent,
    HeaderComponent,
    ModalProfileComponent,
    TableContasComponent,
    TableTransacoesComponent,
    ModalAdicionarComponent,
  ],
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    TableModule,
    Dialog,
    Ripple,
    SelectModule,
    ToastModule,
    ToolbarModule,
    ConfirmDialog,
    InputTextModule,
    TextareaModule,
    CommonModule,
    FileUpload,
    Tag,
    RadioButton,
    Rating,
    InputTextModule,
    FormsModule,
    InputNumber,
    IconFieldModule,
    InputIconModule,
    ButtonModule,
    Select,
    ReactiveFormsModule,
  ],
  exports: [
    SideBarComponent,
    HeaderComponent,
    TableContasComponent,
    TableTransacoesComponent,
    ModalAdicionarComponent,
  ],
  providers: [MessageService, ConfirmationService, ProductService],
})
export class ComponentsModule {}
