'use client';

import React, { useState } from 'react';
import styles from './invoice-table.module.css';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table';
import InvoiceDialog from './invoice-form';
import { InvoiceDTO } from '@/api/types';
import { useInvoiceTableLogic } from './hooks/useInvoiceTable';
import { useTranslations } from 'next-intl';
import AddButton from '@/components/controls/add-button/AddButton';
import Loader from '@/components/feedback/loader/loader';

type InvoiceTableProps = {
  invoices?: InvoiceDTO[];
  onView?: (id: number) => void;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
  onAdd?: () => void;
  tB: (key: string) => string;
};

const InvoiceTable: React.FC<InvoiceTableProps> = ({ invoices, tB }) => {
  const tI = useTranslations('Invoices');
  const [editInvoice, setEditInvoice] = useState<InvoiceDTO | null>(null);
  const {
    columns,
    isDialogOpen,
    loading,
    setIsDialogOpen,
    handleAddToArray,
    handleAdd,
    handleEdit,
  } = useInvoiceTableLogic(invoices, tI);

  const table = useReactTable({
    data: invoices ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleSave = (invoice: InvoiceDTO) => {
    if (editInvoice) {
      if (invoice.id !== undefined) {
        handleEdit?.(invoice.id);
      }
    } else {
      handleAddToArray(invoice);
    }
    setIsDialogOpen(false);
    setEditInvoice(null);
  };

  if (loading) return <Loader />;

  return (
    <>
      <div className={styles.tableContainer}>
        <div className={styles.tableActions}>
          <AddButton onAdd={handleAdd} />
        </div>
        <table className={styles.table}>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className={styles.tableHeader}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className={styles.tableRow}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className={styles.tableCell}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <InvoiceDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={handleSave}
        initialData={editInvoice || undefined}
        title={editInvoice ? tB('edit') : tB('add')}
        tVar={tI}
      />
    </>
  );
};

export default InvoiceTable;
