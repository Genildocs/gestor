export interface Register {
  nome: string;
  email: string;
  password: string;
}

export interface Login {
  email: string;
  password: string;
}

export interface User {
  id: string;
  nome: string;
  email: string;
  role: string;
}

export interface LoginResponse {
  token: string;
  username: string;
}
