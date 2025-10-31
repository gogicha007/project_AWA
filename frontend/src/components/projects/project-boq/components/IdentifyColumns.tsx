'use client';

import styles from 'modal.module.css';
import { useEffect, useRef  } from 'react';
import { useTranslations } from 'next-intl';

type ICDialogProps = {
  isOpen: boolean;
  onClose?: () => void;
};

const Identifycolumns = ({ isOpen, onClose }: ICDialogProps) => {
  const identifyColumnsRef = useRef<HTMLDialogElement>(null);
  const tIC = useTranslations('ProjectBoq')

  useEffect(() => {
    const identifyColsDialog = identifyColumnsRef.current;
    if (!identifyColsDialog) return;

    if (isOpen) {
      identifyColsDialog.showModal();
    } else {
      identifyColsDialog.close();
    }
  }, [isOpen]);

  return (
    <dialog
      ref={identifyColumnsRef}
      className={styles.dialog}
      onClose={onClose}
    >
      <div className={styles.dialogHeader}>
        <h2>{tIC('identify_columns')}</h2>
        <button type="button" className={styles.closeButton} onClick={onClose}>
          ×
        </button>
      </div>
      <table>
        <tr>
          <th>unidenitified</th>
        </tr>
        <tr>
          <td>data</td>
        </tr>
      </table>
    </dialog>
  );
};

export default Identifycolumns;
