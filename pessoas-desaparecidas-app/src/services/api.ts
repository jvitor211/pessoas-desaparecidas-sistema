import axios from 'axios';
import type { Person, PersonResponse, PersonSearch, NewInformation, ApiError } from '../types';

// Tipos da API Real da Polícia Civil MT
interface ApiPerson {
  id: number;
  nome: string;
  idade: number;
  sexo: 'MASCULINO' | 'FEMININO';
  vivo: boolean;
  urlFoto?: string;
  ultimaOcorrencia: {
    dtDesaparecimento: string;
    dataLocalizacao?: string;
    encontradoVivo: boolean;
    localDesaparecimentoConcat: string;
    ocorrenciaEntrevDesapDTO?: {
      informacao?: string;
      vestimentasDesaparecido?: string;
    };
    listaCartaz?: unknown;
    ocoId: number;
  };
}

// Função para converter dados da API para nossa estrutura
function mapApiPersonToPerson(apiPerson: ApiPerson): Person {
  const isDesaparecida = !apiPerson.ultimaOcorrencia.dataLocalizacao;
  
  return {
    id: apiPerson.id,
    nome: apiPerson.nome,
    sobrenome: '', // API não retorna sobrenome separado
    idade: apiPerson.idade,
    foto: apiPerson.urlFoto,
    dataDesaparecimento: apiPerson.ultimaOcorrencia.dtDesaparecimento,
    localDesaparecimento: apiPerson.ultimaOcorrencia.localDesaparecimentoConcat,
    descricao: apiPerson.ultimaOcorrencia.ocorrenciaEntrevDesapDTO?.informacao || 
               apiPerson.ultimaOcorrencia.ocorrenciaEntrevDesapDTO?.vestimentasDesaparecido || 
               `Pessoa de ${apiPerson.idade} anos, sexo ${apiPerson.sexo.toLowerCase()}.`,
    status: isDesaparecida ? 'DESAPARECIDA' : 'LOCALIZADA',
    observacoes: apiPerson.ultimaOcorrencia.ocorrenciaEntrevDesapDTO?.informacao,
    telefoneContato: undefined, // API não retorna telefone público
    createdAt: apiPerson.ultimaOcorrencia.dtDesaparecimento,
    updatedAt: apiPerson.ultimaOcorrencia.dataLocalizacao || apiPerson.ultimaOcorrencia.dtDesaparecimento,
  };
}

// Configuração da API via variáveis de ambiente
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
const API_TIMEOUT = parseInt(import.meta.env.VITE_API_TIMEOUT || '10000');

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para tratamento de erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const apiError: ApiError = {
      message: error.response?.data?.message || error.message || 'Erro desconhecido',
      status: error.response?.status || 500,
    };
    return Promise.reject(apiError);
  }
);


interface ApiParams {
  pagina: number;
  porPagina: number;
  nome?: string;
  status?: 'DESAPARECIDO' | 'LOCALIZADO';
  faixaIdadeInicial?: number;
  faixaIdadeFinal?: number;
  sexo?: string;
}

export const apiService = {

  async getPersons(params: PersonSearch): Promise<PersonResponse> {

    const apiParams: ApiParams = {
      pagina: params.page,
      porPagina: params.size,
    };

    // Usar filtro se houver parâmetros de busca
    let endpoint = '/v1/pessoas/aberto';
    
    if (params.nome || params.status || params.localDesaparecimento || params.sexo) {
      endpoint = '/v1/pessoas/aberto/filtro';
      
      if (params.nome) {
        apiParams.nome = params.nome;
      }
      
      if (params.status) {
        apiParams.status = params.status === 'DESAPARECIDA' ? 'DESAPARECIDO' : 'LOCALIZADO';
      }
      
      if (params.sexo) {
        apiParams.sexo = params.sexo;
      }
    }

    const response = await api.get(endpoint, { params: apiParams });
    
    // Mapear resposta da API 
    if (Array.isArray(response.data)) {
      // Resposta do filtro é array direto
      const mappedPersons = response.data.map((apiPerson: ApiPerson) => mapApiPersonToPerson(apiPerson));
      return {
        content: mappedPersons,
        totalElements: response.data.length,
        totalPages: 1,
        size: params.size,
        number: params.page,
        first: true,
        last: true
      };
    } else {
      // Resposta da listagem tem paginação
      const mappedPersons = response.data.content?.map((apiPerson: ApiPerson) => mapApiPersonToPerson(apiPerson)) || [];
      return {
        ...response.data,
        content: mappedPersons
      };
    }
  },

  // Buscar pessoa por ID 
  async getPersonById(id: number): Promise<Person> {
    const response = await api.get(`/v1/pessoas/${id}`);
    return mapApiPersonToPerson(response.data);
  },

  // Enviar nova informação sobre uma pessoa
  async submitInformation(info: NewInformation): Promise<void> {
    // API usa query params
    const params = {
      ocorrenciaId: info.pessoaId,
      informacao: info.observacoes,
      descricao: info.localizacaoAvistada || '',
      data: new Date().toISOString().split('T')[0], // Data atual no formato YYYY-MM-DD
      ocoId: info.pessoaId
    };

    await api.post('/v1/ocorrencias/informacoes-desaparecido', null, { params });
  },

  // Buscar estatísticas gerais 
  async getStatistics(): Promise<{ total: number; desaparecidas: number; localizadas: number }> {
    const response = await api.get('/v1/pessoas/aberto/estatistico');
    
    // Mapear resposta da API 
    return {
      total: response.data.quantPessoasDesaparecidas + response.data.quantPessoasEncontradas,
      desaparecidas: response.data.quantPessoasDesaparecidas,
      localizadas: response.data.quantPessoasEncontradas
    };
  },
};

export default api;
