import styles from './invoice-fields.module.css';
import React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table';
import { CurrencyDTO, VendorDTO, UnitDTO, MaterialNameDTO } from '@/api/types';
import { useTranslations } from 'next-intl';
import { useInvoiceTable } from './useInvoiceTable';
import { InvoiceRow } from './invoiceTableColumns';
import AddButton from '@/components/controls/add-button/AddButton';
import InvoiceItemsTable from './invoice-items/InvoiceItemsTable';
import { SnackbarControls } from '../../../../feedback/snackbar/snackbarTypes';

type Props = {
  auxData: {
    currencies: Partial<CurrencyDTO>[];
    vendors: Partial<VendorDTO>[];
    materials: MaterialNameDTO[];
    units: UnitDTO[];
  };
  snackbarControls?: SnackbarControls;
};

const InvoiceFields = ({ auxData, snackbarControls }: Props) => {
  const tI = useTranslations('Invoices');
  const {
    columns,
    currentInvoice,
    fields,
    handleAddInvoice,
    isDialogOpen,
    setIsDialogOpen,
    updateInvoiceTotalAmount,
  } = useInvoiceTable({
    auxData,
    snackbarControls,
    tVar: tI,
  });

  const table = useReactTable({
    data: fields as InvoiceRow[],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  console.log('invoice fields', fields)
  return (
    <>
      <div className={styles.tableContainer}>
        <div className={styles.tableActions}>
          <AddButton onAdd={handleAddInvoice} />
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
      <InvoiceItemsTable
        auxData={auxData}
        isOpen={isDialogOpen}
        invoice={{
          id: currentInvoice?.id || 0,
          invoiceNumber: currentInvoice?.invoiceNumber || '',
          invoiceDate: currentInvoice?.invoiceDate || null,
          totalAmount: currentInvoice?.totalAmount || 0,
        }}
        onClose={(totalAmount?: number) => {
          if (typeof totalAmount === 'number' && currentInvoice?.id) {
            updateInvoiceTotalAmount(currentInvoice.id, totalAmount);
          }
          setIsDialogOpen(false);
        }}
      />
    </>
  );
};

export default InvoiceFields;
