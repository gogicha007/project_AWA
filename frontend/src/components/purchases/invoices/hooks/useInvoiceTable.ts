import { useState } from 'react';
import { InvoiceDTO } from '@/api/types';

type UseInvoiceTableOptions = {
  onEditStart?: (invoice: InvoiceDTO) => void;
};

export function useInvoiceTable(
  initialInvoices: InvoiceDTO[] = [],
  options: UseInvoiceTableOptions = {}
) {
  const [invoices, setInvoices] = useState<InvoiceDTO[]>(
    initialInvoices.map(inv => ({
      ...inv,
      invoiceDate: new Date(inv.invoiceDate),
    }))
  );
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceDTO | null>(null);

  const handleAdd = (invoice: InvoiceDTO) => {
    setInvoices((prev) => [
      ...prev,
      invoice,
    ]);
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
        isArrived: false
      };
      options.onEditStart(mappedInvoice);
    }
  };

  const clearSelectedInvoice = () => setSelectedInvoice(null);

  return {
    invoices,
    selectedInvoice,
    handleAdd,
    handleEdit,
    handleDelete,
    handleView,
    handleStartEdit,
    clearSelectedInvoice,
    setInvoices,
  };
}
