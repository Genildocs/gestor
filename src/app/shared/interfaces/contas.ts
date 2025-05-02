export interface Contas {
  id?: string;
  _id?: string;
  nome?: string;
  description?: string;
  valor?: number;
  vencimento?: Date;
  status?: string;
  tipo?: string;
  image?: string;
  inventoryStatus?: string;
  category?: string;
  quantity?: number;
}

export interface Status {
  label?: string;
  value?: string;
}

export interface Tipo {
  label?: string;
  value?: string;
  nome?: string;
  code?: string;
}

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};
