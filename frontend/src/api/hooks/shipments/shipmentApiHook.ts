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

  const fetchShipments = useCallback(async () => {
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
    if (!authLoading) return fetchShipments();
    return Promise.resolve();
  }, [authLoading, fetchShipments]);

  useEffect(() => {
    if (authLoading) return;
    fetchShipments();
  }, [authLoading, currentUser?.uid, fetchShipments]);

  return { shipments, loading, error, mutate };
}
