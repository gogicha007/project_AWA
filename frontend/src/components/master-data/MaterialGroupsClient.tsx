'use client';

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

  const handleEdit = useCallback((id: number) => {
    setEditingId(id);
    console.log(editingId)
    // open modal or go to edit page
    console.log(`Editing group id: ${id}`);
  },[]);

  const handleDelete = useCallback((id: number) => {
    if (confirm('Are you sure you want to delete this Group?')) {
      console.log(`Delete group id: ${id}`);
    }
  },[]);

  const handleView = useCallback((id: number) => {
    console.log(`view the group id: ${id}`);
  },[]);

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
            <div className="flex space-x-2">
              <button onClick={() => handleView(materialGroup.id)}>View</button>
              <button onClick={() => handleEdit(materialGroup.id)}>Edit</button>
              <button onClick={() => handleDelete(materialGroup.id)}>Delete</button>
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
      <h1>Material Groups</h1>
      <div>
        <table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
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
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
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
