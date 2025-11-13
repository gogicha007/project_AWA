import styles from './sections-table.module.css';
import { ColumnDef } from '@tanstack/react-table';
import { FiEdit, FiSave, FiX } from 'react-icons/fi';
import { SectionRow } from './SectionsTable';
import { TiDelete } from 'react-icons/ti';

type Props = {
  editingId: number | null;
  onEdit: (row: SectionRow) => void;
  onSave: (row: SectionRow) => void;
  onCancel: () => void;
  onDelete: (id: number) => void;
  onFieldChange: <K extends keyof SectionRow>(id: number, field: keyof SectionRow, value: SectionRow[K]) => void;
};

export const sectionsColumns = ({
  editingId,
  onEdit,
  onSave,
  onCancel,
  onDelete,
  onFieldChange,
}: Props): ColumnDef<SectionRow>[] => [
  {
    header: 'Section Code',
    accessorKey: 'sectionCode',
    cell: ({ row }) => {
      const isEditing = editingId === row.original.id;
      const isAnyRowEditing = editingId !== null;

      return isEditing ? (
        <input
          type="text"
          value={row.original.sectionCode}
          onChange={(e) =>
            onFieldChange(row.original.id, 'sectionCode', e.target.value)
          }
          className={styles.input}
          placeholder="e.g. WS01"
          autoFocus
        />
      ) : (
        <span
          className={isAnyRowEditing ? styles.disabledText : ''}
          title={row.original.sectionCode}
        >
          {row.original.sectionCode || '-'}
        </span>
      );
    },
  },
  {
    header: 'Section Name',
    accessorKey: 'sectionName',
    cell: ({ row }) => {
      const isEditing = editingId === row.original.id;
      const isAnyRowEditing = editingId !== null;

      return isEditing ? (
        <input
          type="text"
          value={row.original.sectionName}
          onChange={(e) =>
            onFieldChange(row.original.id, 'sectionName', e.target.value)
          }
          className={styles.input}
          placeholder="e.g. Water Supply Section 1"
        />
      ) : (
        <span
          className={isAnyRowEditing ? styles.disabledText : ''}
          title={row.original.sectionName}
        >
          {row.original.sectionName || '-'}
        </span>
      );
    },
  },
  {
    header: 'Total Amount',
    accessorKey: 'totalAmount',
    cell: ({ row }) => {
      const isEditing = editingId === row.original.id;
      const isAnyRowEditing = editingId !== null;

      return isEditing ? (
        <input
          type="number"
          step="0.01"
          value={row.original.totalAmount}
          onChange={(e) =>
            onFieldChange(
              row.original.id,
              'totalAmount',
              parseFloat(e.target.value) || 0
            )
          }
          className={`${styles.input} ${styles.numberInput}`}
          placeholder="0.00"
        />
      ) : (
        <span className={isAnyRowEditing ? styles.disabledText : ''}>
          {row.original.totalAmount.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </span>
      );
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const isEditing = editingId === row.original.id;
      const isAnyRowEditing = editingId !== null;

      return (
        <div className={styles.actionButtons}>
          {isEditing ? (
            <>
              <button
                onClick={() => onSave(row.original)}
                className={`${styles.actionButton} ${styles.saveButton}`}
                title="Save"
              >
                <FiSave size={18} />
              </button>
              <button
                onClick={onCancel}
                className={`${styles.actionButton} ${styles.cancelButton}`}
                title="Cancel"
              >
                <FiX size={18} />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => onEdit(row.original)}
                disabled={isAnyRowEditing}
                className={`${styles.actionButton} ${styles.editButton}`}
                title={isAnyRowEditing ? 'Save or cancel current edit first' : 'Edit'}
              >
                <FiEdit size={18} />
              </button>
              <button
                onClick={() => onDelete(row.original.id)}
                disabled={isAnyRowEditing}
                className={`${styles.actionButton} ${styles.deleteButton}`}
                title={isAnyRowEditing ? 'Save or cancel current edit first' : 'Delete'}
              >
                <TiDelete size={20} />
              </button>
            </>
          )}
        </div>
      );
    },
  },
];