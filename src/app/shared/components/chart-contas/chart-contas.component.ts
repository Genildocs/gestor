import { Component, Input, OnInit, ViewChild } from '@angular/core';
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
import { ContaService } from '../../services/conta.service';
import { addDays, format } from 'date-fns/fp';
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
  dt: Date = DateTime.now().toJSDate();
  @Input() contas: any[] = [];
  constructor(private contaService: ContaService) {
    this.chartOptions = {};
  }

  ngOnInit(): void {
    this.buscaContas();
  }

  filterContas(contas: any, select?: string): any {
    const filters = contas.filter(
      (conta: any) => conta.status === select || conta.tipo === select
    );

    if (select) {
      const valores = filters.map((conta: any) => conta.valor);
      const vencimentos = filters.map(
        (conta: any) => DateTime.fromISO(conta.vencimento).monthShort
      );

      const totalPorMes = vencimentos.reduce(
        (acc: any, mes: any, index: any) => {
          if (!acc[mes]) {
            acc[mes] = 0;
          }

          acc[mes] += Math.round(valores[index]);

          return acc;
        },
        {}
      );
      const meses = Object.keys(totalPorMes);
      const valoreMensal: any = Object.values(totalPorMes);
      return { meses, valoreMensal };
    }
  }

  buscaContas() {
    this.contaService.getContas().subscribe({
      next: (data: any) => {
        const contas: any[] = data.contas;

        //filtra as contas
        const constasPendente = this.filterContas(contas, 'pendente');
        const constasPagas = this.filterContas(contas, 'pago');
        const constasReceber = this.filterContas(contas, 'receber');
        const constaPagar = this.filterContas(contas, 'pagar');

        // Filtra os meses
        const meses = [
          ...constasPendente.meses,
          ...constasPagas.meses,
          ...constasReceber.meses,
          ...constaPagar.meses,
        ];
        let mesesUnicos = [...new Set(meses)].sort(
          (a, b) =>
            new Date(`01 ${a} 2020`).getMonth() -
            new Date(`01 ${b} 2020`).getMonth()
        );

        // Mapeia os valores para cada mês
        const valoresPendentesPorMes = new Map(
          mesesUnicos.map((mes) => [mes, 0])
        );
        constasPendente.meses.forEach((mes: any, index: any) => {
          valoresPendentesPorMes.set(
            mes,
            valoresPendentesPorMes.get(mes)! +
              constasPendente.valoreMensal[index]
          );
        });

        const valoresPagosPorMes = new Map(mesesUnicos.map((mes) => [mes, 0]));
        constasPagas.meses.forEach((mes: any, index: number) => {
          valoresPagosPorMes.set(
            mes,
            valoresPagosPorMes.get(mes)! + constasPagas.valoreMensal[index]
          );
        });

        const valoresPagar = new Map(mesesUnicos.map((mes) => [mes, 0]));
        constaPagar.meses.forEach((mes: any, index: number) => {
          valoresPagar.set(
            mes,
            valoresPagar.get(mes)! + constaPagar.valoreMensal[index]
          );
        });

        const valoresReceber = new Map(mesesUnicos.map((mes) => [mes, 0]));
        constasReceber.meses.forEach((mes: any, index: number) => {
          valoresReceber.set(
            mes,
            valoresReceber.get(mes)! + constasReceber.valoreMensal[index]
          );
        });

        this.chartOptions = {
          ...this.chartOptions,
          series: [
            {
              name: '$ Total de contas com status pago',
              data: Array.from(valoresPagosPorMes.values()),
              color: 'blue', // Adiciona os valores como dados
            },
            {
              name: '$ Total de contas com status pendente',
              data: Array.from(valoresPendentesPorMes.values()),
              color: 'gray', // Adiciona os valores como dados
            },
            {
              name: 'Total mensal a pagar',
              data: Array.from(valoresPagar.values()),
              color: 'red',
            },
            {
              name: 'Total mensal a receber',
              data: Array.from(valoresReceber.values()),
              color: 'green',
            },
          ],
          chart: {
            height: 350,
            type: 'bar',
            zoom: {
              enabled: false,
            },
            animations: {
              speed: 200,
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
          title: {
            text: 'Total de valores por mês',
            align: 'left',
          },
          grid: {
            row: {
              colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
              opacity: 0.5,
            },
          },
          xaxis: {
            categories: mesesUnicos,
          },
          fill: { opacity: 1 },
          yaxis: {
            title: {
              text: 'R$ (valores)',
            },
          },
          tooltip: {
            y: {
              formatter: (val: any) => `R$ ${val}`,
            },
          },
        };
      },
      error: (error) => {
        console.log('Error ao buscar contas:', error);
      },
    });
  }
}
