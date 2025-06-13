'use client';

import { useEffect, useState, useCallback } from 'react';
import { FreightDTO } from '@/api/types';
import { freightApi } from '@/api/endpoints/purchases/freightApi';
import { useAuth } from '@/context/auth';

export function useFreightApi() {
  const [freights, setFreights] = useState<FreightDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown | null>(null);
  const { currentUser, loading: authLoading } = useAuth();

  const fetchFreights = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await freightApi.getAll();
      setFreights(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const mutate = useCallback(() => {
    if (!authLoading) return fetchFreights;
  }, [authLoading, fetchFreights]);

  useEffect(() => {
    if (authLoading) return;
    fetchFreights();
  }, [authLoading, currentUser?.uid, fetchFreights]);

  return { freights, loading, error, mutate };
}
