'use client';

import { useState, useEffect, useCallback } from 'react';
import { unitsApi } from '../endpoints/settings/master-data';
import { UnitDTO } from '../types';
import { useAuth } from '@/context/auth';

export function useUnits() {
  const [units, setUnits] = useState<UnitDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown | null>(null);
  const { currentUser, loading: authLoading } = useAuth();

  const fetchUnits = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await unitsApi.getAll();
      setUnits(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const mutate = useCallback(() => {
    if (!authLoading) {
      return fetchUnits();
    }
    return Promise.resolve()
  }, [authLoading, fetchUnits]);

  useEffect(() => {
    if (authLoading) return;
    fetchUnits();
  }, [authLoading, currentUser?.uid, fetchUnits]);

  return { units, loading: loading || authLoading, error, mutate };
}
