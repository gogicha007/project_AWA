'use client';

import styles from './modal.module.css';
import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';

type ICDialogProps = {
  isOpen: boolean;
  onClose?: () => void;
  rows: unknown[];
};

const Identifycolumns = ({ isOpen, onClose, rows }: ICDialogProps) => {
  const identifyColumnsRef = useRef<HTMLDialogElement>(null);
  const tIC = useTranslations('ProjectBoq');

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
  const rowsMaxWidth = rows.reduce(
    (acc: number, row) => Math.max(acc, (row as Array<unknown>).length),
    0
  );

  console.log('excel rows length', rowsLength);
  console.log('excel rows max', rowsMaxWidth);
  console.log('excel rows', rows);

  return (
    <dialog
      ref={identifyColumnsRef}
      className={styles.dialog}
      style={{ maxWidth: '72rem' }}
      onClose={onClose}
    >
      <div className={styles.dialogHeader}>
        <h2>{tIC('identify_columns')}</h2>
        <button type="button" className={styles.closeButton} onClick={onClose}>
          ×
        </button>
      </div>
      <div className="flex flex-col gap-5 p-4">
        <div>
          <p>Row quantity {rowsLength}</p>
          <p>Max width {rowsMaxWidth}</p>
        </div>

        <div className="flex gap-5">
          <div>
            <p>Drag&Drop items from the list below</p>
            <ul>
              <li>1-</li>
              <li>2-</li>
            </ul>
          </div>
          <div>
            <table>
              <thead>
                <tr>
                  <th>unidenitified</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>data</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <button
          className="w-18 rounded bg-[var(--gray-500)] px-4 py-2 text-sm text-white"
          onClick={onClose}
        >
          Submit
        </button>
      </div>
    </dialog>
  );
};

export default Identifycolumns;
