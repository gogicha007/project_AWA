'use client';

import { useState, useEffect } from 'react';
import { materialGroupsApi } from '../endpoints/settings';
import { MaterialGroupDTO } from '../types';
import { useAuth } from '@/context/auth';

export function useMaterialGroups() {
  const [materialGroups, setMaterialGroups] = useState<MaterialGroupDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown | null>(null);
  const { currentUser, loading: authLoading } = useAuth();

  useEffect(() => {
    if (authLoading) return;

    const fetchMaterialGroups = async () => {
      try {
        const data = await materialGroupsApi.getAll();
        setMaterialGroups(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMaterialGroups();
  }, [authLoading, currentUser?.uid]);

  return { materialGroups, loading: loading || authLoading, error };
}
