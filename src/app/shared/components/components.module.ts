import { CommonModule, TitleCasePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ListboxModule, MenuModule } from 'headlessui-angular';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { DatePickerModule } from 'primeng/datepicker';
import { Dialog } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FileUpload } from 'primeng/fileupload';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputNumber } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RadioButton } from 'primeng/radiobutton';
import { Rating } from 'primeng/rating';
import { Ripple } from 'primeng/ripple';
import { Select, SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { Tag } from 'primeng/tag';
import { TextareaModule } from 'primeng/textarea';
import { Toast, ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { AccountDeleteComponent } from './account-delete/account-delete.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { CardValoresComponent } from './card-valores/card-valores.component';
import { ChartContasComponent } from './chart-contas/chart-contas.component';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { HeaderComponent } from './header/header.component';
import { ModalAdicionarComponent } from './modal-adicionar/modal-adicionar.component';
import { ModalProfileComponent } from './modal-profile/modal-profile.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { TableCaixaComponent } from './table-caixa/table-caixa.component';
import { TableContasComponent } from './table-contas/table-contas.component';
import { TableTransactionsComponent } from './table-transactions/table-transactions.component';
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
    PasswordModule,
    InputSwitchModule,
    DropdownModule,
    CheckboxModule,
    CalendarModule,
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
