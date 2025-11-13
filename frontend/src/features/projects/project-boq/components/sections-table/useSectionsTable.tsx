import { useMemo, useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { SectionRow } from './SectionsTable';
import { sectionsColumns } from './SectionsColumns';

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

  const handleAdd = () => {
    const newSection: SectionRow = {
      id: Date.now(),
      sectionCode: '',
      sectionName: '',
      totalAmount: 0,
      isNew: true,
    };
    setSections([...sections, newSection]);
    setEditingId(newSection.id);
    setOriginalRow(newSection);
  };

  const handleEdit = (row: SectionRow) => {
    setEditingId(row.id);
    setOriginalRow({ ...row });
  };

  const handleSave = async (row: SectionRow) => {
    try {
      if (row.isNew) {
        // Create new section via API
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
  };

  const handleCancel = () => {
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
  };

  const handleDelete = async (id: number) => {
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
  };

  const handleFieldChange = <K extends keyof SectionRow>(
    id: number,
    field: keyof SectionRow,
    value: SectionRow[K]
  ) => {
    setSections(
      sections.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
  };

  const columns = useMemo<ColumnDef<SectionRow>[]>(
    () =>
      sectionsColumns({
        editingId,
        onEdit: handleEdit,
        onSave: handleSave,
        onCancel: handleCancel,
        onDelete: handleDelete,
        onFieldChange: handleFieldChange,
      }),
    [editingId, sections]
  );

  return {
    handleAdd,
    handleEdit,
    handleSave,
    handleCancel,
    handleDelete,
    columns,
  };
};
