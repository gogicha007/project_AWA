import styles from './invoice-items.module.css';
import { useRef } from 'react';

type Props = {
  invoiceId: number;
  onClose: () => void;
};

export default function InvoiceItemsTable({ invoiceId, onClose }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  console.log('invoice items/invoice id', invoiceId);
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
