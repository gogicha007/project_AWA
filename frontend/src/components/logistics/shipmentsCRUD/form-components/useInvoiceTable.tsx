import styles from './invoice-fields.module.css'
import { useMemo } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { InvoiceDTO, CurrencyDTO, VendorDTO } from '@/api/types';
import { arrayToIdValueMap } from '@/utils/helper';
import { negIdCounter } from '@/utils/helper';
import TableRowActions from '@/components/controls/table-row-actions/TableRowActions';

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
  shipmentId: number;
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
    // invoiceArray,
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

  const handleEditInvoice = (index: number, updatedInvoiceData?: InvoiceDTO) => {
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
          currency: currenciesObj[(inv as InvoiceDTO).currencyId] ?? '',
          vendor: vendorsObj[(inv as InvoiceDTO).vendorId] ?? '',
          totalAmount: inv.totalAmount ?? 0,
          isArrived: inv.isArrived ?? false,
          shipmentId: inv.shipmentId !== undefined ? inv.shipmentId : 0,
        }))
        .sort((a, b) => a.id - b.id),
    [fields, currencies, vendors]
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
        id: 'items',
        header: tVar('actions.items'),
        cell: ({ row }: { row: { original: InvoiceRow } }) => (
          <button onClick={() => openItemsDialog(row.original.id)} className={styles.itemButton}>
            {tVar('actions.items')}
          </button>
        ),
      },
      {
        id: 'actions',
        header: tVar('actions.title'),
        cell: ({ row }: { row: { original: InvoiceRow } }) => (
          <TableRowActions
            id={row.original.id ?? 0}
            onView={handleView}
            onEdit={handleEditInvoice}
            onDelete={handleRemoveInvoice}
          />
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
