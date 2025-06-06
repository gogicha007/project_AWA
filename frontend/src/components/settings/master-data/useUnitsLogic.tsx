'use client';

import { useMemo, useState, useCallback } from 'react';
import { UnitDTO } from '@/api/types';
import { unitsApi } from '@/api/endpoints/settings/master-dataApi';
import TableRowActions from '../../controls/table-row-actions/TableRowActions';

export function useUnitsLogic(
  units: UnitDTO[],
  mutate: () => Promise<void | UnitDTO[]>,
  tU: (key: string) => string
) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentUnit, setCurrentUnit] = useState<UnitDTO | undefined>();
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

  const data = useMemo(
    () =>
      units
        .map((unit) => ({
          ...unit,
          id:
            typeof unit.id === 'string'
              ? parseInt(unit.id, 10)
              : Number(unit.id),
        }))
        .sort((a, b) => a.id - b.id),
    [units]
  );
  const handleAdd = useCallback(() => {
    setCurrentUnit(undefined);
    setIsDialogOpen(true);
  }, []);

  const handleEdit = useCallback(
    (id: number) => {
      const unit = units.find((group) => group.id === id);
      setCurrentUnit(unit);
      setIsDialogOpen(true);
    },
    [units]
  );

  const handleSave = useCallback(
    async (unit: UnitDTO) => {
      console.log('handle unit save', unit);
      try {
        if (unit.id) {
          await unitsApi.update(unit);
          setCurrentUnit(unit);
        } else {
          await unitsApi.create(unit);
        }
        await mutate();
        setCurrentUnit(undefined);
        setIsDialogOpen(false);
        setErrorMessage(undefined);
      } catch (error) {
        setErrorMessage(
          typeof error === 'string'
            ? `${tU('units.errors.save')}. ${error}`
            : tU('units.errors.save')
        );
        console.error(tU('units.errors.save'), error);
      }
    },
    [mutate, tU]
  );

  const handleDelete = useCallback(
    async (id: number) => {
      if (confirm(tU('units.warnings.delete'))) {
        try {
          await unitsApi.delete(id);
          setErrorMessage(undefined);
        } catch (error) {
          setErrorMessage(
            typeof error === 'string'
              ? `${tU('units.errors.delete')} ${id}. ${error}`
              : `${tU('units.errors.delete')} ${id}`
          );
          console.error(`${tU('units.errors.delete')} ${id}`, error);
        }
      }
      await mutate();
    },
    [mutate, tU]
  );

  const handleView = useCallback((id: number) => {
    console.log(`view the group id: ${id}`);
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: tU('units.table.id'),
      },
      {
        accessorKey: 'unit',
        header: tU('units.table.unit'),
      },
      {
        id: 'actions',
        header: tU('actions.title'),
        cell: ({
          row,
        }: {
          row: { original: { id: number; unit: string } };
        }) => {
          const unit = row.original;
          return (
            <TableRowActions
              id={unit.id}
              onView={handleView}
              onEdit={handleEdit}
              onDelete={handleDelete}
              disableView={true}
            />
          );
        },
      },
    ],
    [handleEdit, handleView, handleDelete, tU]
  );

  return {
    data,
    columns,
    handleAdd,
    handleEdit,
    handleSave,
    handleView,
    handleDelete,
    isDialogOpen,
    setIsDialogOpen,
    currentUnit,
    setCurrentUnit,
    errorMessage
  };
}
