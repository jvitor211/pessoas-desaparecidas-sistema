import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { usePerson } from '../hooks/usePerson';
import { formatDate, formatDateTime, getStatusColor, getStatusText, formatPhone } from '../utils/formatters';
import InformationForm from '../components/InformationForm';

const PersonDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const personId = id ? parseInt(id, 10) : null;
  const { person, loading, error } = usePerson(personId);
  const [showForm, setShowForm] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !person) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Erro ao carregar dados</h2>
          <p className="text-gray-600 mb-6">{error || 'Pessoa não encontrada'}</p>
          <Link
            to="/"
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
          >
            Voltar à página inicial
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
            >
              ← Voltar à busca
            </Link>
            <div className="h-6 border-l border-gray-300"></div>
            <h1 className="text-2xl font-bold text-gray-900">
              Detalhes da Pessoa
            </h1>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Person Details Card */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden mb-8">
          {/* Status Banner */}
          <div className={`px-6 py-4 ${person.status === 'DESAPARECIDA' ? 'bg-red-50 border-b border-red-200' : 'bg-green-50 border-b border-green-200'}`}>
            <div className="flex items-center justify-between">
              <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(person.status)}`}>
                {getStatusText(person.status)}
              </span>
              <span className="text-sm text-gray-600">
                ID: {person.id}
              </span>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Photo */}
              <div className="flex justify-center lg:justify-start">
                {person.foto ? (
                  <img
                    src={person.foto}
                    alt={`${person.nome} ${person.sobrenome}`}
                    className="w-48 h-48 rounded-lg object-cover border-4 border-gray-200"
                  />
                ) : (
                  <div className="w-48 h-48 rounded-lg bg-gray-200 flex items-center justify-center border-4 border-gray-300">
                    <span className="text-gray-500">Sem foto disponível</span>
                  </div>
                )}
              </div>

              {/* Basic Info */}
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    {person.nome} {person.sobrenome}
                  </h2>
                  {person.idade && (
                    <p className="text-lg text-gray-600">{person.idade} anos</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Informações do Desaparecimento
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <span className="block text-sm font-medium text-gray-700">Data</span>
                        <span className="text-gray-900">{formatDate(person.dataDesaparecimento)}</span>
                      </div>
                      <div>
                        <span className="block text-sm font-medium text-gray-700">Local</span>
                        <span className="text-gray-900">{person.localDesaparecimento}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Contato
                    </h3>
                    <div className="space-y-3">
                      {person.telefoneContato && (
                        <div>
                          <span className="block text-sm font-medium text-gray-700">Telefone</span>
                          <span className="text-gray-900">{formatPhone(person.telefoneContato)}</span>
                        </div>
                      )}
                      <div>
                        <span className="block text-sm font-medium text-gray-700">Última atualização</span>
                        <span className="text-gray-900">{formatDateTime(person.updatedAt)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            {person.descricao && (
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Descrição
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {person.descricao}
                </p>
              </div>
            )}

            {/* Observations */}
            {person.observacoes && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Observações
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {person.observacoes}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Você tem informações sobre esta pessoa?
            </h3>
            <p className="text-gray-600 mb-6">
              Sua colaboração pode ser fundamental para ajudar a localizar essa pessoa ou confirmar seu paradeiro.
            </p>
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium"
            >
              {showForm ? 'Fechar formulário' : 'Enviar informações'}
            </button>
          </div>

          {/* Information Form */}
          {showForm && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <InformationForm 
                personId={person.id} 
                onSuccess={() => setShowForm(false)}
              />
            </div>
          )}
        </div>

        {/* Important Notice */}
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <div className="flex items-start">
            <div className="text-yellow-600 text-2xl mr-4">⚠️</div>
            <div>
              <h4 className="text-lg font-semibold text-yellow-800 mb-2">
                Importante
              </h4>
              <div className="text-yellow-700 space-y-2">
                <p>
                  • Se você avistou essa pessoa ou tem informações sobre seu paradeiro, 
                  entre em contato imediatamente com a Polícia Civil através do telefone <strong>197</strong>.
                </p>
                <p>
                  • Em caso de emergência, ligue <strong>190</strong>.
                </p>
                <p>
                  • Todas as informações enviadas através deste sistema são tratadas com confidencialidade.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonDetailPage;
