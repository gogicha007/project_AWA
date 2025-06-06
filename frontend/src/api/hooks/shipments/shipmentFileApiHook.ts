'use client';

import { useEffect, useState, useCallback } from 'react';
import { ShipmentDTO } from '../../types';
import { shipmentApi } from '../../endpoints/shipments/shipmentApi';
import { useAuth } from '@/context/auth';

export function useShipmentApi() {
  const [shipments, setShipments] = useState<ShipmentDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown | null>(null);
  const { currentUser, loading: authLoading } = useAuth();

  const fetchFiles = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await shipmentApi.getAll();
      setShipments(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const mutate = useCallback(() => {
    if (!authLoading) return fetchFiles();
    return Promise.resolve();
  }, [authLoading, fetchFiles]);

  useEffect(() => {
    if (authLoading) return;
    fetchFiles();
  }, [authLoading, currentUser?.uid, fetchFiles]);

  return { shipments, loading, error, mutate };
}
