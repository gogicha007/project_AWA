import { useMemo } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { InvoiceDTO, CurrencyDTO, VendorDTO } from '@/api/types';
import { arrayToIdValueMap, negIdCounter } from '@/utils/helper';
import InvoiceColumns from './invoiceTableColumns';
import { InvoiceRow } from './invoiceTableColumns';

type Props = {
  auxData: {
    currencies: Partial<CurrencyDTO>[];
    vendors: Partial<VendorDTO>[];
  };
  tVar: (key: string) => string;
};
type ShipmentFormValues = {
  invoices: InvoiceRow[];
};

export function useInvoiceTable(props: Props) {
  const { control } = useFormContext<ShipmentFormValues>();
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'invoices',
  });

  const {
    auxData: { currencies, vendors },
    tVar,
  } = props;
  const currenciesObj = useMemo(
    () => arrayToIdValueMap(currencies, 'code'),
    [currencies]
  );

  const vendorsObj = useMemo(
    () => arrayToIdValueMap(vendors, 'alias'),
    [vendors]
  );

  const openItemsDialog = (id: number) => {
    console.log('invoice id', id);
    console.log(fields);
  };

  const handleAddInvoice = (
    newInvoiceData: InvoiceDTO = {
      vendorId: 0,
      invoiceNumber: '',
      invoiceDate: new Date(),
      currencyId: 0,
    }
  ) => {
    append({
      ...newInvoiceData,
      id: negIdCounter.getId(),
      totalAmount: 0,
      isArrived: false,
    });
  };

  const handleEditInvoice = (
    index: number,
    updatedInvoiceData?: InvoiceDTO
  ) => {
    if (updatedInvoiceData) {
      update(index, {
        ...updatedInvoiceData,
        id: fields[index]?.id ?? negIdCounter.getId(),
        totalAmount: fields[index]?.totalAmount ?? 0,
        isArrived: fields[index]?.isArrived ?? false,
      });
    }
  };

  const handleRemoveInvoice = (index: number) => {
    remove(index);
  };

  const columns = InvoiceColumns({
    tVar,
    vendors,
    currencies,
    vendorsObj,
    currenciesObj,
    openItemsDialog,
    handleEditInvoice,
    handleRemoveInvoice,
  });

  return {
    fields,
    columns,
    handleAddInvoice,
    handleEditInvoice,
    handleRemoveInvoice,
  };
}
