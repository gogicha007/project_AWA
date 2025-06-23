'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'use-intl';
import { useAuth } from '@/context/auth';
import { useCurrencyApiHook } from '@/api/hooks/settings/useCurrencyApiHook';
import { useVendorsApiHook } from '@/api/hooks/settings/useVendorsApiHook';
import { ArrToObjById } from '@/utils/helper';

export function useShipmentFormSet(id?: number) {
  const router = useRouter();
  const tS = useTranslations('Logistics');
  const { dbUserId, loading: authLoading } = useAuth();
  const { currencies, loading: currenciesLoading } = useCurrencyApiHook();
  const { vendors, loading: vendorsLoading } = useVendorsApiHook();
  const [loading, setLoading] = useState(false);

  const currenciesObj = ArrToObjById(currencies, 'id', 'code');
  const vendorsObj = ArrToObjById(vendors, 'id', 'alias');

  console.log(currenciesObj, vendorsObj)

  useEffect(() => {
    setLoading(currenciesLoading || vendorsLoading || authLoading);
  }, [currenciesLoading, vendorsLoading, authLoading]);

  useEffect(() => {
    if (
      !id ||
      authLoading ||
      dbUserId === null ||
      currenciesLoading ||
      vendorsLoading
    )
      return;
  }, [id, authLoading, currenciesLoading, dbUserId]);
  const handleCancel = () => {
    router.push('/shipments');
  };

  return {
    handleCancel,
    loading,
    tS,
  };
}
