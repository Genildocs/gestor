import { NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  CommonModule,
  TitleCasePipe,
  DatePipe,
  UpperCasePipe,
} from '@angular/common';
import { SideBarComponent } from './side-bar/side-bar.component';
import { HeaderComponent } from './header/header.component';
import { ModalProfileComponent } from './modal-profile/modal-profile.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TableTransactionsComponent } from './table-transactions/table-transactions.component';
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
import { TableContasComponent } from './table-contas/table-contas.component';
import { ModalAdicionarComponent } from './modal-adicionar/modal-adicionar.component';
import { Select } from 'primeng/select';
import { Toast } from 'primeng/toast';
import { DatePickerModule } from 'primeng/datepicker';
import { ChartContasComponent } from './chart-contas/chart-contas.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { CardValoresComponent } from './card-valores/card-valores.component';
import { TableCaixaComponent } from './table-caixa/table-caixa.component';
import { MenuModule } from 'headlessui-angular';
import { ListboxModule } from 'headlessui-angular';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { AccountDeleteComponent } from './account-delete/account-delete.component';

@NgModule({
  declarations: [
    SideBarComponent,
    HeaderComponent,
    ModalProfileComponent,
    TableContasComponent,
    TableTransactionsComponent,
    ModalAdicionarComponent,
    ChartContasComponent,
    CardValoresComponent,
    TableCaixaComponent,
    DashboardLayoutComponent,
    AccountSettingsComponent,
    AccountDeleteComponent,
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
    Toast,
    TitleCasePipe,
    DatePickerModule,
    NgApexchartsModule,
    MenuModule,
    ListboxModule,
    RouterOutlet,
  ],
  exports: [
    SideBarComponent,
    HeaderComponent,
    TableContasComponent,
    TableTransactionsComponent,
    ModalAdicionarComponent,
    ChartContasComponent,
    CardValoresComponent,
    TableCaixaComponent,
    DashboardLayoutComponent,
    AccountSettingsComponent,
    AccountDeleteComponent,
  ],
  providers: [MessageService, ConfirmationService],
})
export class ComponentsModule {}
