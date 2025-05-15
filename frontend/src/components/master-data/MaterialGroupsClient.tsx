'use client';

import styles from './master-data.module.css';
import { useMaterialGroups } from '@/api/hooks/useMaterialGroups';
import Loader from '../loader/loader';
import { useMemo, useState, useCallback } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table';

export default function MaterialGroupsClient() {
  const { materialGroups, loading, error } = useMaterialGroups();
  const [editingId, setEditingId] = useState<number | null>(null);

  const data = useMemo(
    () =>
      materialGroups.map((group) => ({
        ...group,
        id: group.id ? parseInt(group.id, 10) : 0,
      })),
    [materialGroups]
  );

  console.log(editingId);
  const handleAdd = ()=> {
    console.log('add button clicked')
  }
  const handleEdit = useCallback((id: number) => {
    setEditingId(id);
    // open modal or go to edit page
    console.log(`Editing group id: ${id}`);
  }, []);

  const handleDelete = useCallback((id: number) => {
    if (confirm('Are you sure you want to delete this Group?')) {
      console.log(`Delete group id: ${id}`);
    }
  }, []);

  const handleView = useCallback((id: number) => {
    console.log(`view the group id: ${id}`);
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
      },
      {
        accessorKey: 'name',
        header: 'Name',
      },
      {
        accessorKey: 'description',
        header: 'Description',
      },
      {
        id: 'actions',
        header: 'Actions',
        cell: ({
          row,
        }: {
          row: { original: { id: number; name: string; description: string } };
        }) => {
          const materialGroup = row.original;
          return (
            <div className={styles.actionsContainer}>
              <button
                onClick={() => handleView(materialGroup.id)}
                className={`${styles.actionButton} ${styles.viewbutton}`}
              >
                View
              </button>
              <button
                onClick={() => handleEdit(materialGroup.id)}
                className={`${styles.actionButton} ${styles.editButton}`}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(materialGroup.id)}
                className={`${styles.actionButton} ${styles.deleteButton}`}
              >
                Delete
              </button>
            </div>
          );
        },
      },
    ],
    [handleEdit, handleView, handleDelete]
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
          <button className={styles.addButton} onClick={handleAdd}>Add new item</button>
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
    </div>
  );
}
