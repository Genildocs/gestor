import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Table } from 'primeng/table';
import { ContaService } from '../../services/conta.service';
import { Contas } from '../../interfaces/contas';
import { ConfirmationService, MessageService } from 'primeng/api';

interface Column {
  field: string;
  header: string;
  customExportHeader?: string;
}

interface ExportColumn {
  title: string;
  dataKey: string;
}

@Component({
  selector: 'app-table-contas',
  templateUrl: './table-contas.component.html',
  styleUrl: './table-contas.component.css',
})
export class TableContasComponent implements OnInit {
  contaDialog: boolean = false;

  contas!: Contas[];

  id!: string | undefined;

  conta!: Contas;

  selectedContas!: Contas[] | null;

  submitted: boolean = false;

  statuses!: any[];

  tipo!: any[];

  @ViewChild('dt') dt!: Table;

  cols!: Column[];

  exportColumns!: ExportColumn[];

  date: Date | undefined;

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private contaService: ContaService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.buscaContas();
  }
  buscaContas() {
    this.contaService.getContas().subscribe({
      next: (data: any) => {
        const contas: Contas[] = data.contas;
        this.contas = contas;
        this.contas.forEach((conta, idx) => {
          this.conta = conta;
          this.id = contas[idx]['_id'];
        });
        this.cd.markForCheck();
      },
    });

    this.statuses = [
      { label: 'pago', value: 'pago' },
      { label: 'pendente', value: 'pendente' },
    ];

    this.tipo = [
      { label: 'pagar', value: 'pagar' },
      { label: 'receber', value: 'receber' },
    ];

    this.cols = [
      { field: 'code', header: 'Code', customExportHeader: 'Conta Code' },
      { field: 'nome', header: 'Nome' },
      { field: 'image', header: 'Image' },
      { field: 'valor', header: 'Valor' },
      { field: 'tipo', header: 'Tipo' },
    ];

    this.exportColumns = this.cols.map((col) => ({
      title: col.header,
      dataKey: col.field,
    }));
  }

  openNew() {
    this.conta = {};
    this.submitted = false;
    this.contaDialog = true;
  }

  editProduct(conta: Contas) {
    this.conta = { ...conta };
    this.contaDialog = true;
  }

  deleteSelectedContas() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.contas = this.contas.filter((val) => {
          !this.selectedContas?.includes(val);
        });

        this.selectedContas = null;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Products Deleted',
          life: 3000,
        });
      },
    });
  }

  hideDialog() {
    this.contaDialog = false;
    this.submitted = false;
  }

  deletaConta(contaId: string) {
    this.contaService.deleteConta(contaId).subscribe({
      next: (response: { contas: Contas[] }) => {
        // Atualiza a lista local com base na resposta do backend.
        this.contas =
          response.contas || this.contas.filter((val) => val._id !== contaId);
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Erro ao deletar conta.',
          life: 3000,
        });
        console.log('Error ao deletar conta:', error);
      },
      complete: () => {
        console.log('Deletar conta concluído.');
      },
    });
  }
  deleteMetodo(conta: Contas) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + conta.nome + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',

      accept: () => {
        if (conta._id) {
          this.deletaConta(conta._id);
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Product Deleted',
            life: 3000,
          });
        } else {
          this.messageService.add({
            severity: 'warn',
            summary: 'Warning',
            detail: 'Account ID is missing. Cannot delete.',
            life: 3000,
          });
        }
      },
    });
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.contas.length; i++) {
      if (this.contas[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  createId(): string {
    let id = '';
    var chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  getSeverity(status: string) {
    switch (status) {
      case 'pago':
        return 'success';
      case 'pendente':
        return 'danger';
      default:
        return 'contrast';
    }
  }

  saveProduct() {
    this.submitted = true;
    console.log(this.conta, this.submitted);
    if (this.conta.nome?.trim()) {
      if (this.conta.id) {
        this.contas[this.findIndexById(this.conta.id)] = this.conta;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Updated',
          life: 3000,
        });
      } else {
        this.conta.id = this.createId();
        this.contas.push(this.conta);
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Created',
          life: 3000,
        });
      }

      this.contas = [...this.contas];
      this.contaDialog = false;
      this.conta = {};
    }
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
