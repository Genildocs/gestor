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
  pagar: any;
  receber: any;
  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['contas'] && changes['contas'].currentValue) {
      let pagar = 0;
      let receber = 0;
      for (let i = 0; i < this.contas.length; i++) {
        if (this.contas[i].tipo === 'pagar') {
          pagar += parseFloat(this.contas[i].valor);
        } else {
          receber += parseFloat(this.contas[i].valor);
        }
      }
      this.pagar = pagar.toFixed(2);
      this.receber = receber.toFixed(2);
    }
  }

  ngOnInit(): void {}
}
