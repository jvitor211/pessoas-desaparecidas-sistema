export const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  } catch {
    return dateString;
  }
};

export const formatDateTime = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return dateString;
  }
};

export const formatPhone = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  
  if (cleaned.length === 10) {
    return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  }
  
  if (cleaned.length === 11) {
    return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  }
  
  return phone;
};

export const maskPhone = (value: string): string => {
  const cleaned = value.replace(/\D/g, '');
  
  if (cleaned.length <= 2) {
    return cleaned;
  }
  
  if (cleaned.length <= 6) {
    return cleaned.replace(/(\d{2})(\d+)/, '($1) $2');
  }
  
  if (cleaned.length <= 10) {
    return cleaned.replace(/(\d{2})(\d{4})(\d+)/, '($1) $2-$3');
  }
  
  return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
};

export const getStatusColor = (status: 'DESAPARECIDA' | 'LOCALIZADA'): string => {
  return status === 'DESAPARECIDA' ? 'text-red-600 bg-red-100' : 'text-green-600 bg-green-100';
};

export const getStatusText = (status: 'DESAPARECIDA' | 'LOCALIZADA'): string => {
  return status === 'DESAPARECIDA' ? 'Desaparecida' : 'Localizada';
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};
