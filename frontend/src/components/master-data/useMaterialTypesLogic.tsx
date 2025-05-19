import { useMemo, useState, useCallback } from 'react';
import { MaterialTypeDTO } from '@/api/types';
import { materialTypesApi } from '@/api/endpoints/master-data';
import TableRowActions from '../table-row-actions/TableRowActions';

export function useMaterialTypesLogic(
  materialTypes: MaterialTypeDTO[],
  mutate: () => Promise<void | MaterialTypeDTO[]>,
  tM: (key: string) => string
) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentMaterialType, setCurrentMaterialType] = useState<
    MaterialTypeDTO | undefined
  >();

  const data = useMemo(
    () =>
      materialTypes
        .map((type) => ({
          ...type,
          id:
            typeof type.id === 'string'
              ? parseInt(type.id, 10)
              : Number(type.id),
        }))
        .sort((a, b) => a.id - b.id),
    [materialTypes]
  );

  const handleAdd = useCallback(() => {
    setCurrentMaterialType(undefined);
    setIsDialogOpen(true);
  }, []);

  const handleEdit = useCallback(
    (id: number) => {
      const materialType = materialTypes.find((type) => type.id === id);
      setCurrentMaterialType(materialType);
      setIsDialogOpen(true);
    },
    [materialTypes]
  );

  const handleSave = useCallback(
    async (materialType: MaterialTypeDTO) => {
      try {
        if (materialType.id) {
          await materialTypesApi.update(materialType);
          setCurrentMaterialType(materialType);
        } else {
          await materialTypesApi.create(materialType);
        }
        await mutate();
        setCurrentMaterialType(undefined);
        setIsDialogOpen(false);
      } catch (error) {
        console.error(tM('errors.save'), error);
      }
    },
    [mutate, tM]
  );

  const handleDelete = useCallback(
    async (id: number) => {
      if (confirm(tM('warnings.delete'))) {
        try {
          await materialTypesApi.delete(id);
        } catch (error) {
          console.error(`${tM('errors.delete')} ${id}`, error);
        }
      }
      await mutate();
    },
    [mutate, tM]
  );

  const handleView = useCallback((id: number) => {
    console.log(`view the type id: ${id}`);
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: tM('material-types.table.id'),
      },
      {
        accessorKey: 'type',
        header: tM('material-types.table.name'),
      },
      {
        accessorKey: 'groupId',
        header: tM('material-types.table.group'),
      },
      {
        id: 'actions',
        header: tM('actions.title'),
        cell: ({
          row,
        }: {
          row: { original: { id: number; type: string; groupId: number } };
        }) => {
          const materialType = row.original;
          return (
            <TableRowActions
              id={materialType.id}
              onView={handleView}
              onEdit={handleEdit}
              onDelete={handleDelete}
              disableView={true}
            />
          );
        },
      },
    ],
    [handleEdit, handleView, handleDelete, tM]
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
    currentMaterialType,
    setCurrentMaterialType,
  };
}
