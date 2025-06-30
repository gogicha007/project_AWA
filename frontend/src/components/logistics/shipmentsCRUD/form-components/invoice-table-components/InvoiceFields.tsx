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
import AddButton from '@/components/controls/add-button/AddButton';
import InvoiceItemsTable from './invoice-items/InvoiceItemsTable';

type Props = {
  auxData: {
    currencies: Partial<CurrencyDTO>[];
    vendors: Partial<VendorDTO>[];
    materials: MaterialNameDTO[];
    units: UnitDTO[];
  };
};

const InvoiceFields = ({ auxData }: Props) => {
  const tI = useTranslations('Invoices');
  const {
    fields,
    columns,
    currentInvoice,
    handleAddInvoice,
    isDialogOpen,
    setIsDialogOpen,
  } = useInvoiceTable({
    auxData,
    tVar: tI,
  });

  const table = useReactTable({
    data: fields,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

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
        isOpen={isDialogOpen}
        invoice={{
          id: currentInvoice?.id || 0,
          invoiceNumber: currentInvoice?.invoiceNumber || '',
          invoiceDate: currentInvoice?.invoiceDate || null,
          totalAmount: currentInvoice?.totalAmount || 0,
        }}
        auxData={auxData}
        onClose={() => setIsDialogOpen(false)}
      />
    </>
  );
};

export default InvoiceFields;
