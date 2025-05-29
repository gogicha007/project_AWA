'use client';

import styles from './master-data.module.css';
import { useMaterialGroups } from '@/api/hooks/useMaterialGroupsHook';
import { useTranslations } from 'next-intl';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table';
import MaterialGroupDialog from '../forms/master-data-forms/materialGroups-form';
import Loader from '../feedback/loader/loader';
import AddButton from '../controls/add-button/AddButton';
import { useMaterialGroupsLogic } from './useMaterialGroupsLogic';

export default function MaterialGroupsClient() {
  const tM = useTranslations('MasterData');
  const { materialGroups, loading, error, mutate } = useMaterialGroups();

  const {
    data,
    columns,
    handleAdd,
    handleSave,
    isDialogOpen,
    setIsDialogOpen,
    currentMaterialGroup,
  } = useMaterialGroupsLogic(materialGroups, mutate, tM);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (loading) return <Loader />;
  if (error)
    return (
      <div>
        `${tM('errors.loading')}: {String(error)}`
      </div>
    );

  return (
    <div>
      <h1 className={styles.pageTitle}>Material Groups</h1>
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
      <MaterialGroupDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={handleSave}
        initialData={currentMaterialGroup}
        title={
          currentMaterialGroup
            ? tM('material_groups.edit_form_title')
            : tM('material_groups.add_form_title')
        }
      />
    </div>
  );
}
