'use client';

import { useEffect, useState, useCallback } from 'react';
import { ShipmentFileDTO } from '../../types';
import { shipmentFileApi } from '../../endpoints/shipments/shipmentFileApi';
import { useAuth } from '@/context/auth';

export function useShipmentFileApi() {
  const [shipmentFiles, setShipmentFiles] = useState<ShipmentFileDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown | null>(null);
  const { currentUser, loading: authLoading } = useAuth();

  const fetchFiles = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await shipmentFileApi.getAll();
      setShipmentFiles(data);
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

  return { shipmentFiles, loading, error, mutate };
}
