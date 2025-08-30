import axios from 'axios';
import { Person, PersonResponse, PersonSearch, NewInformation, ApiError } from '../types';

const API_BASE_URL = 'https://abitus-api.geia.vip';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
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

export const apiService = {
  // Buscar pessoas com filtros e paginação
  async getPersons(params: PersonSearch): Promise<PersonResponse> {
    try {
      const response = await api.get('/api/pessoas', { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Buscar pessoa por ID
  async getPersonById(id: number): Promise<Person> {
    try {
      const response = await api.get(`/api/pessoas/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Enviar nova informação sobre uma pessoa
  async submitInformation(info: NewInformation): Promise<void> {
    try {
      const formData = new FormData();
      formData.append('pessoaId', info.pessoaId.toString());
      formData.append('observacoes', info.observacoes);
      
      if (info.localizacaoAvistada) {
        formData.append('localizacaoAvistada', info.localizacaoAvistada);
      }
      
      if (info.telefoneContato) {
        formData.append('telefoneContato', info.telefoneContato);
      }
      
      if (info.fotos && info.fotos.length > 0) {
        info.fotos.forEach((foto, index) => {
          formData.append(`fotos`, foto);
        });
      }

      await api.post('/api/informacoes', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } catch (error) {
      throw error;
    }
  },

  // Buscar estatísticas gerais
  async getStatistics(): Promise<{ total: number; desaparecidas: number; localizadas: number }> {
    try {
      const response = await api.get('/api/estatisticas');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default api;
