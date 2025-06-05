import React, { useState, useMemo } from 'react';
import styles from './shipment-form.module.css';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from '@tanstack/react-table';
import TableRowActions from '@/components/controls/table-row-actions/TableRowActions';
import InvoiceDialog from './invoice-dialog';
import { InvoiceDTO } from '@/api/types';

type Invoice = {
  id: number;
  invoiceNumber: string;
  invoiceDate: string;
  vendorName: string;
  totalAmount: number;
};

type InvoiceTableProps = {
  invoices: InvoiceDTO[];
  onView?: (id: number) => void;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
  onAdd: () => void;
  tS: (key: string) => string;
  tB: (key: string) => string;
};

const InvoiceTable: React.FC<InvoiceTableProps> = ({
  invoices,
  onView,
  onEdit,
  onDelete,
  onAdd,
  tS,
  tB,
}) => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [editInvoice, setEditInvoice] = useState<Invoice | null>(null);

  const columns = useMemo<ColumnDef<InvoiceDTO>[]>(
    () => [
      {
        header: tS('form.invoice_number'),
        accessorKey: 'invoiceNumber',
      },
      {
        header: tS('form.vendor'),
        accessorKey: 'vendorName',
      },
      {
        header: tS('form.invoice_date'),
        accessorKey: 'invoiceDate',
      },
      {
        header: tS('form.total_amount'),
        accessorKey: 'totalAmount',
        cell: (info) => info.getValue()?.toLocaleString?.() ?? info.getValue(),
      },
      {
        id: 'actions',
        header: '',
        cell: ({ row }) => (
          <TableRowActions
            id={row.original.id ?? 0}
            onView={onView}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ),
      },
    ],
    [tS, onView, onEdit, onDelete]
  );

  const table = useReactTable({
    data: invoices,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleSave = (invoice: InvoiceDTO) => {
    if (editInvoice) {
      if (invoice.id !== undefined) {
        onEdit?.(invoice.id); // or pass invoice object if needed
      }
    } else {
      onAdd();
    }
    setDialogOpen(false);
    setEditInvoice(null);
  };

  return (
    <div className={styles.formSection}>
      <h4>{tS('form.invoices_label') ?? 'Invoices'}</h4>
      <table className={styles.invoiceTable}>
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
                {tS('form.no_invoices') ?? 'No invoices added.'}
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
        {tB('add_invoice') ?? 'Add Invoice'}
      </button>
      <InvoiceDialog
        isOpen={isDialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={handleSave}
        initialData={editInvoice || undefined}
        title={editInvoice ? tB('edit_invoice') : tB('add_invoice')}
      />
    </div>
  );
};

export default InvoiceTable;
