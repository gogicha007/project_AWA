'use client';

import { useState, useEffect, useCallback } from 'react';
import { materialGroupsApi } from '../endpoints/settings/master-data';
import { MaterialGroupDTO } from '../types';
import { useAuth } from '@/context/auth';

export function useMaterialGroups() {
  const [materialGroups, setMaterialGroups] = useState<MaterialGroupDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown | null>(null);
  const { currentUser, loading: authLoading } = useAuth();

  const fetchMaterialGroups = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await materialGroupsApi.getAll();
      setMaterialGroups(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const mutate = useCallback(() => {
    if (!authLoading) {
      return fetchMaterialGroups();
    }
    return Promise.resolve();
  }, [authLoading, fetchMaterialGroups]);

  useEffect(() => {
    if (authLoading) return;
    fetchMaterialGroups();
  }, [authLoading, currentUser?.uid, fetchMaterialGroups]);

  return { materialGroups, loading: loading || authLoading, error, mutate };
}
