'use client';

import styles from './master-data.module.css';
import { useMaterialGroups } from '@/api/hooks/useMaterialGroups';
import { materialGroupsApi } from '@/api/endpoints/master-data';
import Loader from '../loader/loader';
import { useMemo, useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table';
import MaterialGroupDialog from '../forms/materialGroups-form';
import { MaterialGroupDTO } from '@/api/types';
import TableRowActions from '../table-row-actions/TableRowActions';
import AddButton from '../add-button/AddButton';

export default function MaterialGroupsClient() {
  const tM = useTranslations('MasterData');
  const { materialGroups, loading, error, mutate } = useMaterialGroups();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentMaterialGroup, setCurrentMaterialGroup] = useState<
    MaterialGroupDTO | undefined
  >();

  const data = useMemo(
    () =>
      materialGroups
        .map((group) => ({
          ...group,
          id:
            typeof group.id === 'string'
              ? parseInt(group.id, 10)
              : Number(group.id),
        }))
        .sort((a, b) => a.id - b.id),
    [materialGroups]
  );

  const handleAdd = () => {
    setCurrentMaterialGroup(undefined);
    setIsDialogOpen(true);
  };

  const handleEdit = useCallback(
    (id: number) => {
      const materialGroup = materialGroups.find((group) => group.id === id);
      setCurrentMaterialGroup(materialGroup);
      setIsDialogOpen(true);
    },
    [materialGroups, currentMaterialGroup]
  );

  const handleSave = async (materialGroup: MaterialGroupDTO) => {
    try {
      if (materialGroup.id) {
        await materialGroupsApi.update(materialGroup);
        setCurrentMaterialGroup(materialGroup);
      } else {
        await materialGroupsApi.create(materialGroup);
      }
      await mutate();
      setCurrentMaterialGroup(undefined);
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error savint Material Groups:', error);
    }
  };

  const handleDelete = useCallback(
    async (id: number) => {
      if (confirm('Are you sure you want to delete this Group?')) {
        try {
          await materialGroupsApi.delete(id);
        } catch (error) {
          console.error(`Error deleting Material Group with id: ${id}`, error);
        }
      }
      await mutate();
    },
    [mutate]
  );

  const handleView = useCallback((id: number) => {
    console.log(`view the group id: ${id}`);
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: tM('material_groups.table.id'),
      },
      {
        accessorKey: 'name',
        header: tM('material_groups.table.name'),
      },
      {
        accessorKey: 'description',
        header: tM('material_groups.table.description'),
      },
      {
        id: 'actions',
        header: tM('actions.title'),
        cell: ({
          row,
        }: {
          row: { original: { id: number; name: string; description: string } };
        }) => {
          const materialGroup = row.original;
          return (
            <TableRowActions
              id={materialGroup.id}
              onView={handleView}
              onEdit={handleEdit}
              onDelete={handleDelete}
              disableView={true}
            />
          );
        },
      },
    ],
    [handleEdit, handleView, handleDelete, tM]
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (loading) return <Loader />;
  if (error) return <div>Error loading material groups: {String(error)}</div>;

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
