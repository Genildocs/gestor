import {
  Component,
  Input,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexYAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid,
  ApexPlotOptions,
  ApexTooltip,
  ApexFill,
} from 'ng-apexcharts';
import { DateTime } from 'luxon';
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  yaxis: ApexYAxis;
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  tooltip: ApexTooltip;
};
@Component({
  selector: 'app-chart-contas',
  templateUrl: './chart-contas.component.html',
  styleUrl: './chart-contas.component.css',
})
export class ChartContasComponent implements OnInit {
  @ViewChild('chartObj') chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  @Input() contas: any[] = [];
  constructor() {
    this.chartOptions = {};
  }

  ngOnChanges(change: SimpleChanges) {
    if (change['contas'] && change['contas'].currentValue) {
      this.buscaValoresDeContas(this.contas);
    }
  }

  ngOnInit(): void {}

  buscaValoresDeContas(contas: any) {
    // let meses: any = [];
    // let valorParaPagar: any = [];
    // let valorParaReceber: any = [];
    // for (let i = 0; i < contas.length; i++) {
    //   meses.push(DateTime.fromISO(contas[i].vencimento).monthLong);

    //   if (contas[i].tipo === 'pagar') {
    //     valorParaPagar.push({ meses: [meses[i]], valor: [contas[i].valor] });
    //   } else {
    //     valorParaReceber.push({ meses: [meses[i]], valor: [contas[i].valor] });
    //   }
    // }
    // Refatorar: Tentar evitar o tipo any , usar tipagem, usar loops mais simples e atuais.

    //Obter meses e agrupar valores por tipo
    const meses = [
      ...new Set(
        contas.map(
          (conta: any) => DateTime.fromISO(conta.vencimento).monthLong
        ) as string
      ),
    ];
    const valorParaPagar: { mes: string; valor: number }[] = [];
    const valorParaReceber: { mes: string; valor: number }[] = [];

    contas.forEach((conta: any) => {
      const mes = DateTime.fromISO(conta.vencimento).monthLong as string;
      if (conta.tipo === 'pagar') {
        valorParaPagar.push({ mes, valor: Number(conta.valor) });
      } else {
        valorParaReceber.push({ mes, valor: Number(conta.valor) });
      }
    });

    //Cria um mapa com os meses
    const mesesUnicos = new Map(meses.map((mes) => [mes, 0]));

    this.insereValoresNoGrafico(mesesUnicos, valorParaReceber, valorParaPagar);
  }

  insereValoresNoGrafico(
    meses: Map<string, number>,
    valoresReceber: { mes: string; valor: number }[],
    valoresPagar: { mes: string; valor: number }[]
  ) {
    let receber = new Map(meses);
    let pagar = new Map(meses);

    // function mapeamento(map: any, valores: any) {
    //   valores.forEach((el: any, idx: any) => {
    //     if (map.has(...el.meses)) {
    //       return map.set(...el.meses, map.get(...el.meses) + Number(el.valor));
    //     } else {
    //       return map.set(...el.meses, Number(el.valor));
    //     }
    //   });
    // }
    // mapeamento(pagar, valorPago);
    // mapeamento(receber, valorReceber);
    // Atualizar mapas com valores
    const atualizarMapa = (
      map: Map<string, number>,
      valores: { mes: string; valor: number }[]
    ) => {
      valores.forEach(({ mes, valor }) => {
        map.set(mes, (map.get(mes) || 0) + valor);
      });
    };

    atualizarMapa(receber, valoresReceber);
    atualizarMapa(pagar, valoresPagar);

    //Obter valores
    const valorReceber = Array.from(receber.values());
    const valorPagar = Array.from(pagar.values());

    this.configurarGrafico(meses, valorReceber, valorPagar);
  }

  configurarGrafico(
    meses: Map<string, number>,
    valoresReceber: number[],
    valoresPagar: number[]
  ) {
    this.chartOptions = {
      ...this.chartOptions,
      series: [
        {
          name: 'Total mensal a pagar',
          data: valoresPagar,
          color: 'red',
        },
        {
          name: 'Total mensal a receber',
          data: valoresReceber,
          color: 'green',
        },
      ],
      chart: {
        height: 350,
        type: 'bar',
        fontFamily: 'inherit',
        zoom: {
          enabled: false,
        },
        animations: {
          enabled: true,
          speed: 800,
          animateGradually: {
            enabled: true,
            delay: 150,
          },
          dynamicAnimation: {
            enabled: true,
            speed: 350,
          },
        },
        dropShadow: {
          enabled: false,
          enabledOnSeries: undefined,
          top: 0,
          left: 0,
          blur: 3,
          color: '#000',
          opacity: 0.35,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
        },
      },

      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: Array.from(meses.keys()),
        labels: {
          style: {
            fontFamily: 'inherit',
            fontSize: '12px',
            fontWeight: '400',
          },
        },
      },
      fill: { opacity: 1 },
      yaxis: {
        title: {
          text: 'R$ (valores)',
        },
        labels: {
          style: {
            fontFamily: 'inherit',
            fontSize: '12px',
            fontWeight: '400',
          },
          formatter: (val: any) => `R$ ${val}`,
        },
      },
      tooltip: {
        y: {
          formatter: (val: any) => `R$ ${val}`,
        },
      },
    };
  }
}
