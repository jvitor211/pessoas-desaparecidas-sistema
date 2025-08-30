import { useState, useEffect } from 'react';
import type { Person, PersonResponse, PersonSearch, ApiError } from '../types';
import { apiService } from '../services/api';
import toast from 'react-hot-toast';

export const usePersons = (initialParams: PersonSearch) => {
  const [persons, setPersons] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    totalElements: 0,
    totalPages: 0,
    currentPage: 0,
    size: 10,
    first: true,
    last: true,
  });

  const fetchPersons = async (params: PersonSearch) => {
    setLoading(true);
    setError(null);
    
    try {
      const response: PersonResponse = await apiService.getPersons(params);
      setPersons(response.content);
      setPagination({
        totalElements: response.totalElements,
        totalPages: response.totalPages,
        currentPage: response.number,
        size: response.size,
        first: response.first,
        last: response.last,
      });
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message);
      toast.error(apiError.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPersons(initialParams);
  }, []);

  const refetch = (newParams: PersonSearch) => {
    fetchPersons(newParams);
  };

  return {
    persons,
    loading,
    error,
    pagination,
    refetch,
  };
};
