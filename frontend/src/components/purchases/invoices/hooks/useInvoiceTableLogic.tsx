'use client';
import { useState, useMemo } from 'react';
import { InvoiceDTO } from '@/api/types';
import TableRowActions from '@/components/controls/table-row-actions/TableRowActions';
import { ColumnDef } from '@tanstack/react-table';

type UseInvoiceTableOptions = {
  onEditStart?: (invoice: InvoiceDTO) => void;
};

// type InvoiceRow = {
//   id: number;
//   vendor: string;
//   vendorId: number;
//   InvoiceNumber: string;
//   invoiceDate: Date;
//   currency: string;
//   currencyId: number;
//   totalAmount: number;
//   isArrived: boolean;
// };

export function useInvoiceTableLogic(
  initialInvoices: InvoiceDTO[] = [],
  tVar: (key: string)=> string,
  options: UseInvoiceTableOptions = {}
) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editInvoice, setEditInvoice] = useState<InvoiceDTO | null>(null);
  const [invoices, setInvoices] = useState<InvoiceDTO[]>(
    initialInvoices.map((inv) => ({
      ...inv,
      invoiceDate: new Date(inv.invoiceDate),
    }))
  );
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceDTO | null>(
    null
  );

  const handleAddToArray = (invoice: InvoiceDTO) => {
    setInvoices((prev) => [...prev, invoice]);
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

  const columns = useMemo<ColumnDef<InvoiceDTO>[]>(
    () => [
      { header: tVar('table.vendor'), accessorKey: 'vendor' },
      { header: tVar('table.invoice_number'), accessorKey: 'invoiceNumber' },
      { header: tVar('table.invoice_date'), accessorKey: 'invoiceDate' },
      { header: tVar('table.currency'), accessorKey: 'currency' },
      { header: tVar('table.total_amount'), accessorKey: 'totalAmount' },
      { header: tVar('table.is_arrived'), accessorKey: 'isArrived' },
      {
        id: 'actions',
        header: '',
        cell: ({ row }) => (
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
