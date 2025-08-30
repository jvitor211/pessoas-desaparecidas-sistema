import { useState, useEffect } from 'react';
import { Person, ApiError } from '../types';
import { apiService } from '../services/api';
import toast from 'react-hot-toast';

export const usePerson = (id: number | null) => {
  const [person, setPerson] = useState<Person | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPerson = async (personId: number) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiService.getPersonById(personId);
      setPerson(response);
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message);
      toast.error(apiError.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchPerson(id);
    }
  }, [id]);

  const refetch = () => {
    if (id) {
      fetchPerson(id);
    }
  };

  return {
    person,
    loading,
    error,
    refetch,
  };
};
