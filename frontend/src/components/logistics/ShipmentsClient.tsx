'use client';

import styles from './shipments.module.css';
import { useState } from 'react';
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { useTranslations } from 'next-intl';
import AddButton from '../controls/add-button/AddButton';
import { useShipmentsLogic } from './useShipmentsLogic';
import { useShipments } from '@/api/hooks/shipmentsHook';
import Loader from '../feedback/loader/loader';

export default function ShipmentsClient() {
  const tS = useTranslations('Logistics');
  const { shipments, loading, error, mutate } = useShipments();
  const [sorting, setSorting] = useState<SortingState>([]);
  const {
    data,
    columns,
    handleAdd,
  } = useShipmentsLogic(shipments, mutate, tS);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
    onSortingChange: setSorting,
  });

  if (loading) return <Loader />;

  if (error)
    return (
      <div>
        `${tS('errors.loading')} : {String(error)}
      </div>
    );

  return (
    <div>
      <h1 className={styles.pageTitle}>{tS('title')}</h1>
      <div className={styles.tableContainer}>
        <div className={styles.tableActions}>
          <AddButton onAdd={handleAdd} />
        </div>
        <div className={styles.tableScrollContainer}>
          <table className={styles.table}>
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className={styles.tableHeader}
                      onClick={header.column.getToggleSortingHandler?.()}
                      style={{
                        cursor: header.column.getCanSort()
                          ? 'pointer'
                          : 'default',
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      <span className={styles.sortIcon}>
                        {header.column.getIsSorted() === 'asc' && ' 🔼'}
                        {header.column.getIsSorted() === 'desc' && ' 🔽'}
                        {header.column.getIsSorted() === false && <>&nbsp;</>}
                      </span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className={styles.tableBody}>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className={styles.tableRow}>
                  {row.getLeftVisibleCells().map((cell) => (
                    <td key={cell.id} className={styles.tableCell}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
