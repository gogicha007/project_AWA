import { useMemo } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { InvoiceDTO, CurrencyDTO, VendorDTO } from '@/api/types';
import { negIdCounter } from '@/utils/helper';
import InvoiceColumns from './invoiceTableColumns';

type Props = {
  auxData: {
    currencies: Partial<CurrencyDTO>[];
    vendors: Partial<VendorDTO>[];
  };
  invoiceArray: InvoiceDTO[];
  setInvoiceArray: (invoices: InvoiceDTO[]) => void;
  tVar: (key: string) => string;
};

export interface InvoiceRow {
  id: number;
  vendorId: number;
  invoiceNumber: string;
  invoiceDate: Date | string | null;
  currencyId: number;
  totalAmount: number;
  isArrived: boolean;
}

export function useInvoiceTable(props: Props) {
  const { control } = useFormContext();
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'invoices',
  });

  const {
    auxData: { currencies, vendors },
    tVar,
  } = props;

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
    append({ ...newInvoiceData, id: negIdCounter.getId() });
  };

  const handleEditInvoice = (
    index: number,
    updatedInvoiceData?: InvoiceDTO
  ) => {
    update(index, updatedInvoiceData);
  };

  const handleRemoveInvoice = (index: number) => {
    remove(index);
  };

  const handleView = (id: number) => {
    console.log(id);
  };

  const data: InvoiceRow[] = useMemo(
    () =>
      (fields as unknown as InvoiceDTO[])
        .map((inv) => ({
          ...inv,
          id:
            typeof inv.id === 'string' ? parseInt(inv.id, 10) : Number(inv.id),
          totalAmount: inv.totalAmount ?? 0,
          isArrived: inv.isArrived ?? false,
        })),
    [fields]
  );

  const columns = InvoiceColumns({
    tVar,
    vendors,
    currencies,
    openItemsDialog,
    handleView,
    handleEditInvoice,
    handleRemoveInvoice,
  });


  return {
    data,
    fields,
    columns,
    handleAddInvoice,
    handleEditInvoice,
    handleRemoveInvoice,
  };
}
