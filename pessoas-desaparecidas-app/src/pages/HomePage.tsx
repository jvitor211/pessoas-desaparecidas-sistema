import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePersons } from '../hooks';
import type { PersonSearch, Person } from '../types';
import { formatDate, getStatusText, truncateText } from '../utils/formatters';

const HomePage: React.FC = () => {
  const [searchParams, setSearchParams] = useState<PersonSearch>({
    page: 0,
    size: 10,
    nome: '',
    status: undefined,
    localDesaparecimento: '',
    sexo: undefined,
  });

  const { persons, loading, pagination, refetch } = usePersons(searchParams);

  const handleSearch = (newParams: Partial<PersonSearch>) => {
    const updatedParams = { ...searchParams, ...newParams, page: 0 };
    setSearchParams(updatedParams);
    refetch(updatedParams);
  };

  const handlePageChange = (newPage: number) => {
    const updatedParams = { ...searchParams, page: newPage };
    setSearchParams(updatedParams);
    refetch(updatedParams);
  };

  const clearFilters = () => {
    const clearedParams: PersonSearch = {
      page: 0,
      size: 10,
      nome: '',
      status: undefined,
      localDesaparecimento: '',
      sexo: undefined,
    };
    setSearchParams(clearedParams);
    refetch(clearedParams);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Institucional da Polícia Civil */}
      <header className="pc-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <img 
                src="/brasao-policia-civil-mt.png" 
                alt="Brasão Polícia Civil MT" 
                className="pc-logo-img mr-3"
              />
              <h1 className="pc-logo text-white">
                Polícia Civil do Estado de Mato Grosso
              </h1>
            </div>
            <p className="pc-subtitle mb-3">
              Sistema Integrado de Pessoas Desaparecidas • SIPD-MT
            </p>
            <div className="counter-badge">
              <i className="fas fa-chart-bar mr-2"></i>
              <span className="font-bold">Total: {pagination.totalElements} registros</span>
            </div>
          </div>
        </div>
      </header>

      {/* Search Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="filter-card">
          <div className="space-y-2.5">
            {/* Campos de Filtro */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="filter-label">Nome</label>
                <input
                  type="text"
                  value={searchParams.nome}
                  onChange={(e) => setSearchParams({ ...searchParams, nome: e.target.value })}
                  placeholder="Digite o nome..."
                  className="filter-input"
                />
              </div>

              <div>
                <label className="filter-label">Status</label>
                <select
                  value={searchParams.status || ''}
                  onChange={(e) => setSearchParams({ 
                    ...searchParams, 
                    status: e.target.value as 'DESAPARECIDA' | 'LOCALIZADA' | undefined 
                  })}
                  className="filter-input"
                >
                  <option value="">Todos</option>
                  <option value="DESAPARECIDA">Desaparecida</option>
                  <option value="LOCALIZADA">Localizada</option>
                </select>
              </div>

              <div>
                <label className="filter-label">Sexo</label>
                <select
                  value={searchParams.sexo || ''}
                  onChange={(e) => setSearchParams({ 
                    ...searchParams, 
                    sexo: e.target.value as 'MASCULINO' | 'FEMININO' | undefined 
                  })}
                  className="filter-input"
                >
                  <option value="">Todos</option>
                  <option value="MASCULINO">Masculino</option>
                  <option value="FEMININO">Feminino</option>
                </select>
              </div>

              <div>
                <label className="filter-label">Local</label>
                <input
                  type="text"
                  value={searchParams.localDesaparecimento}
                  onChange={(e) => setSearchParams({ ...searchParams, localDesaparecimento: e.target.value })}
                  placeholder="Local..."
                  className="filter-input"
                />
              </div>
            </div>

            {/* Botões de Ação */}
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={() => handleSearch(searchParams)}
                disabled={loading}
                className="filter-btn filter-btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <i className="fas fa-search"></i>
                {loading ? 'Buscando...' : 'Buscar'}
              </button>
              <button
                onClick={clearFilters}
                className="filter-btn filter-btn-secondary"
              >
                <i className="fas fa-eraser"></i>
                Limpar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            {/* Person Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {persons.map((person: Person) => (
                <Link
                  key={person.id}
                  to={`/person/${person.id}`}
                  className="block card transition-all duration-300"
                >
                  <div>
                    {/* Photo */}
                    <div className="flex justify-center mb-4">
                      {person.foto ? (
                        <div className="w-24 h-24 overflow-hidden rounded-lg border-2 border-white shadow-sm bg-gray-200 flex items-center justify-center">
                          <img
                            src={person.foto}
                            alt={`${person.nome} ${person.sobrenome}`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              const container = target.parentElement;
                              if (container) {
                                container.innerHTML = '<span class="text-gray-500 text-xs font-medium">Sem foto</span>';
                              }
                            }}
                          />
                        </div>
                      ) : (
                        <div className="w-24 h-24 rounded-lg border-2 border-white shadow-sm bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-500 text-xs font-medium">Sem foto</span>
                        </div>
                      )}
                    </div>

                    {/* Name */}
                    <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
                      {person.nome} {person.sobrenome}
                    </h3>

                    {/* Status */}
                    <div className="flex justify-center mb-4">
                      <span className={`status-badge ${person.status === 'DESAPARECIDA' ? 'status-desaparecida' : 'status-localizada'}`}>
                        {getStatusText(person.status)}
                      </span>
                    </div>

                    {/* Details */}
                    <div className="space-y-2 text-sm text-gray-600">
                      {person.idade && (
                        <p><span className="font-medium">Idade:</span> {person.idade} anos</p>
                      )}
                      <p><span className="font-medium">Desaparecimento:</span> {formatDate(person.dataDesaparecimento)}</p>
                      <p><span className="font-medium">Local:</span> {truncateText(person.localDesaparecimento, 40)}</p>
                      {person.descricao && (
                        <p><span className="font-medium">Descrição:</span> {truncateText(person.descricao, 60)}</p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Empty State */}
            {persons.length === 0 && !loading && (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">🔍</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Nenhum resultado encontrado
                </h3>
                <p className="text-gray-500">
                  Tente ajustar os filtros de busca ou limpar todos os filtros.
                </p>
              </div>
            )}

            {/* Pagination - Profissional Polícia Civil */}
            {pagination.totalPages > 1 && (
              <div className="mt-8 pt-6 border-t border-gray-300">
                <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-lg shadow-lg p-6">
                  {/* Mobile Pagination */}
                  <div className="flex justify-between items-center sm:hidden">
                    <button
                      onClick={() => handlePageChange(pagination.currentPage - 1)}
                      disabled={pagination.first}
                      className="pc-btn-secondary flex items-center px-4 py-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <i className="fas fa-chevron-left mr-2"></i>
                      Anterior
                    </button>
                    
                    <div className="flex items-center space-x-2">
                      <span className="text-yellow-400 font-semibold text-sm">
                        {pagination.currentPage + 1} de {pagination.totalPages}
                      </span>
                    </div>
                    
                    <button
                      onClick={() => handlePageChange(pagination.currentPage + 1)}
                      disabled={pagination.last}
                      className="pc-btn-secondary flex items-center px-4 py-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Próximo
                      <i className="fas fa-chevron-right ml-2"></i>
                    </button>
                  </div>
                  
                  {/* Desktop Pagination */}
                  <div className="hidden sm:flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center text-white bg-black bg-opacity-20 rounded-lg px-4 py-2">
                        <i className="fas fa-chart-line mr-2 text-yellow-400"></i>
                        <span className="text-sm font-medium">
                          Página {pagination.currentPage + 1} de {pagination.totalPages}
                        </span>
                      </div>
                      <div className="text-gray-300 text-sm">
                        <span className="font-medium text-yellow-400">
                          {pagination.currentPage * pagination.size + 1}
                        </span>
                        {' '}-{' '}
                        <span className="font-medium text-yellow-400">
                          {Math.min((pagination.currentPage + 1) * pagination.size, pagination.totalElements)}
                        </span>
                        {' '}de{' '}
                        <span className="font-bold text-white">
                          {pagination.totalElements}
                        </span>
                        {' '}registros
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {/* Botão Primeira Página */}
                      <button
                        onClick={() => handlePageChange(0)}
                        disabled={pagination.first}
                        className="pc-pagination-btn disabled:opacity-30 disabled:cursor-not-allowed"
                        title="Primeira página"
                      >
                        <i className="fas fa-angle-double-left"></i>
                      </button>
                      
                      {/* Botão Página Anterior */}
                      <button
                        onClick={() => handlePageChange(pagination.currentPage - 1)}
                        disabled={pagination.first}
                        className="pc-pagination-btn disabled:opacity-30 disabled:cursor-not-allowed"
                        title="Página anterior"
                      >
                        <i className="fas fa-chevron-left"></i>
                      </button>
                      
                      {/* Números das Páginas */}
                      <div className="flex items-center space-x-1">
                        {[...Array(Math.min(7, pagination.totalPages))].map((_, i) => {
                          let pageNum;
                          const totalPages = pagination.totalPages;
                          const currentPage = pagination.currentPage;
                          
                          if (totalPages <= 7) {
                            pageNum = i;
                          } else if (currentPage <= 3) {
                            pageNum = i;
                          } else if (currentPage >= totalPages - 4) {
                            pageNum = totalPages - 7 + i;
                          } else {
                            pageNum = currentPage - 3 + i;
                          }
                          
                          if (pageNum < 0 || pageNum >= totalPages) return null;
                          
                          return (
                            <button
                              key={pageNum}
                              onClick={() => handlePageChange(pageNum)}
                              className={`pc-pagination-number ${
                                pageNum === pagination.currentPage
                                  ? 'pc-pagination-active'
                                  : ''
                              }`}
                            >
                              {pageNum + 1}
                            </button>
                          );
                        })}
                      </div>
                      
                      {/* Botão Próxima Página */}
                      <button
                        onClick={() => handlePageChange(pagination.currentPage + 1)}
                        disabled={pagination.last}
                        className="pc-pagination-btn disabled:opacity-30 disabled:cursor-not-allowed"
                        title="Próxima página"
                      >
                        <i className="fas fa-chevron-right"></i>
                      </button>
                      
                      {/* Botão Última Página */}
                      <button
                        onClick={() => handlePageChange(pagination.totalPages - 1)}
                        disabled={pagination.last}
                        className="pc-pagination-btn disabled:opacity-30 disabled:cursor-not-allowed"
                        title="Última página"
                      >
                        <i className="fas fa-angle-double-right"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
