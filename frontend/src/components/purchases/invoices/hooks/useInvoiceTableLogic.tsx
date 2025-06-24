'use client';
import { useState, useMemo } from 'react';
import { InvoiceDTO, CurrencyDTO, VendorDTO } from '@/api/types';
import TableRowActions from '@/components/controls/table-row-actions/TableRowActions';
import { arrayToIdValueMap } from '@/utils/helper';

type UseInvoiceTableOptions = {
  onEditStart?: (invoice: InvoiceDTO) => void;
};
type Props = {
  auxData: {
    currencies: Partial<CurrencyDTO>[];
    vendors: Partial<VendorDTO>[];
  };
  invoiceArray: InvoiceDTO[];
  setInvoiceArray: (invoices: InvoiceDTO[]) => void;
  tVar: (key: string) => string;
  options: UseInvoiceTableOptions;
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

export function useInvoiceTableLogic(props: Props) {
  const {
    auxData: { currencies, vendors },
    invoiceArray,
    setInvoiceArray,
    tVar,
    options,
  } = props;
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editInvoice, setEditInvoice] = useState<InvoiceDTO | null>(null);
  const [invoices, setInvoices] = useState<InvoiceDTO[]>(
    invoiceArray.map((inv) => ({
      ...inv,
      invoiceDate: new Date(inv.invoiceDate),
    }))
  );
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceDTO | null>(
    null
  );
  const currenciesObj = arrayToIdValueMap(currencies, 'code');
  const vendorsObj = arrayToIdValueMap(vendors, 'alias');

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

  console.log(data);
  const handleAddToArray = (invoice: InvoiceDTO) => {
    setInvoices((prev) => {
      const updated = [...prev, invoice];
      setInvoiceArray(updated);
      return updated;
    });
  };

  const handleAdd = () => {
    setEditInvoice(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (id: number, updated?: Partial<InvoiceDTO>) => {
    setInvoices((prev) =>
      prev.map((inv) => {
        if (inv.id !== id) return inv;
        // Only update fields that exist in InvoiceDTO and ensure types match
        return {
          ...inv,
          ...updated,
          invoiceDate: updated?.invoiceDate
            ? new Date(updated.invoiceDate)
            : inv.invoiceDate,
        };
      })
    );
  };

  const handleDelete = (id: number) => {
    setInvoices((prev) => prev.filter((inv) => inv.id !== id));
  };

  const handleView = (id: number) => {
    const invoice = invoices.find((inv) => inv.id === id) || null;
    setSelectedInvoice(invoice);
  };

  const handleStartEdit = (id: number) => {
    const invoice = invoices.find((inv) => inv.id === id) || null;
    setSelectedInvoice(invoice);
    if (invoice && options.onEditStart) {
      // Map InvoiceDTO to Invoice before passing
      const mappedInvoice: InvoiceDTO = {
        id: invoice.id ?? 0,
        vendorId: (invoice as InvoiceDTO).vendorId ?? '',
        invoiceNumber: invoice.invoiceNumber,
        invoiceDate: (invoice as InvoiceDTO).invoiceDate ?? '',
        totalAmount: (invoice as InvoiceDTO).totalAmount ?? 0,
        currencyId: invoice.currencyId,
        isArrived: false,
      };
      options.onEditStart(mappedInvoice);
    }
  };

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
          <TableRowActions
            id={row.original.id ?? 0}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ),
      },
    ],
    [tVar, handleView, handleEdit, handleDelete]
  );

  const clearSelectedInvoice = () => setSelectedInvoice(null);

  return {
    data,
    invoices,
    columns,
    selectedInvoice,
    isDialogOpen,
    setIsDialogOpen,
    editInvoice,
    setEditInvoice,
    handleAddToArray,
    handleAdd,
    handleEdit,
    handleDelete,
    handleView,
    handleStartEdit,
    clearSelectedInvoice,
    setInvoices,
  };
}
