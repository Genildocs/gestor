import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';

interface Transacao {
  id: number;
  data: Date;
  tipo: 'entrada' | 'saida';
  categoria: string;
  descricao: string;
  valor: number;
  formaPagamento: string;
}

@Component({
  selector: 'app-caixa',
  templateUrl: './caixa.component.html',
  styleUrls: ['./caixa.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    CalendarModule,
    DropdownModule,
    CardModule,
    DialogModule,
    ToastModule,
  ],
  providers: [MessageService],
})
export class CaixaComponent implements OnInit {
  transacoes: Transacao[] = [];
  transacaoDialog: boolean = false;
  transacao: Transacao = this.criarTransacaoVazia();
  categorias: string[] = [
    'Salário',
    'Vendas',
    'Alimentação',
    'Transporte',
    'Moradia',
    'Lazer',
    'Outros',
  ];
  formasPagamento: string[] = [
    'Dinheiro',
    'Cartão de Crédito',
    'Cartão de Débito',
    'PIX',
    'Transferência',
  ];
  saldoAtual: number = 0;
  totalEntradas: number = 0;
  totalSaidas: number = 0;

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    this.carregarTransacoes();
    this.calcularTotais();
  }

  criarTransacaoVazia(): Transacao {
    return {
      id: 0,
      data: new Date(),
      tipo: 'entrada',
      categoria: '',
      descricao: '',
      valor: 0,
      formaPagamento: '',
    };
  }

  carregarTransacoes() {
    // Aqui você implementaria a lógica para carregar as transações do backend
    this.transacoes = [
      {
        id: 1,
        data: new Date(),
        tipo: 'entrada',
        categoria: 'Salário',
        descricao: 'Salário mensal',
        valor: 5000,
        formaPagamento: 'Transferência',
      },
      {
        id: 2,
        data: new Date(),
        tipo: 'saida',
        categoria: 'Alimentação',
        descricao: 'Compras do mês',
        valor: 800,
        formaPagamento: 'Cartão de Débito',
      },
    ];
  }

  calcularTotais() {
    this.totalEntradas = this.transacoes
      .filter((t) => t.tipo === 'entrada')
      .reduce((acc, curr) => acc + curr.valor, 0);

    this.totalSaidas = this.transacoes
      .filter((t) => t.tipo === 'saida')
      .reduce((acc, curr) => acc + curr.valor, 0);

    this.saldoAtual = this.totalEntradas - this.totalSaidas;
  }

  abrirDialog() {
    this.transacao = this.criarTransacaoVazia();
    this.transacaoDialog = true;
  }

  salvarTransacao() {
    if (this.transacao.id === 0) {
      this.transacao.id = this.transacoes.length + 1;
      this.transacoes.push({ ...this.transacao });
      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Transação adicionada com sucesso',
      });
    } else {
      const index = this.transacoes.findIndex(
        (t) => t.id === this.transacao.id
      );
      this.transacoes[index] = { ...this.transacao };
      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Transação atualizada com sucesso',
      });
    }

    this.transacaoDialog = false;
    this.calcularTotais();
  }

  editarTransacao(transacao: Transacao) {
    this.transacao = { ...transacao };
    this.transacaoDialog = true;
  }

  excluirTransacao(transacao: Transacao) {
    this.transacoes = this.transacoes.filter((t) => t.id !== transacao.id);
    this.messageService.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: 'Transação excluída com sucesso',
    });
    this.calcularTotais();
  }

  fecharDialog() {
    this.transacaoDialog = false;
  }
}
