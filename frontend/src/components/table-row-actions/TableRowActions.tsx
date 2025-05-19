import React from 'react';
import styles from './table-row-actions.module.css';
import { useTranslations } from 'next-intl';

interface TableRowActionsProps {
  id: number;
  onView?: (id: number) => void;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
  disableView?: boolean;
  disableEdit?: boolean;
  disableDelete?: boolean;
}

const TableRowActions: React.FC<TableRowActionsProps> = ({
  id,
  onView,
  onEdit,
  onDelete,
  disableView = false,
  disableEdit = false,
  disableDelete = false,
}) => {
  const tA = useTranslations('TableActions');
  return (
    <div className={styles.actionsContainer}>
      {onView && (
        <button
          onClick={() => onView(id)}
          className={`${styles.actionButton} ${styles.viewButton}`}
          disabled={disableView}
        >
          {tA('view')}
        </button>
      )}

      {onEdit && (
        <button
          onClick={() => onEdit(id)}
          className={`${styles.actionButton} ${styles.editButton}`}
          disabled={disableEdit}
        >
          {tA('edit')}
        </button>
      )}

      {onDelete && (
        <button
          onClick={() => onDelete(id)}
          className={`${styles.actionButton} ${styles.deleteButton}`}
          disabled={disableDelete}
        >
          {tA('delete')}
        </button>
      )}
    </div>
  );
};

export default TableRowActions;
