import { useState } from 'react';

export type Invoice = {
  id: number;
  invoiceNumber: string;
  vendorName: string;
  invoiceDate: string;
  totalAmount: number;
};

type UseInvoiceTableOptions = {
  onEditStart?: (invoice: Invoice) => void;
};

export function useInvoiceTable(
  initialInvoices: Invoice[] = [],
  options: UseInvoiceTableOptions = {}
) {
  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  const handleAdd = (invoice: Omit<Invoice, 'id'>) => {
    setInvoices((prev) => [
      ...prev,
      { ...invoice, id: Date.now() }, // Simple id generation
    ]);
  };

  const handleEdit = (id: number, updated: Partial<Invoice>) => {
    setInvoices((prev) =>
      prev.map((inv) => (inv.id === id ? { ...inv, ...updated } : inv))
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
      options.onEditStart(invoice);
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
