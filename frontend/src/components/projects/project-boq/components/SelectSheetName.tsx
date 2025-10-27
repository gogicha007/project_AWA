'use client';

import styles from './select-sheet-name.module.css';
import { useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';

type Props = {
  isOpen: boolean;
  onClose?: () => void;
  onSelect: (sheetName: string) => void;
  sheetNames: string[] | null;
};

export default function SelectSheetName({
  isOpen,
  onClose,
  sheetNames,
  onSelect,
}: Props) {
  const sheetNamesDialogRef = useRef<HTMLDialogElement>(null);
  const selectRef = useRef<HTMLSelectElement>(null);
  const tS = useTranslations('ProjectBoq');

  useEffect(() => {
    const sheetNamesDialog = sheetNamesDialogRef.current;

    if (!sheetNamesDialog) return;

    if (isOpen) {
      sheetNamesDialog.showModal();
    } else {
      sheetNamesDialog.close();
    }
  }, [isOpen]);

  const handleSelect = () => {
    const value = selectRef.current?.value || '';
    onSelect(value);
    onClose?.();
  };

  return (
    <dialog
      ref={sheetNamesDialogRef}
      className={styles.dialog}
      onClose={onClose}
    >
      <div className={styles.dialogHeader}>
        <h2>{tS('select_sheet')}</h2>
        <button type="button" className={styles.closeButton} onClick={onClose}>
          ×
        </button>
      </div>
      <div className="flex flex-col items-center gap-4 p-8">
        <select
          ref={selectRef}
          defaultValue={sheetNames?.[0] || ''}
          aria-label="Sheet name"
        >
          {sheetNames &&
            sheetNames.map((name, idx) => (
              <option key={idx} value={name}>
                {name}
              </option>
            ))}
        </select>
        <button
          onClick={handleSelect}
          className={`rounded bg-green-500 px-4 py-2 text-sm text-white ${styles.button}`}
        >
          Ok
        </button>
      </div>
    </dialog>
  );
}
