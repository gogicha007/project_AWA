'use client';

import { useState, useEffect, useCallback } from 'react';
import { vendorsApi } from '@/api/endpoints/settings/vendors';
import { useAuth } from '@/context/auth';
import { VendorDTO } from '@/api/types';

export function useVendors() {
  const [vendors, setVendors] = useState<VendorDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown | null>(null);
  const { currentUser, loading: authLoading } = useAuth();

  const fetchVendors = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await vendorsApi.getAll();
      setVendors(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const mutate = useCallback(() => {
    if (!authLoading) return fetchVendors();
    return Promise.resolve();
  }, [authLoading, fetchVendors]);

  useEffect(() => {
    if (authLoading) return;
    fetchVendors();
  }, [authLoading, currentUser?.uid, fetchVendors]);

  return { vendors, loading: loading || authLoading, error, mutate };
}
