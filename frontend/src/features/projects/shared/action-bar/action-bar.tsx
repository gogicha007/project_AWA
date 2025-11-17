import styles from './action-bar.module.css';
import { FiEdit, FiSave, FiX } from 'react-icons/fi';
import { SectionRow } from '../../project-boq/components/sections-table/SectionsTable';
import { TiDelete } from 'react-icons/ti';
import { useTranslations } from 'next-intl';

type Props = {
  isEditing: boolean;
  isAnyRowEditing: boolean;
  onCancel: () => void;
  onDelete: (id: number) => void;
  onEdit: (row: SectionRow) => void;
  onSave: (row: SectionRow) => void;
  row: SectionRow;
};

const ActionBar = ({
  isEditing,
  isAnyRowEditing,
  onCancel,
  onDelete,
  onEdit,
  onSave,
  row,
}: Props) => {
  const tA = useTranslations('ProjectBoq.actions');

  return (
    <>
      <div className={styles.actionButtons}>
        {isEditing ? (
          <>
            <button
              onClick={() => onSave(row)}
              className={`${styles.actionButton} ${styles.saveButton}`}
              title={tA('save')}
            >
              <FiSave size={18} />
            </button>
            <button
              onClick={onCancel}
              className={`${styles.actionButton} ${styles.cancelButton}`}
              title={tA('calcel')}
            >
              <FiX size={18} />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => onEdit(row)}
              disabled={isAnyRowEditing}
              className={`${styles.actionButton} ${styles.editButton}`}
              title={isAnyRowEditing ? tA('save_or_cancel') : tA('edit')}
            >
              <FiEdit size={18} />
            </button>
            <button
              onClick={() => onDelete(row.id)}
              disabled={isAnyRowEditing}
              className={`${styles.actionButton} ${styles.deleteButton}`}
              title={isAnyRowEditing ? tA('save_or_cancel') : tA('delete')}
            >
              <TiDelete size={20} />
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default ActionBar;
