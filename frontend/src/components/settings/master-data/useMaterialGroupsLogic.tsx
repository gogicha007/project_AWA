import { useMemo, useState, useCallback } from 'react';
import { MaterialGroupDTO } from '@/api/types';
import { materialGroupsApi } from '@/api/endpoints/settings/master-data';
import TableRowActions from '../../controls/table-row-actions/TableRowActions';

export function useMaterialGroupsLogic(
  materialGroups: MaterialGroupDTO[],
  mutate: () => Promise<void | MaterialGroupDTO[]>,
  tM: (key: string) => string
) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentMaterialGroup, setCurrentMaterialGroup] = useState<
    MaterialGroupDTO | undefined
  >();

  const data = useMemo(
    () =>
      materialGroups
        .map((group) => ({
          ...group,
          id:
            typeof group.id === 'string'
              ? parseInt(group.id, 10)
              : Number(group.id),
        }))
        .sort((a, b) => a.id - b.id),
    [materialGroups]
  );

  const handleAdd = useCallback(() => {
    setCurrentMaterialGroup(undefined);
    setIsDialogOpen(true);
  }, []);

  const handleEdit = useCallback(
    (id: number) => {
      const materialGroup = materialGroups.find((group) => group.id === id);
      setCurrentMaterialGroup(materialGroup);
      setIsDialogOpen(true);
    },
    [materialGroups]
  );

  const handleSave = useCallback(
    async (materialGroup: MaterialGroupDTO) => {
      try {
        if (materialGroup.id) {
          await materialGroupsApi.update(materialGroup);
          setCurrentMaterialGroup(materialGroup);
        } else {
          await materialGroupsApi.create(materialGroup);
        }
        await mutate();
        setCurrentMaterialGroup(undefined);
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
          await materialGroupsApi.delete(id);
        } catch (error) {
          console.error(`${tM('errors.delete')} ${id}`, error);
        }
      }
      await mutate();
    },
    [mutate, tM]
  );

  const handleView = useCallback((id: number) => {
    console.log(`view the group id: ${id}`);
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: tM('material_groups.table.id'),
      },
      {
        accessorKey: 'name',
        header: tM('material_groups.table.name'),
      },
      {
        accessorKey: 'description',
        header: tM('material_groups.table.description'),
      },
      {
        id: 'actions',
        header: tM('actions.title'),
        cell: ({
          row,
        }: {
          row: { original: { id: number; name: string; description: string } };
        }) => {
          const materialGroup = row.original;
          return (
            <TableRowActions
              id={materialGroup.id}
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
    currentMaterialGroup,
    setCurrentMaterialGroup,
  };
}
