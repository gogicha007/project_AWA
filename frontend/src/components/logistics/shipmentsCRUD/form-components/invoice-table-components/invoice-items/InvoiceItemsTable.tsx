import { MaterialNameDTO, UnitDTO } from '@/api/types';
import styles from './invoice-items.module.css';
import { useEffect, useRef } from 'react';

type Props = {
  isOpen: boolean;
  auxData: {
    materials: MaterialNameDTO[];
    units: UnitDTO[];
  };
  invoiceId: number;
  onClose: () => void;
};

export default function InvoiceItemsTable({
  invoiceId,
  isOpen,
  auxData,
  onClose,
}: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  console.log('invoice items/invoice id', invoiceId);
  console.log(auxData);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen]);
  
  return (
    <dialog ref={dialogRef} className={styles.dialog}>
      <div className={styles.dialogHeader}>
        <h2>Invoice Id {invoiceId}</h2>
        <button type="button" className={styles.closeButton} onClick={onClose}>
          ×
        </button>
      </div>
    </dialog>
  );
}
