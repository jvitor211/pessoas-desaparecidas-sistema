import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { usePerson } from '../hooks';
import { formatDate, formatDateTime, getStatusText, formatPhone } from '../utils/formatters';
import InformationForm from '../components/InformationForm';
// Removendo imports desnecessários - usando emojis Unicode

const PersonDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const personId = id ? parseInt(id, 10) : null;
  const { person, loading, error } = usePerson(personId);
  const [showForm, setShowForm] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="card text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Carregando informações...</p>
        </div>
      </div>
    );
  }

  if (error || !person) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header Institucional */}
        <header className="pc-header">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="text-center">
              <h1 className="pc-logo text-white mb-2">
                Polícia Civil do Estado de Mato Grosso
              </h1>
              <p className="pc-subtitle">
                Sistema Integrado de Pessoas Desaparecidas • SIPD-MT
              </p>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="card text-center">
            <i className="fas fa-exclamation-triangle text-4xl text-red-500 mb-4"></i>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Erro ao carregar dados</h2>
            <p className="text-gray-600 mb-6">{error || 'Pessoa não encontrada'}</p>
            <Link to="/" className="btn btn-primary flex items-center">
              <i className="fas fa-home mr-2"></i>
              Voltar à página inicial
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Institucional da Polícia Civil */}
      <header className="pc-header">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center mb-4">
            <h1 className="pc-logo text-white mb-2">
              Polícia Civil do Estado de Mato Grosso
            </h1>
            <p className="pc-subtitle">
              Sistema Integrado de Pessoas Desaparecidas • SIPD-MT
            </p>
          </div>
          <div className="flex items-center justify-center space-x-4">
            <Link to="/" className="btn btn-secondary text-white border-white hover:bg-white hover:text-blue-600 flex items-center">
              <i className="fas fa-home mr-2"></i>
              Voltar à busca
            </Link>
            <div className="h-6 border-l border-white border-opacity-30"></div>
            <h2 className="text-xl font-bold text-white flex items-center">
              <i className="fas fa-clipboard mr-2"></i>
              Detalhes da Pessoa
            </h2>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Person Details Card */}
        <div className="card mb-8">
          {/* Status Banner */}
          <div className="flex items-center justify-between mb-6 p-4 bg-gray-50 rounded-lg border-l-4 border-blue-600">
            <span className={`status-badge ${person.status === 'DESAPARECIDA' ? 'status-desaparecida' : 'status-localizada'}`}>
              {getStatusText(person.status)}
            </span>
            <span className="text-sm text-gray-600 font-medium flex items-center">
              <i className="fas fa-id-card mr-1"></i>
              Registro: {person.id}
            </span>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Photo */}
            <div className="flex-shrink-0 flex justify-center lg:justify-start">
              {person.foto ? (
                <div className="photo-container">
                  <img
                    src={person.foto}
                    alt={`${person.nome} ${person.sobrenome}`}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const container = target.parentElement;
                      if (container) {
                        container.innerHTML = `
                          <div class="w-full h-full bg-gray-200 flex flex-col items-center justify-center">
                            <i class="fas fa-user text-4xl text-gray-400 mb-2"></i>
                            <span class="text-gray-500 text-center font-medium text-sm">
                              Foto não<br/>disponível
                            </span>
                          </div>
                        `;
                      }
                    }}
                  />
                </div>
              ) : (
                <div className="photo-container">
                  <div className="w-full h-full bg-gray-200 flex flex-col items-center justify-center">
                    <i className="fas fa-user text-4xl text-gray-400 mb-2"></i>
                    <span className="text-gray-500 text-center font-medium text-sm">
                      Sem foto<br />disponível
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Basic Info */}
            <div className="flex-1 space-y-6">
              <div className="text-center lg:text-left">
                <h2 className="text-3xl font-bold text-gray-800 mb-2 flex items-center justify-center lg:justify-start">
                  <i className="fas fa-user mr-2"></i>
                  {person.nome} {person.sobrenome}
                </h2>
                {person.idade && (
                  <p className="text-xl text-gray-600 font-medium flex items-center justify-center lg:justify-start">
                    <i className="fas fa-birthday-cake mr-2"></i>
                    {person.idade} anos
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <i className="fas fa-calendar mr-2"></i>
                    Informações do Desaparecimento
                  </h3>
                  <div className="space-y-3">
                    <div className="detail-item">
                      <div className="detail-label flex items-center">
                        <i className="fas fa-calendar mr-1"></i>
                        Data do desaparecimento
                      </div>
                      <div className="detail-value">{formatDate(person.dataDesaparecimento)}</div>
                    </div>
                    <div className="detail-item">
                      <div className="detail-label flex items-center">
                        <i className="fas fa-map-marker-alt mr-1"></i>
                        Local do desaparecimento
                      </div>
                      <div className="detail-value">{person.localDesaparecimento}</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <i className="fas fa-phone mr-2"></i>
                    Informações de Contato
                  </h3>
                  <div className="space-y-3">
                    {person.telefoneContato && (
                      <div className="detail-item">
                        <div className="detail-label flex items-center">
                          <i className="fas fa-mobile-alt mr-1"></i>
                          Telefone para contato
                        </div>
                        <div className="detail-value">{formatPhone(person.telefoneContato)}</div>
                      </div>
                    )}
                    <div className="detail-item">
                      <div className="detail-label flex items-center">
                        <i className="fas fa-clock mr-1"></i>
                        Última atualização
                      </div>
                      <div className="detail-value">{formatDateTime(person.updatedAt)}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          {person.descricao && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <i className="fas fa-file-text mr-2"></i>
                Descrição Detalhada
              </h3>
              <div className="detail-item">
                <div className="detail-value text-base leading-relaxed">
                  {person.descricao}
                </div>
              </div>
            </div>
          )}

          {/* Observations */}
          {person.observacoes && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <i className="fas fa-comment mr-2"></i>
                Observações Adicionais
              </h3>
              <div className="detail-item">
                <div className="detail-value text-base leading-relaxed">
                  {person.observacoes}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="card">
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center justify-center">
              <i className="fas fa-hand-paper mr-2"></i>
              Você tem informações sobre esta pessoa?
            </h3>
            <p className="text-gray-600 mb-6 text-lg">
              Sua colaboração pode ser <strong>fundamental</strong> para ajudar a localizar essa pessoa ou confirmar seu paradeiro.
            </p>
            <button
              onClick={() => setShowForm(!showForm)}
              className={`btn ${showForm ? 'btn-secondary' : 'btn-accent'} text-lg px-8 py-3 flex items-center`}
            >
              {showForm ? (
                <>
                  <i className="fas fa-times mr-2"></i>
                  Fechar formulário
                </>
              ) : (
                <>
                  <i className="fas fa-paper-plane mr-2"></i>
                  Enviar informações
                </>
              )}
            </button>
          </div>

          {/* Information Form */}
          {showForm && (
            <div className="mt-8 pt-6 border-t-2 border-blue-600">
              <InformationForm 
                personId={person.id} 
                onSuccess={() => setShowForm(false)}
              />
            </div>
          )}
        </div>

        {/* Important Notice */}
        <div className="card mt-8 bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-300">
          <div className="flex items-start">
            <i className="fas fa-exclamation-circle text-2xl text-yellow-600 mr-4 mt-1 flex-shrink-0"></i>
            <div className="flex-1">
              <h4 className="text-xl font-bold text-yellow-800 mb-4 flex items-center">
                <i className="fas fa-exclamation-triangle mr-2"></i>
                INFORMAÇÕES IMPORTANTES DA POLÍCIA CIVIL
              </h4>
              <div className="text-yellow-800 space-y-4 text-base">
                <div className="p-3 bg-white bg-opacity-70 rounded-lg border-l-4 border-yellow-600">
                  <p className="font-semibold flex items-start">
                    <i className="fas fa-phone mr-2 mt-0.5 flex-shrink-0"></i>
                    <span><strong>AVISTOU ESTA PESSOA?</strong> Ligue imediatamente para a Polícia Civil: <span className="text-2xl font-bold text-blue-800">197</span></span>
                  </p>
                </div>
                <div className="p-3 bg-white bg-opacity-70 rounded-lg border-l-4 border-red-600">
                  <p className="font-semibold flex items-start">
                    <i className="fas fa-exclamation-triangle mr-2 mt-0.5 flex-shrink-0"></i>
                    <span><strong>EMERGÊNCIA?</strong> Ligue para o Policiamento Militar: <span className="text-2xl font-bold text-red-800">190</span></span>
                  </p>
                </div>
                <div className="p-3 bg-white bg-opacity-70 rounded-lg border-l-4 border-green-600">
                  <p className="font-semibold flex items-start">
                    <i className="fas fa-shield-alt mr-2 mt-0.5 flex-shrink-0"></i>
                    <span><strong>CONFIDENCIALIDADE:</strong> Todas as informações são tratadas com sigilo absoluto pela Polícia Civil de MT.</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonDetailPage;
