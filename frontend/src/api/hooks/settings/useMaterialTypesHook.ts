'use client';

import { useState, useEffect, useCallback } from 'react';
import { materialTypesApi } from '../../endpoints/settings/master-data';
import { MaterialTypeDTO } from '../../types';
import { useAuth } from '@/context/auth';

export function useMaterialTypes() {
  const [materialTypes, setMaterialTypes] = useState<MaterialTypeDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown | null>(null);
  const { currentUser, loading: authLoading } = useAuth();

  const fetchMaterialTypes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await materialTypesApi.getAll();
      setMaterialTypes(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const mutate = useCallback(() => {
    if (!authLoading) {
      return fetchMaterialTypes();
    }
    return Promise.resolve();
  }, [authLoading, fetchMaterialTypes]);

  useEffect(() => {
    if (authLoading) return;
    fetchMaterialTypes();
  }, [authLoading, currentUser?.uid, fetchMaterialTypes]);

  return { materialTypes, loading: loading || authLoading, error, mutate };
}
