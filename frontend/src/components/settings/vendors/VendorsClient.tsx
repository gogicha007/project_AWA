'use client';

import styles from '../settings.module.css';
import { useState, useEffect } from 'react';
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { useTranslations } from 'next-intl';
import Loader from '../../feedback/loader/loader';
import { useVendorsLogic } from './useVendorsLogic';
import { useVendors } from '@/api/hooks/settings/useVendorsHook';
import Snackbar from '../../feedback/snackbar/snackbar';
import AddButton from '@/components/controls/add-button/AddButton';
import VendorDialog from '@/components/forms/vendor-form';

export default function VendorsClient() {
  const tV = useTranslations('Vendors');
  const { vendors, loading, error, mutate } = useVendors();
  const [sorting, setSorting] = useState<SortingState>([]);
  const {
    data,
    columns,
    handleAdd,
    handleSave,
    isDialogOpen,
    setIsDialogOpen,
    currentVendor,
    errorMessage,
  } = useVendorsLogic(vendors, mutate, tV);

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    if (errorMessage) setSnackbarOpen(true);
  }, [errorMessage]);

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
        `${tV('errors.loading')}: {String(error)}`
      </div>
    );
  return (
    <div>
      <h1 className={styles.pageTitle}>{tV('title')}</h1>
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
                  {row.getVisibleCells().map((cell) => (
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
      <Snackbar
        message={errorMessage || ''}
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
      />
      <VendorDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={handleSave}
        initialData={currentVendor}
        title={currentVendor ? tV('edit_form_title') : tV('add_form_title')}
        tVar={tV}
      />
    </div>
  );
}
