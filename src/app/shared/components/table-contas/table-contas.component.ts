import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
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

  // products!: Product[];

  contas!: Contas[];

  id!: string | undefined;

  // product!: Product;

  conta!: Contas;

  selectedContas!: Contas[] | null;

  submitted: boolean = false;

  statuses!: any[];

  @ViewChild('dt') dt!: Table;

  cols!: Column[];

  exportColumns!: ExportColumn[];

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private contaService: ContaService,
    private cd: ChangeDetectorRef
  ) {}

  exportCSV() {
    this.dt.exportCSV();
  }

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
      },
    });

    this.statuses = [
      { label: 'PAGO', value: 'PAGO' },
      { label: 'PENDENTE', value: 'PENDENTE' },
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

  deleteSelectedProducts() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.contas = this.contas.filter(
          (val) => !this.selectedContas?.includes(val)
        );
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

  deleteProduct(conta: Contas) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + conta.nome + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.contas = this.contas.filter((val) => val.id !== conta.id);
        this.conta = {};
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Deleted',
          life: 3000,
        });
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
      case 'PAGO':
        return 'success';
      case 'PENDENTE':
        return 'danger';
      default:
        return 'contrast';
    }
  }

  saveProduct() {
    this.submitted = true;
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
        this.conta.image = 'product-placeholder.svg';
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
}
