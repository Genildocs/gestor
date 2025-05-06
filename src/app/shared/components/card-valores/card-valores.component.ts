import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-card-valores',
  templateUrl: './card-valores.component.html',
  styleUrl: './card-valores.component.css',
})
export class CardValoresComponent implements OnInit, OnChanges {
  @Input() contas!: any[];
  pagar: number = 0;
  receber: number = 0;
  balancoTotal: number = 0;
  saldoMes: number = 0;
  loading: boolean = true;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['contas'] && changes['contas'].currentValue) {
      this.loading = true;
      this.calcularValores();
      // Simula um pequeno delay para melhor UX
      setTimeout(() => {
        this.loading = false;
      }, 500);
    }
  }

  private calcularValores(): void {
    let pagar = 0;
    let receber = 0;
    const hoje = new Date();
    const primeiroDiaMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
    const ultimoDiaMes = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0);

    for (let i = 0; i < this.contas.length; i++) {
      const conta = this.contas[i];
      const valor = parseFloat(conta.valor);
      const dataConta = new Date(conta.data);

      if (conta.tipo === 'pagar') {
        pagar += valor;
        // Calcula saldo do mês
        if (dataConta >= primeiroDiaMes && dataConta <= ultimoDiaMes) {
          this.saldoMes -= valor;
        }
      } else {
        receber += valor;
        // Calcula saldo do mês
        if (dataConta >= primeiroDiaMes && dataConta <= ultimoDiaMes) {
          this.saldoMes += valor;
        }
      }
    }

    this.pagar = Number(pagar.toFixed(2));
    this.receber = Number(receber.toFixed(2));
    this.balancoTotal = Number((this.receber - this.pagar).toFixed(2));
    this.saldoMes = Number(this.saldoMes.toFixed(2));
  }

  ngOnInit(): void {
    this.loading = true;
  }
}
