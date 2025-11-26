import styles from './sections-table.module.css';
import ActionBar from '@/features/projects/shared/action-bar/action-bar';
import { ColumnDef } from '@tanstack/react-table';
import { SectionRow } from './SectionsTable';

type Props = {
  editingId: number | null;
  editingIds: number[] | null;
  onEdit: (row: SectionRow) => void;
  onSave: (row: SectionRow) => void;
  onCancel: (row: SectionRow) => void;
  onDelete: (id: number) => void;
  onFieldChange: <K extends keyof SectionRow>(
    id: number,
    field: keyof SectionRow,
    value: SectionRow[K]
  ) => void;
  tS: (key: string) => string;
};

export const sectionsColumns = ({
  editingId,
  editingIds,
  onEdit,
  onSave,
  onCancel,
  onDelete,
  onFieldChange,
  tS,
}: Props): ColumnDef<SectionRow>[] => [
  {
    header: tS('sections.field.sectionCode'),
    accessorKey: 'sectionCode',
    cell: ({ row }) => {
      // const isEditing = editingId === row.original.id;
      const isEditing = (editingIds || []).includes(row.original.id);
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
    header: tS('sections.field.sectionName'),
    accessorKey: 'sectionName',
    cell: ({ row }) => {
      // const isEditing = editingId === row.original.id;
      const isEditing = (editingIds || []).includes(row.original.id);
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
    header: tS('sections.field.totalAmount'),
    accessorKey: 'totalAmount',
    cell: ({ row }) => {
      // const isEditing = editingId === row.original.id;
      const isEditing = (editingIds || []).includes(row.original.id);
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
    header: tS('actions.title'),
    cell: ({ row }) => {
      // const isEditing = editingId === row.original.id;
      const isEditing = (editingIds || []).includes(row.original.id);
      const isAnyRowEditing = editingId !== null;

      return (
        <ActionBar
          isEditing={isEditing}
          isAnyRowEditing={isAnyRowEditing}
          onCancel={onCancel}
          onDelete={onDelete}
          onEdit={onEdit}
          onSave={onSave}
          row={row.original}
        />
      );
    },
  },
];
