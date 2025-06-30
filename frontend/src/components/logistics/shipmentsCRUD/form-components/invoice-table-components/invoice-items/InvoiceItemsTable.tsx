import styles from './invoice-items.module.css';
import { useEffect, useRef, useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table';
import { useTranslations } from 'next-intl';
import { MaterialNameDTO, UnitDTO } from '@/api/types';
import { useInvoiceItemsTable } from './useInvoiceItemsTable';
import AddButton from '@/components/controls/add-button/AddButton';
import { ItemsHeader } from './ItemsHeader';

type Props = {
  isOpen: boolean;
  auxData: {
    materials: MaterialNameDTO[];
    units: UnitDTO[];
  };
  invoice: {
    id: number;
    invoiceNumber: string;
    invoiceDate: Date | string | null;
    totalAmount: number;
  };
  onClose: () => void;
};

export default function InvoiceItemsTable({
  invoice,
  isOpen,
  auxData,
  onClose,
}: Props) {
  const tII = useTranslations('InvoiceItems');
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { columns, control, fields, handleAddItem } = useInvoiceItemsTable({
    auxData,
    invoiceId: invoice.id,
    tVar: tII,
  });

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen]);

  const currentInvoiceItems = useMemo(() => {
    return fields
      .map((item, originalIndex) => ({
        ...item,
        originalIndex,
      }))
      .filter((item) => item.invoiceId === invoice.id);
  }, [fields, invoice.id]);

  const itemsTable = useReactTable({
    data: currentInvoiceItems,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row) => String(row.id), // Use database ID for row identification
  });

  return (
    <dialog ref={dialogRef} className={styles.dialog} key={invoice.id}>
      <div className={styles.dialogHeader}>
        <ItemsHeader
          control={control}
          invoice={{ num: invoice.invoiceNumber, date: invoice.invoiceDate }}
          invoiceId={invoice.id}
        />
        <button type="button" className={styles.closeButton} onClick={onClose}>
          ×
        </button>
      </div>
      <div className={styles.tableContainer}>
        <div className={styles.tableActions}>
          <AddButton onAdd={handleAddItem} />
        </div>
        <table className={styles.table} key={`table-${invoice.id}`}>
          <thead>
            {itemsTable.getHeaderGroups().map((headerGroup) => (
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
            {itemsTable.getRowModel().rows.map((row) => (
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
    </dialog>
  );
}
