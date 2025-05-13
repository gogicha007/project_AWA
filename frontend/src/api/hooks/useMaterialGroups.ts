'use client';

import { useState, useEffect } from 'react';
import { materialGroupsApi } from '../endpoints/settings';
import { MaterialGroupDTO } from '../types';

export function useMaterialGroups() {
  const [materialGroups, setMaterialGroups] = useState<MaterialGroupDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown | null>(null);

  useEffect(() => {
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
  }, []);

  return { materialGroups, loading, error };
}
