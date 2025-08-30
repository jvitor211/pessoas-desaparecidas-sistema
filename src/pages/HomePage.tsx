import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { usePersons } from '../hooks/usePersons';
import { PersonSearch } from '../types';
import { formatDate, getStatusColor, getStatusText, truncateText } from '../utils/formatters';
import { MagnifyingGlassIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const HomePage: React.FC = () => {
  const [searchParams, setSearchParams] = useState<PersonSearch>({
    page: 0,
    size: 10,
    nome: '',
    status: undefined,
    localDesaparecimento: '',
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
    };
    setSearchParams(clearedParams);
    refetch(clearedParams);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Pessoas Desaparecidas - MT
              </h1>
              <p className="mt-2 text-gray-600">
                Sistema de consulta e colaboração da Polícia Civil de Mato Grosso
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>Total: {pagination.totalElements} registros</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Search Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={searchParams.nome}
                  onChange={(e) => setSearchParams({ ...searchParams, nome: e.target.value })}
                  placeholder="Digite o nome..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={searchParams.status || ''}
                onChange={(e) => setSearchParams({ 
                  ...searchParams, 
                  status: e.target.value as 'DESAPARECIDA' | 'LOCALIZADA' | undefined 
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Todos os status</option>
                <option value="DESAPARECIDA">Desaparecida</option>
                <option value="LOCALIZADA">Localizada</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Local
              </label>
              <input
                type="text"
                value={searchParams.localDesaparecimento}
                onChange={(e) => setSearchParams({ ...searchParams, localDesaparecimento: e.target.value })}
                placeholder="Local do desaparecimento..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex items-end space-x-2">
              <button
                onClick={() => handleSearch(searchParams)}
                disabled={loading}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? 'Buscando...' : 'Buscar'}
              </button>
              <button
                onClick={clearFilters}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Limpar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            {/* Person Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {persons.map((person) => (
                <Link
                  key={person.id}
                  to={`/person/${person.id}`}
                  className="block bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow duration-200"
                >
                  <div className="p-6">
                    {/* Photo */}
                    <div className="flex justify-center mb-4">
                      {person.foto ? (
                        <img
                          src={person.foto}
                          alt={`${person.nome} ${person.sobrenome}`}
                          className="w-24 h-24 rounded-full object-cover border-4 border-gray-200"
                        />
                      ) : (
                        <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center border-4 border-gray-300">
                          <span className="text-gray-500 text-xs">Sem foto</span>
                        </div>
                      )}
                    </div>

                    {/* Name */}
                    <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
                      {person.nome} {person.sobrenome}
                    </h3>

                    {/* Status */}
                    <div className="flex justify-center mb-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(person.status)}`}>
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

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="mt-8 flex items-center justify-between border-t border-gray-200 pt-6">
                <div className="flex-1 flex justify-between sm:hidden">
                  <button
                    onClick={() => handlePageChange(pagination.currentPage - 1)}
                    disabled={pagination.first}
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Anterior
                  </button>
                  <button
                    onClick={() => handlePageChange(pagination.currentPage + 1)}
                    disabled={pagination.last}
                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Próximo
                  </button>
                </div>
                
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Mostrando <span className="font-medium">{pagination.currentPage * pagination.size + 1}</span> a{' '}
                      <span className="font-medium">
                        {Math.min((pagination.currentPage + 1) * pagination.size, pagination.totalElements)}
                      </span>{' '}
                      de <span className="font-medium">{pagination.totalElements}</span> resultados
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                      <button
                        onClick={() => handlePageChange(pagination.currentPage - 1)}
                        disabled={pagination.first}
                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronLeftIcon className="h-5 w-5" />
                      </button>
                      
                      {[...Array(Math.min(5, pagination.totalPages))].map((_, i) => {
                        const pageNum = Math.max(0, pagination.currentPage - 2) + i;
                        if (pageNum >= pagination.totalPages) return null;
                        
                        return (
                          <button
                            key={pageNum}
                            onClick={() => handlePageChange(pageNum)}
                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                              pageNum === pagination.currentPage
                                ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                            }`}
                          >
                            {pageNum + 1}
                          </button>
                        );
                      })}
                      
                      <button
                        onClick={() => handlePageChange(pagination.currentPage + 1)}
                        disabled={pagination.last}
                        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronRightIcon className="h-5 w-5" />
                      </button>
                    </nav>
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
