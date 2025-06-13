'use client';

import { useEffect, useState, useCallback } from 'react';
import { InvoiceDTO } from '@/api/types';
import { invoiceApi } from '@/api/endpoints/purchases/invoiceApi';
import { useAuth } from '@/context/auth';

export function useInvoiceApi() {
  const [invoices, setInvoices] = useState<InvoiceDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown | null>(null);
  const { currentUser, loading: authLoading } = useAuth();

  const fetchInvoices = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await invoiceApi.getAll();
      setInvoices(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const mutate = useCallback(() => {
    if (!authLoading) return fetchInvoices;
  }, [authLoading, fetchInvoices]);

  useEffect(() => {
    if (authLoading) return;
    fetchInvoices();
  }, [authLoading, currentUser?.uid, fetchInvoices]);

  return { invoices, loading, error, mutate };
}
