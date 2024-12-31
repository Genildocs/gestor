export interface Contas {
  id?: string;
  _id?: string;
  nome?: string;
  description?: string;
  valor?: string;
  vencimento?: string;
  status?: string;
  tipo?: Tipo;
  image?: string;
  inventoryStatus?: string;
  category?: string;
  quantity?: number;
}

export interface Status {
  pendente?: string;
  pago?: string;
}

export interface Tipo {
  nome: string;
  code: string;
}
