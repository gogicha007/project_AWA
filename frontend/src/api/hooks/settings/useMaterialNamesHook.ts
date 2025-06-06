'use client';

import { useState, useEffect, useCallback } from 'react';
import { materialNamesApi } from '../../endpoints/settings/master-dataApi';
import { MaterialNameDTO } from '../../types';
import { useAuth } from '@/context/auth';

export function useMaterialNames() {
  const [materialNames, setMaterialNames] = useState<MaterialNameDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown | null>(null);
  const { currentUser, loading: authLoading } = useAuth();

  const fetchMaterialNames = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await materialNamesApi.getAll();
      setMaterialNames(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const mutate = useCallback(() => {
    if (!authLoading) {
      return fetchMaterialNames();
    }
    return Promise.resolve();
  }, [authLoading, fetchMaterialNames]);

  useEffect(() => {
    if (authLoading) return;
    fetchMaterialNames();
  }, [authLoading, currentUser?.uid, fetchMaterialNames]);

  return { materialNames, loading: loading || authLoading, error, mutate };
}
