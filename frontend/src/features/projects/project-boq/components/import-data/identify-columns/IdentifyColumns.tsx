'use client';

import styles from '../modal.module.css';
import { useEffect, useMemo, useRef, useState } from 'react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { useTranslations } from 'next-intl';
import { ImportedDataType } from '../ImportData';
import SheetInfo from './SheetInfo';
import TableHeaders from './TableHeaders';
import FieldList from './FieldList';
import { nameColumns } from './helper';

type ICDialogProps = {
  onData?: (data: ImportedDataType[]) => void;
  isOpen: boolean;
  onClose?: () => void;
  rows: unknown[];
  sheetName: string;
};

const Identifycolumns = ({
  onData,
  isOpen,
  onClose,
  rows,
  sheetName,
}: ICDialogProps) => {
  const identifyColumnsRef = useRef<HTMLDialogElement>(null);
  const rowsFromRef = useRef<HTMLInputElement>(null);
  const rowsToRef = useRef<HTMLInputElement>(null);
  const tIC = useTranslations('ProjectBoq');
  const [firstRow, setFirstRow] = useState(0);
  const [lastRow, setLastRow] = useState<number | null>(null);
  const [columnMapping, setColumnMapping] = useState<Record<number, string>>(
    {}
  );

  useEffect(() => {
    const identifyColsDialog = identifyColumnsRef.current;
    if (!identifyColsDialog) return;

    if (isOpen) {
      identifyColsDialog.showModal();
    } else {
      identifyColsDialog.close();
    }
  }, [isOpen]);

  const rowsLength = rows.length;
  const rowMaxWidth = rows.reduce(
    (acc: number, row) => Math.max(acc, (row as Array<unknown>).length),
    0
  );

  const filterRange = (arr: unknown[], a: number, b: number) => {
    return arr.filter((_, idx) => a <= idx && idx <= b) || [];
  };

  const table = useMemo(() => {
    const endRow = lastRow !== null ? lastRow : rows.length - 1;
    return filterRange(rows, firstRow, endRow);
  }, [firstRow, lastRow, rows]);

  const updateRange = () => {
    const rowsFrom = rowsFromRef.current as HTMLInputElement;
    const rowsTo = rowsToRef.current as HTMLInputElement;

    if (!rowsFrom || !rowsTo) return;

    let fromValue = Number(rowsFrom.value);
    let toValue = Number(rowsTo.value);

    fromValue = Math.max(1, fromValue);
    toValue = Math.max(1, toValue);

    fromValue = Math.min(fromValue, rowsLength);
    toValue = Math.min(toValue, rowsLength);

    if (fromValue > toValue) {
      fromValue = toValue;
    }

    rowsFrom.value = String(fromValue);
    rowsTo.value = String(toValue);

    setFirstRow(Number(rowsFrom.value) - 1);
    setLastRow(Number(rowsTo.value) - 1);
  };

  const resetInputs = () => {
    setFirstRow(0);
    setLastRow(null);
    setColumnMapping({});
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const fieldName = active.id as string; // e.g., 'sectionCode'
      const columnNumber = over.id as number; // e.g., 2, 3, 4...

      // Update the mapping: columnNumber -> fieldName
      setColumnMapping((prev) => ({
        ...prev,
        [columnNumber]: fieldName,
      }));

      console.log(`Mapped column ${columnNumber} to ${fieldName}`);
    }
  };

  const handleRemoveMapping = (columnNumber: number) => {
    setColumnMapping((prev) => {
      const newMapping = { ...prev };
      delete newMapping[columnNumber];
      return newMapping;
    });
  };

  const handleSubmit = () => {
    console.log('Final column mapping:', columnMapping);
    console.log('table', table);
    const data: ImportedDataType[] = nameColumns(
      table,
      columnMapping
    ) as ImportedDataType[];

    if (data && onData) onData(data);

    resetInputs();
    if (onClose) onClose();
  };

  const handleClose = () => {
    resetInputs();
    if (onClose) onClose();
  };

  return (
    <dialog
      ref={identifyColumnsRef}
      className={styles.dialog}
      style={{ maxWidth: '82rem' }}
      onClose={handleClose}
    >
      <div className={styles.dialogHeader}>
        <h2 className="text-2xl font-semibold text-[var(--foreground)]">
          {tIC('identify_columns')}
        </h2>
        <button
          type="button"
          className={styles.closeButton}
          onClick={handleClose}
        >
          ×
        </button>
      </div>

      <div className="flex flex-col gap-5 bg-[var(--background-secondary)] px-5 py-4">
        <SheetInfo
          sheetName={sheetName}
          rowsLength={rowsLength}
          rowMaxWidth={rowMaxWidth}
        />

        {isOpen && (
          <DndContext onDragEnd={handleDragEnd}>
            <div className="flex gap-6">
              <FieldList tVar={tIC} usedFields={Object.values(columnMapping)} />
              {/* table */}
              <div className="relative h-[500px] w-full overflow-auto rounded-lg border border-[var(--border)] bg-[var(--background-card)] shadow-sm">
                <table className="w-full border-separate border-spacing-0">
                  <thead>
                    <TableHeaders
                      colNumber={rowMaxWidth}
                      columnMapping={columnMapping}
                      tVar={tIC}
                      onRemoveMapping={handleRemoveMapping}
                    />
                  </thead>
                  <tbody>
                    {table.map((row, rowIndex) => (
                      <tr
                        key={rowIndex}
                        className="transition-colors hover:bg-[var(--gray-50)]"
                      >
                        <td className="sticky left-0 z-10 border border-[var(--border)] bg-[var(--primary-50)] px-4 py-2 text-sm font-semibold text-[var(--primary-700)]">
                          {firstRow + rowIndex + 1}
                        </td>
                        {Array.from(
                          { length: rowMaxWidth },
                          (_, i) => i + 1
                        ).map((colNo) => (
                          <td
                            key={colNo}
                            className="border border-[var(--border)] bg-[var(--background)] px-4 py-2 text-sm text-[var(--foreground)]"
                          >
                            {String((row as unknown[])[colNo - 1] ?? '')}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </DndContext>
        )}

        {/* footer */}
        <div className="flex items-center justify-end gap-15">
          {/* select rows */}
          <div className="flex items-center gap-4">
            <label htmlFor="from">Select rows from</label>
            <input
              key={`from-${sheetName}}`}
              ref={rowsFromRef}
              className="h-10"
              style={{ width: '70px' }}
              type="number"
              id="from"
              defaultValue={1}
              onChange={updateRange}
            />
            <label htmlFor="to">to</label>
            <input
              key={`to-${sheetName}`}
              ref={rowsToRef}
              className="h-10"
              style={{ width: '70px' }}
              type="number"
              id="to"
              defaultValue={rowsLength}
              onChange={updateRange}
            />
          </div>

          <button
            className="button primary self-end"
            onClick={handleSubmit}
            disabled={Object.keys(columnMapping).length === 0}
          >
            {tIC('actions.submit')}
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default Identifycolumns;
