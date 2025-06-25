import { useMemo } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { InvoiceDTO, CurrencyDTO, VendorDTO } from '@/api/types';
import { arrayToIdValueMap } from '@/utils/helper';
import { negIdCounter } from '@/utils/helper';

type Props = {
  auxData: {
    currencies: Partial<CurrencyDTO>[];
    vendors: Partial<VendorDTO>[];
  };
  invoiceArray: InvoiceDTO[];
  setInvoiceArray: (invoices: InvoiceDTO[]) => void;
  tVar: (key: string) => string;
};

type InvoiceRow = {
  id: number;
  vendor: string;
  vendorId: number;
  invoiceNumber: string;
  invoiceDate: Date | string | null;
  currency: string;
  currencyId: number;
  totalAmount: number;
  isArrived: boolean;
};

export function useInvoiceTable(props: Props) {
  const { control } = useFormContext();
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'invoices',
  });

  const {
    auxData: { currencies, vendors },
    invoiceArray,
    tVar,
  } = props;

  const currenciesObj = arrayToIdValueMap(currencies, 'code');
  const vendorsObj = arrayToIdValueMap(vendors, 'alias');

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

  const handleEditInvoice = (index: number, updatedInvoiceData: InvoiceDTO) => {
    update(index, updatedInvoiceData);
  };

  const handleRemoveInvoice = (index: number) => {
    remove(index);
  };

  const data: InvoiceRow[] = useMemo(
    () =>
      invoiceArray
        .map((inv) => ({
          ...inv,
          id:
            typeof inv.id === 'string' ? parseInt(inv.id, 10) : Number(inv.id),
          currency: currenciesObj[inv.currencyId] ?? '',
          vendor: vendorsObj[inv.vendorId] ?? '',
          totalAmount: inv.totalAmount ?? 0,
          isArrived: inv.isArrived ?? false,
        }))
        .sort((a, b) => a.id - b.id),
    [currencies, vendors]
  );

  const columns = useMemo(
    () => [
      { header: tVar('table.vendor'), accessorKey: 'vendor' },
      { header: tVar('table.invoice_number'), accessorKey: 'invoiceNumber' },
      {
        header: tVar('table.invoice_date'),
        accessorKey: 'invoiceDate',
        cell: ({ row }: { row: { original: InvoiceRow } }) => {
          const date = row.original.invoiceDate;
          if (!date) return '';
          if (typeof date === 'string')
            return (date as string).substring(0, 10);
          if (date instanceof Date) return date.toISOString().substring(0, 10);
          return String(date);
        },
      },
      { header: tVar('table.currency'), accessorKey: 'currency' },
      {
        header: tVar('table.total_amount'),
        accessorKey: 'totalAmount',
        cell: ({ row }: { row: { original: InvoiceRow } }) => {
          const value = Number(row.original.totalAmount).toFixed(2);
          return value;
        },
      },
      { header: tVar('table.is_arrived'), accessorKey: 'isArrived' },
      {
        id: 'actions',
        header: tVar('actions.title'),
        cell: ({ row }: { row: { original: InvoiceRow } }) => (
          <button onClick={() => openItemsDialog(row.original.id)}>
            {tVar('actions.title')}
          </button>
        ),
      },
    ],
    [tVar]
  );

  return {
    data,
    columns,
    handleAddInvoice,
    handleEditInvoice,
    handleRemoveInvoice,
  };
}
