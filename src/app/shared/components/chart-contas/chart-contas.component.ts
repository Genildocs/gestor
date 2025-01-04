import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid,
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
  constructor(private contaService: ContaService) {
    this.chartOptions = {
      series: [
        {
          name: 'Desktops',
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
        },
      ],
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false,
        },
      },

      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'straight',
      },
      title: {
        text: 'Product Trends by Month',
        align: 'left',
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
        ],
      },
    };
  }

  ngOnInit(): void {
    this.buscaContas();
  }

  buscaContas() {
    this.contaService.getContas().subscribe({
      next: (data: any) => {
        const contas: any[] = data.contas;

        //filtra as contas pendentes
        const constasFiltradas = contas.filter(
          (conta) => conta.status === 'pendente'
        );

        // Transformar os dados para o formato do gráfico
        const valores = constasFiltradas.map((conta) => conta.valor);

        const vencimentos = constasFiltradas.map(
          (conta) => DateTime.fromISO(conta.vencimento).monthShort
        );

        const totalPorMes = vencimentos.reduce(
          (acc: any, mes: any, index: any) => {
            if (!acc[mes]) {
              acc[mes] = 0; // Inicializa o valor do mês
            }

            acc[mes] += Math.round(valores[index]);
            // Adiciona o valor ao mês correspondente
            return acc;
          },
          {}
        );

        const valoresMensal: any = Object.values(totalPorMes);
        const meses = Object.keys(totalPorMes);

        // Atualizar opções do gráfico
        this.chartOptions = {
          ...this.chartOptions,
          series: [
            {
              name: 'Contas a Pagar',
              data: valoresMensal, // Adiciona os valores como dados
            },
          ],
          chart: {
            height: 350,
            type: 'line',
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
          dataLabels: {
            enabled: false,
          },
          stroke: {
            curve: 'straight',
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
            categories: meses, // Define os vencimentos como categorias
          },
        };
      },
      error: (error) => {
        console.log('Error ao buscar contas:', error);
      },
    });
  }
}
