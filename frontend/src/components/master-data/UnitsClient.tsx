'use client';

import styles from './master-data.module.css';
import { useState, useEffect } from 'react';
import { useUnits } from '@/api/hooks/useUnitsHook';
import { useTranslations } from 'next-intl';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table';
import Loader from '../feedback/loader/loader';
import AddButton from '../controls/add-button/AddButton';
import { useUnitsLogic } from './useUnitsLogic';
import UnitDialog from '../forms/master-data-forms/units-form';
import Snackbar from '../feedback/snackbar/snackbar';

export default function UnitsClient() {
  const tU = useTranslations('MasterData');
  const { units, loading, error, mutate } = useUnits();

  const {
    data,
    columns,
    handleAdd,
    handleSave,
    isDialogOpen,
    setIsDialogOpen,
    currentUnit,
    errorMessage,
  } = useUnitsLogic(units, mutate, tU);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    if (errorMessage) setSnackbarOpen(true);
  }, [errorMessage]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (loading) return <Loader />;
  if (error)
    return (
      <div>
        `${tU('units.errors.loading')}: {String(error)}`
      </div>
    );

  return (
    <div>
      <h1 className={styles.pageTitle}>Units</h1>
      <div className={styles.tableContainer}>
        <div className={styles.tableActions}>
          <AddButton onAdd={handleAdd} />
        </div>
        <table className={styles.table}>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className={styles.tableHeader}>
                    {flexRender(
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
      <Snackbar
        message={errorMessage || ''}
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
      />
      <UnitDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={handleSave}
        initialData={currentUnit}
        title={
          currentUnit ? tU('units.edit_form_title') : tU('units.add_form_title')
        }
      />
    </div>
  );
}
