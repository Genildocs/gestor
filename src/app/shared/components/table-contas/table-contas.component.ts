import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { ContaService } from '../../services/conta.service';
import { Contas, Tipo } from '../../interfaces/contas';
import { ConfirmationService, MessageService } from 'primeng/api';

interface Column {
  field: string;
  header: string;
  customExportHeader?: string;
}

//exportação de dados
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

  tipo!: Tipo[];

  @ViewChild('dt') dt!: Table;

  cols!: Column[];

  exportColumns!: ExportColumn[];

  vencimento: Date | undefined;

  loading: boolean = false;

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
        this.contas.map((conta) => {
          return (this.conta = conta);
        });

        this.cd.markForCheck();
      },
      error: (error) => {
        console.log('Error ao buscar contas:', error);
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
      { field: 'id', header: 'ID' },
      { field: 'nome', header: 'Nome' },
      { field: 'image', header: 'Image' },
      { field: 'valor', header: 'Valor' },
      { field: 'tipo', header: 'Tipo' },
      { field: 'vencimento', header: 'Vencimento' },
    ];
  }
  loadNodes(event: any) {}
  openNew() {
    this.conta = {
      id: '',
      nome: '',
      description: '',
      vencimento: new Date(),
      status: '',
      tipo: '',
    };
    this.submitted = false;
    this.contaDialog = true;
  }

  editProduct(conta: Contas) {
    this.conta = { ...conta };
    this.contaDialog = true;
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

  deleteSelectedContas() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        //Temporario, usar uma requisição post para deletar varias contas. Criar nova rota no backend
        const contaId = this.selectedContas![0]._id;
        if (contaId) {
          this.deletaConta(contaId);
        }
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

  deleteMetodo(conta: Contas) {
    this.confirmationService.confirm({
      message:
        'Tem certeza de que deseja excluir os produtos selecionados ' +
        conta.nome +
        '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',

      accept: () => {
        if (conta._id) {
          this.deletaConta(conta._id);
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Conta Deleted',
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
      if (this.contas[i]._id === id) {
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
      case 'receber':
        return 'success';
      case 'pagar':
        return 'danger';
      default:
        return 'contrast';
    }
  }

  updateContas(id: any, data: any) {
    this.contaService.updateConta(id, data).subscribe({
      next: (response) => {
        const index = this.findIndexById(id);
        if (index !== -1) {
          this.contas[index] = { ...data };
        }
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Conta Updated Successfully',
          life: 3000,
        });
        console.log('Conta atualizada:', id, response, data);
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error ao atualizar conta.',
          life: 3000,
        });
        console.log('Error ao atualizar conta.', error);
      },
      complete: () => {
        console.log('Atualizar conta concluído.');
      },
    });
  }

  criarNovaConta(conta: any) {
    this.contaService.createConta(conta).subscribe({
      next: (response) => {
        this.contas.push(conta);
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Conta Created Successfully',
          life: 3000,
        });
        console.log('Nova conta criada:', response);
      },
      error: (error) => {
        this.handleServiceError('Error ao criar conta.', error);
      },
      complete: () => {
        console.log('Criação de conta concluída.');
      },
    });
  }
  saveProduct() {
    this.submitted = true;

    if (!this.conta.nome?.trim()) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Validation Error',
        detail: 'O campo Nome, Tipo, Valor e Vencimento é obrigatório.',
        life: 3000,
      });
      return; // Evita continuar com dados inválidos.
    }

    if (this.conta.id) {
      // Atualizar conta existente
      this.updateContas(this.conta._id, this.conta);
    } else {
      // Criar nova conta

      this.criarNovaConta({ ...this.conta, id: this.createId() });
    }
    // Fecha o modal e reseta os dados da conta
    this.contaDialog = false;
    this.conta = {};
  }
  //Centraliza o tratamento de erros e mensagens, reduzindo duplicação.
  private handleServiceError(message: string, error: any): void {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: message,
      life: 3000,
    });
    console.error(message, error);
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
