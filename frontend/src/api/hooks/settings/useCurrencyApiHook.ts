'use client';

import { useState, useEffect, useCallback } from 'react';
import { currencyApi } from '@/api/endpoints/settings/master-dataApi';
import { CurrencyDTO } from '@/api/types';
import { useAuth } from '@/context/auth';

export function useCurrencyApi() {
  const [currencies, setCurrencies] = useState<CurrencyDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown | null>(null);
  const { currentUser, loading: authLoading } = useAuth();

  const fetchCurrencies = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await currencyApi.getAll();
      setCurrencies(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const mutate = useCallback(() => {
    if (!authLoading) return fetchCurrencies();
    return Promise.resolve();
  }, [authLoading, fetchCurrencies]);

  useEffect(() => {
    if (authLoading) return;
    fetchCurrencies();
  }, [authLoading, currentUser?.uid, fetchCurrencies]);

  return { currencies, loading: loading || authLoading, error, mutate };
}
