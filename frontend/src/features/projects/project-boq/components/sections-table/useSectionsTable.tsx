import { useCallback, useMemo, useState, useRef } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { SectionRow } from './SectionsTable';
import { sectionsColumns } from './SectionsColumns';
import { useTranslations } from 'next-intl';
import { ImportedDataType } from '../import-data/ImportData';
import { useSectionMutations } from '../../hooks/useSectionMutations';

type Props = {
  projectId: number;
  editingIds: number[];
  setEditingIds: React.Dispatch<React.SetStateAction<number[]>>;
  sections: SectionRow[];
  setSections: React.Dispatch<React.SetStateAction<SectionRow[]>>;
};

export const useSectionsTable = ({
  projectId,
  editingIds,
  setEditingIds,
  sections,
  setSections,
}: Props) => {
  const tS = useTranslations('ProjectBoq');

  const [originalRows, setOriginalRows] = useState<SectionRow[]>([]);

  const tempIdRef = useRef<number | null>(null);

  const { createSection, updateSection, snackbar, setSnackbar } =
    useSectionMutations(
      (savedSection) => {
        setSections(
          sections.map((s) =>
            s.id === tempIdRef.current ? { ...savedSection, isNew: false } : s
          )
        );
        setEditingIds(editingIds.filter((i) => i !== tempIdRef.current));
        tempIdRef.current = null;
      },
      (updatedSection) => {
        setSections(
          sections.map((s) => (s.id === updatedSection.id ? updatedSection : s))
        );
        setEditingIds(editingIds.filter((i) => i !== updatedSection.id));
        setOriginalRows(originalRows.filter((r) => r.id !== updatedSection.id));
      }
    );

  const handleImport = (data: ImportedDataType[]) => {
    const newSections = data.map((item) => ({
      id: Date.now() + Math.random(), // temporary ID
      sectionCode: String(item.sectionCode || ''),
      sectionName: String(item.sectionName || ''),
      sectionType: String(item.sectionType || ''),
      totalAmount: Number(item.totalAmount || 0),
      locationId: item.locationId ? Number(item.locationId) : null,
      isNew: true,
    }));
    setEditingIds(newSections.map((section) => section.id));
    setSections([...sections, ...newSections]);
  };

  const handleAdd = useCallback(() => {
    const newSection: SectionRow = {
      id: Date.now(),
      sectionCode: '',
      sectionName: '',
      sectionType: '',
      totalAmount: 0,
      locationId: null,
      isNew: true,
    };
    setSections([...sections, newSection]);
    setEditingIds([...editingIds, newSection.id]);
  }, [sections, setSections, editingIds, setEditingIds]);

  const handleEdit = useCallback(
    (row: SectionRow) => {
      setEditingIds([...editingIds, row.id]);
      setOriginalRows([...originalRows, { ...row }]);
    },
    [editingIds, setEditingIds, originalRows]
  );

  const handleSave = useCallback(
    async (row: SectionRow) => {
      try {
        if (row.isNew) {
          tempIdRef.current = row.id;
          createSection({
            projectId,
            sectionCode: row.sectionCode,
            sectionName: row.sectionName,
            sectionType: row.sectionType || '',
            totalAmount: row.totalAmount,
          });
        } else {
          updateSection(row);
        }
      } catch (error) {
        console.error('Error saving section:', error);
        alert('Failed to save section. Please try again.');
      }
    },
    [projectId, createSection, updateSection]
  );

  const handleCancel = useCallback(
    (row: SectionRow) => {
      if (originalRows.includes(row)) {
        if (row.isNew) {
          // Remove unsaved new row
          setSections(sections.filter((s) => s.id !== row.id));
        } else {
          // Revert changes
          setSections(sections.map((s) => (s.id === row.id ? row : s)));
        }
      }
      setEditingIds(editingIds.filter((i) => i !== row.id));
      setOriginalRows(originalRows.filter((r) => r.id !== row.id));
    },
    [
      editingIds,
      setEditingIds,
      originalRows,
      setOriginalRows,
      sections,
      setSections,
    ]
  );

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
        editingIds,
        onEdit: handleEdit,
        onSave: handleSave,
        onCancel: handleCancel,
        onDelete: handleDelete,
        onFieldChange: handleFieldChange,
        tS,
      }),
    [
      editingIds,
      handleCancel,
      handleDelete,
      handleEdit,
      handleFieldChange,
      handleSave,
      tS,
    ]
  );

  return {
    columns,
    handleAdd,
    handleCancel,
    handleDelete,
    handleEdit,
    handleImport,
    handleSave,
    snackbar,
    setSnackbar,
    tS,
  };
};
