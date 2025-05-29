import { useMemo, useState, useCallback } from 'react';
import { MaterialTypeDTO, MaterialNameDTO } from '@/api/types';
import { materialNamesApi } from '@/api/endpoints/master-data';
import TableRowActions from '../table-row-actions/TableRowActions';
import { CellContext } from '@tanstack/react-table';

type MaterialNameRow = {
  id: number;
  dn: string;
  pn: string;
  name: string;
  degree?: number;
  description?: string;
  type: string;
  typeId: number;
};

export function useMaterialNamesLogic(
  materialNames: MaterialNameDTO[],
  materialTypes: MaterialTypeDTO[],
  mutate: () => Promise<void | MaterialNameDTO[]>,
  tVar: (key: string) => string
) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentMaterialName, setCurrentMaterialName] = useState<
    MaterialNameDTO | undefined
  >();
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

  const materialTypesArray = useMemo(
    () =>
      materialTypes
        .map((type) => ({
          id:
            typeof type.id === 'string'
              ? parseInt(type.id, 10)
              : Number(type.id),
          type: type.type,
        }))
        .sort((a, b) => {
          const nameA = a.type.toUpperCase();
          const nameB = b.type.toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        }),
    [materialTypes]
  );

  const materialTypesObject = useMemo(
    () =>
      materialTypes.reduce(
        (acc, cur) => {
          if (cur.id !== undefined) {
            acc[cur.id] = cur.type;
          }
          return acc;
        },
        {} as Record<number, string>
      ),
    [materialTypes]
  );

  const data: MaterialNameRow[] = useMemo(
    () =>
      materialNames
        .map((name) => ({
          ...name,
          id:
            typeof name.id === 'string'
              ? parseInt(name.id, 10)
              : Number(name.id),
          type: materialTypesObject[name.typeId],
        }))
        .sort((a, b) => a.id - b.id),
    [materialNames, materialTypesObject]
  );

  const handleAdd = useCallback(() => {
    setCurrentMaterialName(undefined);
    setIsDialogOpen(true);
  }, []);

  const handleEdit = useCallback(
    (id: number) => {
      const materialName = materialNames.find((name) => name.id === id);
      setCurrentMaterialName(materialName);
      setIsDialogOpen(true);
    },
    [materialNames]
  );

  const handleSave = useCallback(
    async (materialName: MaterialNameDTO) => {
      try {
        if (materialName.id) {
          await materialNamesApi.update(materialName);
          setCurrentMaterialName(materialName);
        } else {
          await materialNamesApi.create(materialName);
        }
        await mutate();
        setCurrentMaterialName(undefined);
        setIsDialogOpen(false);
        setErrorMessage(undefined);
      } catch (error) {
        setErrorMessage(
          typeof error === 'string'
            ? `${tVar('material_names.errors.save')}. ${error}`
            : tVar('material_names.errors.save')
        );
        console.error(tVar('material_names.errors.save'), error);
      }
    },
    [mutate, tVar]
  );

  const handleDelete = useCallback(
    async (id: number) => {
      if (confirm(tVar('material_names.warnings.delete'))) {
        try {
          await materialNamesApi.delete(id);
          setErrorMessage(undefined);
        } catch (error) {
          setErrorMessage(
            typeof error === 'string'
              ? `${tVar('material_names.errors.delete')} ${id}. ${error}`
              : `${tVar('material_names.errors.delete')} ${id}`
          );
          console.error(`${tVar('material_names.errors.delete')} ${id}`, error);
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
        header: tVar('material_names.table.id'),
        enableSorting: true,
      },
      {
        accessorKey: 'type',
        header: tVar('material_names.table.type'),
        enableSorting: true,
        cell: ({ getValue }: CellContext<MaterialNameRow, string>) =>
          getValue(),
      },
      {
        accessorKey: 'dn',
        header: tVar('material_names.table.dn'),
        enableSorting: true,
      },
      {
        accessorKey: 'pn',
        header: tVar('material_names.table.pn'),
        enableSorring: true,
      },
      {
        accessorKey: 'degree',
        header: tVar('material_names.table.degree'),
        enableSorring: true,
      },
      {
        accessorKey: 'name',
        header: tVar('material_names.table.name'),
        enableSorting: true,
      },
      {
        accessorKey: 'description',
        header: tVar('material_names.table.description'),
        enableSorting: false,
      },
      {
        id: 'actions',
        header: tVar('actions.title'),
        cell: ({ row }: { row: { original: MaterialNameRow } }) => {
          const materialName = row.original;
          return (
            <TableRowActions
              id={materialName.id}
              onView={handleView}
              onEdit={handleEdit}
              onDelete={handleDelete}
              disableView={true}
            />
          );
        },
        enableSorting: false,
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
    currentMaterialName,
    setCurrentMaterialName,
    materialTypesArray,
    errorMessage,
    setErrorMessage,
  };
}
