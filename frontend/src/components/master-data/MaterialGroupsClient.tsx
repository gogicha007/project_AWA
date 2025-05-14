'use client';

import { useMaterialGroups } from '@/api/hooks/useMaterialGroups';
import Loader from '../loader/loader';
import { useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table';

export default function MaterialGroupsClient() {
  const { materialGroups, loading, error } = useMaterialGroups();
  const data = useMemo(() => materialGroups, []);

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
    ],
    []
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
      {materialGroups.length === 0 ? (
        <p>No material group found</p>
      ) : (
        <div>
          <table>
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
          </table>
        </div>
      )}
    </div>
  );
}
