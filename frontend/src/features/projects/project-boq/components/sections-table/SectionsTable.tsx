'use client';

import styles from './sections-table.module.css';
import { useState } from 'react';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { z } from 'zod';
import AddButton from '@/components/controls/add-button/AddButton';
import { ImportData } from '../import-data/ImportData';
import { SectionSchema } from '../../schema/sectionSchema';
import { LocationDTO } from '@/features/projects/project-locations/schema/locationSchema';
import { useSectionsTable } from './useSectionsTable';
import { useTranslations } from 'next-intl';

export type SectionRow = z.infer<typeof SectionSchema> & {
  isNew?: boolean;
};

type Props = {
  projectId: number;
  initialData: SectionRow[];
  locations: LocationDTO[];
};

export const SectionsTable = ({ projectId, initialData, locations }: Props) => {
  const [sections, setSections] = useState<SectionRow[]>(initialData);
  const [editingId, setEditingId] = useState<number | null>(null);
  const tST = useTranslations('ProjectBoq.sections');

  console.log('locations', locations);
  
  const {
    handleAdd,
    handleCancel,
    handleDelete,
    handleEdit,
    handleImport,
    handleSave,
    columns,
  } = useSectionsTable({
    editingId,
    setEditingId,
    sections,
    setSections,
    projectId,
  });

  const table = useReactTable({
    data: sections,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableActions}>
        <ImportData onData={handleImport}/>
        <AddButton onAdd={handleAdd} />
      </div>
      <table className={styles.table}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className={styles.tableHeader}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className={styles.emptyState}>
                {tST('no_data')}
              </td>
            </tr>
          ) : (
            table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className={`${styles.tableRow} ${
                  editingId === row.original.id ? styles.editingRow : ''
                }`}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className={styles.tableCell}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
