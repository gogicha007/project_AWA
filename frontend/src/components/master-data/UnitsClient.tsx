'use client';

import styles from './master-data.module.css';
import { useUnits } from '@/api/hooks/useUnitsHook';
import { useTranslations } from 'next-intl';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table';
import Loader from '../loader/loader';
import AddButton from '../add-button/AddButton';
import { useUnitsLogic } from './useUnitsLogic';
import UnitDialog from '../forms/master-data-forms/units-form';

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
  } = useUnitsLogic(units, mutate, tU);

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
