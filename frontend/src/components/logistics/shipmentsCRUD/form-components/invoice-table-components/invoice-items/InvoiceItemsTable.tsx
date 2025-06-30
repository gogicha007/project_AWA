import styles from './invoice-items.module.css';
import { useEffect, useRef } from 'react';
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

  const itemsTable = useReactTable({
    data: fields,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <dialog ref={dialogRef} className={styles.dialog}>
      <div className={styles.dialogHeader}>
        <ItemsHeader
          control={control}
          invoice={{ num: invoice.invoiceNumber, date: invoice.invoiceDate }}
        />
        <button type="button" className={styles.closeButton} onClick={onClose}>
          ×
        </button>
      </div>
      <div className={styles.tableContainer}>
        <div className={styles.tableActions}>
          <AddButton onAdd={handleAddItem} />
        </div>
        <table className={styles.table}>
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
