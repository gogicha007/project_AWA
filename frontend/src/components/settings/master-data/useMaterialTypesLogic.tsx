import { useMemo, useState, useCallback } from 'react';
import { MaterialGroupDTO, MaterialTypeDTO } from '@/api/types';
import { materialTypesApi } from '@/api/endpoints/settings/master-data';
import TableRowActions from '../../controls/table-row-actions/TableRowActions';
import { CellContext } from '@tanstack/react-table';

type MaterialTypeRow = {
  id: number;
  type: string;
  group: string;
  groupId: number;
};

export function useMaterialTypesLogic(
  materialTypes: MaterialTypeDTO[],
  materialGroups: MaterialGroupDTO[],
  mutate: () => Promise<void | MaterialTypeDTO[]>,
  tVar: (key: string) => string
) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentMaterialType, setCurrentMaterialType] = useState<
    MaterialTypeDTO | undefined
  >();
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

  const materialGroupsArray = useMemo(
    () =>
      materialGroups.map((group) => ({
        id:
          typeof group.id === 'string'
            ? parseInt(group.id, 10)
            : Number(group.id),
        name: group.name,
      })),
    [materialGroups]
  );

  const materialGroupsObject = useMemo(
    () =>
      materialGroups.reduce(
        (acc, cur) => {
          if (cur.id !== undefined) {
            acc[cur.id] = cur.name;
          }
          return acc;
        },
        {} as Record<number, string>
      ),
    [materialGroups]
  );

  const data: MaterialTypeRow[] = useMemo(
    () =>
      materialTypes
        .map((type) => ({
          ...type,
          id:
            typeof type.id === 'string'
              ? parseInt(type.id, 10)
              : Number(type.id),
          group: materialGroupsObject[type.groupId],
        }))
        .sort((a, b) => a.id - b.id),
    [materialTypes, materialGroupsObject]
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
        setErrorMessage(undefined);
      } catch (error) {
        setErrorMessage(
          typeof error === 'string'
            ? `${tVar('material_types.errors.save')}. ${error}`
            : tVar('material_types.errors.save')
        );
        console.error(tVar('material_names.errors.save'), error);
      }
    },
    [mutate, tVar]
  );

  const handleDelete = useCallback(
    async (id: number) => {
      if (confirm(tVar('material_types.warnings.delete'))) {
        try {
          await materialTypesApi.delete(id);
        } catch (error) {
          setErrorMessage(
            typeof error === 'string'
              ? `${tVar('material_types.errors.delete')} ${id}. ${error}`
              : `${tVar('material_types.errors.delete')} ${id}`
          );
          console.error(`${tVar('material_types.errors.delete')} ${id}`, error);
        }
      }
      await mutate();
    },
    [mutate, tVar]
  );

  const handleView = useCallback((id: number) => {
    console.log(`view the type id: ${id}`);
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: tVar('material_types.table.id'),
      },
      {
        accessorKey: 'type',
        header: tVar('material_types.table.name'),
        enableSorting: true,
      },
      {
        accessorKey: 'group',
        header: tVar('material_types.table.group'),
        enableSorting: true,
        cell: ({ getValue }: CellContext<MaterialTypeRow, string>) =>
          getValue(),
      },
      {
        id: 'actions',
        header: tVar('actions.title'),
        cell: ({
          row,
        }: {
          row: { original: { id: number; type: string; group: string } };
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
    [handleEdit, handleView, handleDelete, tVar]
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
    materialGroupsArray,
    errorMessage,
    setErrorMessage,
  };
}
