export interface Contas {
  id?: string;
  nome?: string;
  description?: string;
  valor?: string;
  vencimento?: string;
  status?: Status;
  tipo?: Tipo;
}

export interface Status {
  pendente?: string;
  pago?: string;
}

export interface Tipo {
  nome: string;
  code: string;
}
