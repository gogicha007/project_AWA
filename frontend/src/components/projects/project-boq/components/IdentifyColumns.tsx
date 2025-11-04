'use client';

import styles from './modal.module.css';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

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
  const sectionFields = [
    'sectionCode',
    'sectionName',
    'sectionType',
    'totalAmount',
  ];
  const [firstRow, setFirstRow]= useState(0)
  const [lastRow, setLastRow]= useState(rows.length - 1)

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
    return filterRange(rows, firstRow, lastRow);
  }, [firstRow, lastRow, rows]);

  console.log('table', table);

  const validateRowsRange = () => {
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

    setFirstRow(Number(rowsFrom.value)-1);
    setLastRow(Number(rowsTo.value)-1);

  };

  return (
    <dialog
      ref={identifyColumnsRef}
      className={styles.dialog}
      style={{ maxWidth: '82rem' }}
      onClose={onClose}
    >
      <div className={styles.dialogHeader}>
        <h2 className="text-2xl font-semibold text-[var(--foreground)]">
          {tIC('identify_columns')}
        </h2>
        <button type="button" className={styles.closeButton} onClick={onClose}>
          ×
        </button>
      </div>
      <div className="flex flex-col gap-5 bg-[var(--background-secondary)] px-5 py-4">
        {/* sheet info */}
        <div className="flex gap-6 rounded-lg bg-[var(--background-card)] p-4 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="font-medium text-[var(--foreground-secondary)]">
              Sheet Name:
            </span>
            <span className="font-semibold text-[var(--primary-600)]">
              {sheetName}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium text-[var(--foreground-secondary)]">
              Row quantity:
            </span>
            <span className="font-semibold text-[var(--foreground)]">
              {rowsLength}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium text-[var(--foreground-secondary)]">
              Max width:
            </span>
            <span className="font-semibold text-[var(--foreground)]">
              {rowMaxWidth}
            </span>
          </div>
        </div>

        {/* sections list & table */}
        <div className="flex gap-6">
          <div className="flex min-w-30 flex-col gap-3 rounded-lg bg-[var(--background-card)] p-4 shadow-sm">
            <p className="text-lg font-semibold text-[var(--primary-600)]">
              {tIC(`sections.title`)}
            </p>
            <ul className="flex flex-col gap-2">
              {sectionFields.map((field) => (
                <li
                  value={field}
                  key={field}
                  className="rounded bg-[var(--primary-50)] px-3 py-2 text-sm font-medium text-[var(--primary-700)] transition-colors hover:bg-[var(--primary-100)]"
                >
                  {tIC(`sections.field.${field}`)}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative h-[500px] w-full overflow-auto rounded-lg border border-[var(--border)] bg-[var(--background-card)] shadow-sm">
            <table className="w-full border-separate border-spacing-0">
              <thead>
                <tr>
                  {Array.from({ length: rowMaxWidth + 1 }, (_, i) => i + 1).map(
                    (colNum) => (
                      <th
                        key={colNum}
                        className={`sticky top-0 border border-[var(--border)] bg-[var(--primary-50)] px-4 py-3 text-sm font-semibold text-[var(--primary-700)] ${colNum === 1 ? 'left-0 z-20' : 'z-10'}`}
                      >
                        {colNum === 1 ? '#' : 'unidentified'}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {table.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className="transition-colors hover:bg-[var(--gray-50)]"
                  >
                    <td className="sticky left-0 z-10 border border-[var(--border)] bg-[var(--primary-50)] px-4 py-2 text-sm font-semibold text-[var(--primary-700)]">
                      {rowIndex + 1}
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
              onChange={validateRowsRange}
            />
            <label htmlFor="to">to</label>
            <input
              ref={rowsToRef}
              className="h-10"
              style={{ width: '70px' }}
              type="number"
              id="to"
              defaultValue={rowsLength}
              onChange={validateRowsRange}
            />
          </div>
          <button className="button primary self-end" onClick={onClose}>
            {tIC('actions.submit')}
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default Identifycolumns;
