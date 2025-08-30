export interface Person {
  id: number;
  nome: string;
  sobrenome: string;
  idade?: number;
  foto?: string;
  dataDesaparecimento: string;
  localDesaparecimento: string;
  descricao: string;
  status: 'DESAPARECIDA' | 'LOCALIZADA';
  observacoes?: string;
  telefoneContato?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PersonSearch {
  page: number;
  size: number;
  nome?: string;
  status?: 'DESAPARECIDA' | 'LOCALIZADA';
  localDesaparecimento?: string;
}

export interface PersonResponse {
  content: Person[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
}

export interface NewInformation {
  pessoaId: number;
  observacoes: string;
  localizacaoAvistada?: string;
  telefoneContato?: string;
  fotos?: File[];
}

export interface ApiError {
  message: string;
  status: number;
}
