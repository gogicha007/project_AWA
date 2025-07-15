import styles from './freight-fields.module.css';
import { CurrencyDTO } from '@/api/types';
import { SnackbarControls } from '@/components/feedback/snackbar/snackbarTypes';
import React from 'react';
import { useTranslations } from 'next-intl';
import AddButton from '@/components/controls/add-button/AddButton';
import { useFreightTable } from './useFreightTable';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { FreightRow } from './freightTableColumns';

type Props = {
  currencies: Partial<CurrencyDTO>[];
  snackbarControls?: SnackbarControls;
};

const FreightFields = ({ currencies, snackbarControls }: Props) => {
  const tF = useTranslations('Freights');

  const { handleAddFreight, fields, columns } = useFreightTable({
    currencies,
    snackbarControls,
    tVar: tF,
  });

  const table = useReactTable({
    data: fields as FreightRow[],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <div className={styles.tableContainer}>
        <div className={styles.tableActions}>
          <AddButton onAdd={handleAddFreight} />
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

export default FreightFields;
