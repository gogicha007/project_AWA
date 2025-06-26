import styles from './invoice-fields.module.css';
import React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table';
import { CurrencyDTO, VendorDTO } from '@/api/types';
import { useTranslations } from 'next-intl';
import { useInvoiceTable } from './useInvoiceTable';
import AddButton from '@/components/controls/add-button/AddButton';

type Props = {
  auxData: {
    currencies: Partial<CurrencyDTO>[];
    vendors: Partial<VendorDTO>[];
  };
  tB: (key: string) => string;
  tS: (key: string) => string;
};

const InvoiceFields = ({ auxData }: Props) => {
  const tI = useTranslations('Invoices');
  const { fields, columns, handleAddInvoice } = useInvoiceTable({
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
    </>
  );
};

export default InvoiceFields;
