'use client';

import styles from './master-data.module.css';
import { useMaterialTypes } from '@/api/hooks/useMaterialTypesHook';
import { useTranslations } from 'next-intl';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table';
import MaterialTypeDialog from '../forms/materialTypes-form';
import Loader from '../loader/loader';
import AddButton from '../add-button/AddButton';
import { useMaterialTypesLogic } from './useMaterialTypesLogic';

export default function MaterialTypesClient() {
  const tT = useTranslations('MasterData');
  const { materialTypes, loading, error, mutate } = useMaterialTypes();

  const {
    data,
    columns,
    handleAdd,
    handleSave,
    isDialogOpen,
    setIsDialogOpen,
    currentMaterialType,
  } = useMaterialTypesLogic(materialTypes, mutate, tT);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (loading) return <Loader />;
  if (error)
    return (
      <div>
        `${tT('material-tipes.errors.loading')}: {String(error)}`
      </div>
    );

  return (
    <div>
      <h1 className={styles.pageTitle}>{tT('material_types.title')}</h1>
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
      <MaterialTypeDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={handleSave}
        initialData={currentMaterialType}
        title={
          currentMaterialType
            ? tT('material_types.edit_form_title')
            : tT('material_types.add_form_title')
        }
      />
    </div>
  );
}
