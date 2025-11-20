import { useCallback, useMemo, useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { SectionRow } from './SectionsTable';
import { sectionsColumns } from './SectionsColumns';
import { useTranslations } from 'next-intl';

type Props = {
  sections: SectionRow[];
  setSections: React.Dispatch<React.SetStateAction<SectionRow[]>>;
  editingId: number | null;
  setEditingId: React.Dispatch<React.SetStateAction<number | null>>;
  projectId: number;
};

export const useSectionsTable = ({
  sections,
  setSections,
  editingId,
  setEditingId,
  projectId,
}: Props) => {
  const [originalRow, setOriginalRow] = useState<SectionRow | null>(null);

  const tS = useTranslations('ProjectBoq');
  const handleImport = () => {};

  const handleAdd = useCallback(() => {
    const newSection: SectionRow = {
      id: Date.now(),
      sectionCode: '',
      sectionName: '',
      totalAmount: 0,
      locationId: null,
      isNew: true,
    };
    setSections([...sections, newSection]);
    setEditingId(newSection.id);
    setOriginalRow(newSection);
  }, [sections, setSections, setEditingId]);

  const handleEdit = useCallback(
    (row: SectionRow) => {
      setEditingId(row.id);
      setOriginalRow({ ...row });
    },
    [setEditingId]
  );

  const handleSave = useCallback(
    async (row: SectionRow) => {
      try {
        if (row.isNew) {
          const response = await fetch('/api/sections', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              projectId,
              sectionCode: row.sectionCode,
              sectionName: row.sectionName,
              totalAmount: row.totalAmount,
            }),
          });

          if (!response.ok) throw new Error('Failed to create section');

          const savedSection = await response.json();

          // Update with real ID from server
          setSections(
            sections.map((s) =>
              s.id === row.id ? { ...savedSection, isNew: false } : s
            )
          );
        } else {
          // Update existing section via API
          const response = await fetch(`/api/sections/${row.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              sectionCode: row.sectionCode,
              sectionName: row.sectionName,
              totalAmount: row.totalAmount,
            }),
          });

          if (!response.ok) throw new Error('Failed to update section');

          const updatedSection = await response.json();

          setSections(
            sections.map((s) => (s.id === row.id ? updatedSection : s))
          );
        }

        setEditingId(null);
        setOriginalRow(null);
      } catch (error) {
        console.error('Error saving section:', error);
        alert('Failed to save section. Please try again.');
      }
    },
    [projectId, sections, setEditingId, setSections]
  );

  const handleCancel = useCallback(() => {
    if (originalRow) {
      if (originalRow.isNew) {
        // Remove unsaved new row
        setSections(sections.filter((s) => s.id !== originalRow.id));
      } else {
        // Revert changes
        setSections(
          sections.map((s) => (s.id === originalRow.id ? originalRow : s))
        );
      }
    }
    setEditingId(null);
    setOriginalRow(null);
  }, [sections, originalRow, setSections, setEditingId]);

  const handleDelete = useCallback(
    async (id: number) => {
      if (!confirm('Are you sure you want to delete this section?')) return;

      try {
        const response = await fetch(`/api/sections/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) throw new Error('Failed to delete section');

        setSections(sections.filter((s) => s.id !== id));
      } catch (error) {
        console.error('Error deleting section:', error);
        alert('Failed to delete section. Please try again.');
      }
    },
    [sections, setSections]
  );

  const handleFieldChange = useCallback(
    <K extends keyof SectionRow>(
      id: number,
      field: keyof SectionRow,
      value: SectionRow[K]
    ) => {
      setSections(
        sections.map((s) => (s.id === id ? { ...s, [field]: value } : s))
      );
    },
    [sections, setSections]
  );

  const columns = useMemo<ColumnDef<SectionRow>[]>(
    () =>
      sectionsColumns({
        editingId,
        onEdit: handleEdit,
        onSave: handleSave,
        onCancel: handleCancel,
        onDelete: handleDelete,
        onFieldChange: handleFieldChange,
        tS,
      }),
    [
      editingId,
      handleCancel,
      handleDelete,
      handleEdit,
      handleFieldChange,
      handleSave,
      tS,
    ]
  );

  return {
    handleAdd,
    handleCancel,
    handleDelete,
    handleEdit,
    handleImport,
    handleSave,
    columns,
    tS,
  };
};
