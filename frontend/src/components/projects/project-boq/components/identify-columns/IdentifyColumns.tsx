'use client';

import styles from '../modal.module.css';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import SheetInfo from './SheetInfo';
import TableHeaders from './TableHeaders';
import { DndContext } from '@dnd-kit/core';
import SectionList from './SectionList';

type ICDialogProps = {
  isOpen: boolean;
  onClose?: () => void;
  rows: unknown[];
  sheetName: string;
};

const Identifycolumns = ({
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

  const updateRowsRange = () => {
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
    if (rowsFromRef.current) rowsFromRef.current.value = '1';
    if (rowsToRef.current) rowsToRef.current.value = String(rowsLength);
  };

  const handleSubmit = () => {
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

        <DndContext>
          <div className="flex gap-6">
            <SectionList tVar={tIC} />
            {/* table */}
            <div className="relative h-[500px] w-full overflow-auto rounded-lg border border-[var(--border)] bg-[var(--background-card)] shadow-sm">
              <table className="w-full border-separate border-spacing-0">
                <thead>
                  <TableHeaders colNumber={rowMaxWidth} />
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
                      {Array.from({ length: rowMaxWidth }, (_, i) => i + 1).map(
                        (colNo) => (
                          <td
                            key={colNo}
                            className="border border-[var(--border)] bg-[var(--background)] px-4 py-2 text-sm text-[var(--foreground)]"
                          >
                            {String((row as unknown[])[colNo - 1] ?? '')}
                          </td>
                        )
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </DndContext>

        {/* footer */}
        <div className="flex items-center justify-end gap-15">
          {/* select rows */}
          <div className="flex items-center gap-4">
            <label htmlFor="from">Select rows from</label>
            <input
              ref={rowsFromRef}
              className="h-10"
              style={{ width: '70px' }}
              type="number"
              id="from"
              defaultValue={1}
              onChange={updateRowsRange}
            />
            <label htmlFor="to">to</label>
            <input
              ref={rowsToRef}
              className="h-10"
              style={{ width: '70px' }}
              type="number"
              id="to"
              defaultValue={rowsLength}
              onChange={updateRowsRange}
            />
          </div>
          
          <button className="button primary self-end" onClick={handleSubmit}>
            {tIC('actions.submit')}
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default Identifycolumns;
