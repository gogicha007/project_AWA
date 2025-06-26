import styles from './invoice-table-actions.module.css';
import React from 'react';
import { MdRestore } from 'react-icons/md';
import { TiDelete } from 'react-icons/ti';

interface InvoiceTableActionsProps {
  id: number;
  onReset?: (id: number) => void;
  onDelete?: (id: number) => void;
  disableReset?: boolean;
  disableDelete?: boolean;
}

const InvoiceTableActions: React.FC<InvoiceTableActionsProps> = ({
  id,
  onReset,
  onDelete,
  disableReset = false,
  disableDelete = false,
}) => {
  return (
    <div className={styles.actionsContainer}>
      {onReset && (
        <button
          onClick={() => onReset(id)}
          className={`${styles.actionButton} ${styles.resetButton}`}
          disabled={disableReset}
          title="Reset"
        >
          <MdRestore size={18} />
        </button>
      )}
      {onDelete && (
        <button
          onClick={() => onDelete(id)}
          className={`${styles.actionButton} ${styles.deleteButton}`}
          disabled={disableDelete}
          title="Delete"
        >
          <TiDelete size={20} />
        </button>
      )}
    </div>
  );
};

export default InvoiceTableActions;
