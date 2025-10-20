'use-client';

import styles from './select-sheet-name.module.css';
import { useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';

type Props = {
  isOpen: boolean;
  onClose?: () => void;
  onSelect?: () => void;
};

export default function SelectSheetName({ isOpen, onClose }: Props) {
  const sheetNamesDialogRef = useRef<HTMLDialogElement>(null);
  const tS = useTranslations('ProjectBoq');

  useEffect(() => {
    const sheetNamesDialog = sheetNamesDialogRef.current;

    if (!sheetNamesDialog) return;

    if (isOpen) {
      sheetNamesDialog.showModal();
    } else {
      sheetNamesDialog.close();
    }
  }, [isOpen, onClose]);

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
      <div>SelectSheetName</div>
      <button onClick={onClose}>Ok</button>
    </dialog>
  );
}
