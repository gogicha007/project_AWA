'use client';

import React, { useState, useMemo } from 'react';
import styles from './invoice-table.module.css';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from '@tanstack/react-table';
import TableRowActions from '@/components/controls/table-row-actions/TableRowActions';
import InvoiceDialog from './invoice-form';
import { InvoiceDTO } from '@/api/types';
import { useInvoiceTable } from './hooks/useInvoiceTable';
import { useTranslations } from 'next-intl';

type InvoiceTableProps = {
  invoices?: InvoiceDTO[];
  onView?: (id: number) => void;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
  onAdd?: () => void;
  tB: (key: string) => string;
};

const InvoiceTable: React.FC<InvoiceTableProps> = ({ invoices, tB }) => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [editInvoice, setEditInvoice] = useState<InvoiceDTO | null>(null);
  const { handleAdd, handleEdit, handleDelete, handleView } = useInvoiceTable();
  const tI = useTranslations('Invoices');

  const columns = useMemo<ColumnDef<InvoiceDTO>[]>(
    () => [
      {
        header: tI('table.invoice_number'),
        accessorKey: 'invoiceNumber',
      },
      {
        header: tI('table.vendor'),
        accessorKey: 'vendorName',
      },
      {
        header: tI('table.invoice_date'),
        accessorKey: 'invoiceDate',
      },
      {
        header: tI('table.total_amount'),
        accessorKey: 'totalAmount',
        cell: (info) => info.getValue()?.toLocaleString?.() ?? info.getValue(),
      },
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
    [tI, handleView, handleEdit, handleDelete]
  );

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
      handleAdd(invoice);
    }
    setDialogOpen(false);
    setEditInvoice(null);
  };

  return (
    <>
      <table className={styles.table}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
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
          {table.getRowModel().rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} style={{ textAlign: 'center' }}>
                {tI('table.no_invoices') ?? 'No invoices added.'}
              </td>
            </tr>
          ) : (
            table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
      <button
        type="button"
        className={styles.saveButton}
        onClick={() => {
          setEditInvoice(null);
          setDialogOpen(true);
        }}
      >
        {`${tB('add')} invoice`}
      </button>
      <InvoiceDialog
        isOpen={isDialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={handleSave}
        initialData={editInvoice || undefined}
        title={editInvoice ? tB('edit') : tB('add')}
        tVar={tI}
      />
    </>
  );
};

export default InvoiceTable;
