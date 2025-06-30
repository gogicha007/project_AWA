import styles from './invoice-items.module.css';
import { useEffect, useRef, useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table';
import { useTranslations } from 'next-intl';
import { GiExitDoor } from 'react-icons/gi';
import { MaterialNameDTO, UnitDTO } from '@/api/types';
import { useInvoiceItemsTable } from './useInvoiceItemsTable';
import AddButton from '@/components/controls/add-button/AddButton';
import { ItemsHeader } from './ItemsHeader';
import { InvoiceItemRow } from './invoiceItemsTableColumns';

type Props = {
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
  isOpen: boolean;
  onClose: (totalAmount?: number) => void;
};

export default function InvoiceItemsTable({
  auxData,
  invoice,
  isOpen,
  onClose,
}: Props) {
  const tII = useTranslations('InvoiceItems');
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { columns, control, fields, getValues, handleAddItem, trigger } =
    useInvoiceItemsTable({
      auxData,
      invoiceId: invoice.id,
      tVar: tII,
    });

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen) {
      dialog.showModal();
    } else dialog.close();
  }, [isOpen]);

  const currentInvoiceItems = useMemo(() => {
    return fields
      .map((item, originalIndex) => ({
        ...item,
        originalIndex,
      }))
      .filter((item) => item.invoiceId === invoice.id);
  }, [fields, invoice.id]);

  const calculateTotal = () => {
    const formValues = getValues();
    const invoiceItems = formValues.invoiceItems || [];

    const currentTotal = invoiceItems
      .filter((item: InvoiceItemRow) => item.invoiceId === invoice.id)
      .reduce((sum: number, item: InvoiceItemRow) => {
        const total = Number(item.total) || 0;
        return sum + total;
      }, 0);

    return currentTotal;
  };

  const handleClose = async () => {
    const formValues = getValues();
    const invoiceItems = formValues.invoiceItems || [];
    const currentItems = invoiceItems.filter(
      (item: InvoiceItemRow) => item.invoiceId === invoice.id
    );

    const validationPromises = currentItems.map((_, index) => {
      const actualIndex = invoiceItems.findIndex(
        (item: InvoiceItemRow) =>
          item.invoiceId === invoice.id && item === currentItems[index]
      );
      return trigger([
        `invoiceItems.${actualIndex}.productId`,
        `invoiceItems.${actualIndex}.quantity`,
        `invoiceItems.${actualIndex}.unitId`,
        `invoiceItems.${actualIndex}.unitPrice`,
      ]);
    });

    const validationResults = await Promise.all(validationPromises);
    const isValid = validationResults.every((result) => result);

    if (!isValid) {
      alert(tII('validation.requiredFields'));
      return;
    }

    const totalAmount = calculateTotal();
    onClose(totalAmount);
  };

  const itemsTable = useReactTable({
    data: currentInvoiceItems,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row) => String(row.id),
  });

  return (
    <dialog ref={dialogRef} className={styles.dialog} key={invoice.id}>
      <div className={styles.dialogHeader}>
        <ItemsHeader
          control={control}
          invoice={{ num: invoice.invoiceNumber, date: invoice.invoiceDate }}
          invoiceId={invoice.id}
        />
        <button
          type="button"
          className={styles.closeButton}
          onClick={handleClose}
        >
          <GiExitDoor />
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
