'use client';

import styles from '../settings.module.css';
import { useState, useEffect, useRef } from 'react';
import { useMaterialNames } from '@/api/hooks/settings/useMaterialNamesHook';
import { useMaterialTypes } from '@/api/hooks/settings/useMaterialTypesHook';
import { useTranslations } from 'next-intl';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  SortingState,
} from '@tanstack/react-table';
import MaterialNameDialog from '../../forms/master-data-forms/materialNames-form';
import Loader from '../../feedback/loader/loader';
import AddButton from '../../controls/add-button/AddButton';
import { useMaterialNamesLogic } from './useMaterialNamesLogic';
import Snackbar from '../../feedback/snackbar/snackbar';

export default function MaterialNamesClient() {
  const tN = useTranslations('MasterData');
  const { materialNames, loading, error, mutate } = useMaterialNames();
  const {
    materialTypes,
    loading: typesLoading,
    error: typesError,
  } = useMaterialTypes();
  const [sorting, setSorting] = useState<SortingState>([]);

  const {
    data,
    columns,
    handleAdd,
    handleSave,
    isDialogOpen,
    setIsDialogOpen,
    currentMaterialName,
    materialTypesArray,
    errorMessage,
  } = useMaterialNamesLogic(materialNames, materialTypes, mutate, tN);

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    if (errorMessage) setSnackbarOpen(true);
  }, [errorMessage]);

  const tableScrollRef = useRef<HTMLDivElement>(null);
  const prevDataLength = useRef(data.length);

  useEffect(() => {
    if (data.length > prevDataLength.current) {
      tableScrollRef.current?.scrollTo({
        top: tableScrollRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
    prevDataLength.current = data.length;
  }, [data.length]);

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

  if (loading || typesLoading) return <Loader />;

  if (error || typesError)
    return (
      <div>
        `${tN('errors.loading')}: {String(error || typesError)}`
      </div>
    );

  return (
    <div>
      <h1 className={styles.pageTitle}>{tN('material_names.title')}</h1>
      <div className={styles.tableContainer}>
        <div className={styles.tableActions}>
          <AddButton onAdd={handleAdd} />
        </div>
        <div className={styles.tableScrollContainer} ref={tableScrollRef}>
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
      <MaterialNameDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={handleSave}
        initialData={currentMaterialName}
        title={
          currentMaterialName
            ? tN('material_names.edit_form_title')
            : tN('material_names.add_form_title')
        }
        tVar={tN}
        materialTypes={materialTypesArray}
      />
    </div>
  );
}
