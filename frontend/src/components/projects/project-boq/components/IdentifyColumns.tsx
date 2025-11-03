'use client';

import styles from './modal.module.css';
import { useEffect, useRef } from 'react';
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
  const tIC = useTranslations('ProjectBoq');

  const sectionFields = [
    'sectionCode',
    'sectionName',
    'sectionType',
    'totalAmount',
  ];

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

  console.log('excel rows', rows);

  return (
    <dialog
      ref={identifyColumnsRef}
      className={styles.dialog}
      style={{ maxWidth: '82rem' }}
      onClose={onClose}
    >
      <div className={styles.dialogHeader}>
        <h2>{tIC('identify_columns')}</h2>
        <button type="button" className={styles.closeButton} onClick={onClose}>
          ×
        </button>
      </div>
      <div className="flex flex-col gap-5 px-5 py-4">
        <div className="flex gap-10">
          <p>Sheet Name: {sheetName}</p>
          <p>Row quantity: {rowsLength}</p>
          <p>Max width: {rowMaxWidth}</p>
        </div>

        <div className="flex gap-10">
          <div className="flex min-w-30 flex-col gap-2">
            <p>{tIC(`sections.title`)}</p>
            <ul className="flex flex-col gap-2">
              {sectionFields.map((field) => (
                <li value={field} key={field}>
                  {tIC(`sections.field.${field}`)}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative h-[500px] w-full overflow-auto">
            <table className="w-full border-separate border-spacing-0">
              <thead>
                <tr>
                  {Array.from({ length: rowMaxWidth + 1 }, (_, i) => i + 1).map(
                    (colNum) => (
                      <th
                        key={colNum}
                        className={`sticky top-0 border border-black bg-white px-4 py-2 ${colNum === 1 ? 'left-0 z-20' : 'z-10'}`}
                      >
                        {colNum === 1 ? '#' : `unidentified`}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    <td className="sticky left-0 z-10 border border-black bg-white px-4 py-2 font-semibold">
                      {rowIndex + 1}
                    </td>
                    {Array.from({ length: rowMaxWidth }, (_, i) => i + 1).map(
                      (colNo) => (
                        <td
                          key={colNo}
                          className="border border-black px-4 py-2"
                        >
                          {(row as unknown[])[colNo - 1] !== undefined
                            ? String((row as unknown[])[colNo - 1])
                            : ''}
                        </td>
                      )
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <button
          className="w-18 rounded bg-[var(--gray-500)] px-4 py-2 text-sm text-white"
          onClick={onClose}
        >
          {tIC('actions.submit')}
        </button>
      </div>
    </dialog>
  );
};

export default Identifycolumns;
