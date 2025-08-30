import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { apiService } from '../services/api';
import type { NewInformation, ApiError } from '../types';
import { maskPhone } from '../utils/formatters';

interface FormData {
  observacoes: string;
  localizacaoAvistada: string;
  telefoneContato: string;
}

interface InformationFormProps {
  personId: number;
  onSuccess: () => void;
}

const InformationForm: React.FC<InformationFormProps> = ({ personId, onSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
    setError,
    clearErrors,
  } = useForm<FormData>({
    defaultValues: {
      observacoes: '',
      localizacaoAvistada: '',
      telefoneContato: '',
    },
  });

  const phoneValue = watch('telefoneContato') || '';

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const maskedValue = maskPhone(e.target.value);
    setValue('telefoneContato', maskedValue);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(file => {
      const isValidType = file.type.startsWith('image/');
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB
      
      if (!isValidType) {
        toast.error(`${file.name} não é um arquivo de imagem válido`);
        return false;
      }
      
      if (!isValidSize) {
        toast.error(`${file.name} é muito grande. Máximo 5MB por arquivo.`);
        return false;
      }
      
      return true;
    });
    
    if (validFiles.length + selectedFiles.length > 5) {
      toast.error('Máximo de 5 fotos permitidas');
      return;
    }
    
    setSelectedFiles(prev => [...prev, ...validFiles]);
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const validateForm = (data: FormData): boolean => {
    clearErrors();
    let isValid = true;

    // Validar observações
    if (!data.observacoes || data.observacoes.trim().length < 10) {
      setError('observacoes', {
        type: 'manual',
        message: 'As observações são obrigatórias e devem ter pelo menos 10 caracteres',
      });
      isValid = false;
    }

    // Validar telefone se preenchido
    if (data.telefoneContato && data.telefoneContato.trim()) {
      const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
      if (!phoneRegex.test(data.telefoneContato.trim())) {
        setError('telefoneContato', {
          type: 'manual',
          message: 'Formato do telefone inválido',
        });
        isValid = false;
      }
    }

    return isValid;
  };

  const onSubmit = async (data: FormData) => {
    if (!validateForm(data)) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      const informationData: NewInformation = {
        pessoaId: personId,
        observacoes: data.observacoes.trim(),
        localizacaoAvistada: data.localizacaoAvistada.trim() || undefined,
        telefoneContato: data.telefoneContato.trim() || undefined,
        fotos: selectedFiles.length > 0 ? selectedFiles : undefined,
      };

      await apiService.submitInformation(informationData);
      
      toast.success('Informações enviadas com sucesso! Obrigado pela colaboração.');
      reset();
      setSelectedFiles([]);
      onSuccess();
    } catch (error) {
      const apiError = error as ApiError;
      toast.error(apiError.message || 'Erro ao enviar informações. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Observações */}
        <div>
          <label htmlFor="observacoes" className="block text-sm font-medium text-gray-700 mb-2">
            Observações *
          </label>
          <textarea
            id="observacoes"
            {...register('observacoes')}
            rows={4}
            placeholder="Descreva as informações que você possui sobre esta pessoa. Ex: Local onde foi vista, data, características observadas, etc."
            className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
              errors.observacoes ? 'border-red-300' : 'border-gray-300'
            }`}
          />
          {errors.observacoes && (
            <p className="mt-1 text-sm text-red-600">{errors.observacoes.message}</p>
          )}
        </div>

        {/* Localização */}
        <div>
          <label htmlFor="localizacaoAvistada" className="block text-sm font-medium text-gray-700 mb-2">
            Local onde foi avistada (opcional)
          </label>
          <input
            type="text"
            id="localizacaoAvistada"
            {...register('localizacaoAvistada')}
            placeholder="Ex: Rua XV de Novembro, Centro, Cuiabá-MT"
            className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.localizacaoAvistada ? 'border-red-300' : 'border-gray-300'
            }`}
          />
          {errors.localizacaoAvistada && (
            <p className="mt-1 text-sm text-red-600">{errors.localizacaoAvistada.message}</p>
          )}
        </div>

        {/* Telefone */}
        <div>
          <label htmlFor="telefoneContato" className="block text-sm font-medium text-gray-700 mb-2">
            Telefone para contato (opcional)
          </label>
          <input
            type="tel"
            id="telefoneContato"
            value={phoneValue}
            onChange={handlePhoneChange}
            placeholder="(65) 99999-9999"
            className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.telefoneContato ? 'border-red-300' : 'border-gray-300'
            }`}
          />
          {errors.telefoneContato && (
            <p className="mt-1 text-sm text-red-600">{errors.telefoneContato.message}</p>
          )}
          <p className="mt-1 text-sm text-gray-500">
            Deixe seu telefone caso a polícia precise entrar em contato para mais informações.
          </p>
        </div>

        {/* Upload de Fotos */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Fotos (opcional - máximo 5 fotos)
          </label>
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2"
              >
                📷 Selecionar fotos
              </label>
              <p className="mt-2 text-xs text-gray-500">
                PNG, JPG, JPEG até 5MB cada
              </p>
            </div>

            {/* Preview das fotos selecionadas */}
            {selectedFiles.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {selectedFiles.map((file, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-24 object-cover rounded-md border"
                    />
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                    >
                      ×
                    </button>
                    <p className="mt-1 text-xs text-gray-500 truncate">
                      {file.name}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Botões */}
        <div className="flex flex-col sm:flex-row gap-4 pt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {isSubmitting ? 'Enviando...' : 'Enviar informações'}
          </button>
          <button
            type="button"
            onClick={() => {
              reset();
              setSelectedFiles([]);
            }}
            className="sm:w-auto px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Limpar formulário
          </button>
        </div>
      </form>

      {/* Disclaimer */}
      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-start">
          <div className="text-blue-600 text-lg mr-3">ℹ️</div>
          <div className="text-sm text-blue-800">
            <h4 className="font-semibold mb-2">Sobre suas informações:</h4>
            <ul className="space-y-1 list-disc list-inside">
              <li>Todas as informações enviadas são tratadas com confidencialidade</li>
              <li>Os dados podem ser compartilhados com a Polícia Civil para investigação</li>
              <li>Informações falsas podem resultar em responsabilização legal</li>
              <li>Em emergências, ligue 190 ou 197</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InformationForm;
