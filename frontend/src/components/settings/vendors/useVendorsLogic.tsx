import { useMemo, useState, useCallback } from 'react';
import { VendorDTO } from '@/api/types';
import TableRowActions from '@/components/controls/table-row-actions/TableRowActions';
import { vendorsApi } from '@/api/endpoints/settings/vendors';
import { useAuth } from '@/context/auth';

type VendorRow = {
  id: number;
  alias: string;
  name: string;
  address: string;
  country: string;
};

export function useVendorsLogic(
  vendors: VendorDTO[],
  mutate: () => Promise<void | VendorDTO[]>,
  tVar: (key: string) => string
) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentVendor, setCurrentVendor] = useState<VendorDTO | undefined>();
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const { dbUserId } = useAuth();

  const data: VendorRow[] = useMemo(
    () =>
      vendors.map((vendor) => ({
        ...vendor,
        id:
          typeof vendor.id === 'string'
            ? parseInt(vendor.id, 10)
            : Number(vendor.id),
        name: vendor.name ?? '',
        address: vendor.address ?? '',
      })),
    [vendors]
  );

  const handleAdd = useCallback(() => {
    setCurrentVendor(undefined);
    setIsDialogOpen(true);
  }, []);

  const handleEdit = useCallback(
    (id: number) => {
      const vendor = vendors.find((v) => v.id === id);
      setCurrentVendor(vendor);
      setIsDialogOpen(true);
    },
    [vendors]
  );

  const handleSave = useCallback(
    async (vendor: VendorDTO) => {
      try {
        if (vendor.id) {
          if (dbUserId === null) {
            throw new Error('User ID is required to create a vendor.');
          }
          await vendorsApi.update(vendor, dbUserId);
          setCurrentVendor(vendor);
        } else {
          if (dbUserId === null) {
            throw new Error('User ID is required to create a vendor.');
          }
          await vendorsApi.create(vendor, dbUserId);
        }
        await mutate();
        setCurrentVendor(undefined);
        setIsDialogOpen(false);
        setErrorMessage(undefined);
      } catch (error) {
        setErrorMessage(
          typeof error === 'string'
            ? `${tVar('errors.save')}. ${error}`
            : tVar('errors.save')
        );
        console.error(tVar('errors.save'), error);
      }
    },
    [mutate, tVar, dbUserId]
  );

  const handleDelete = useCallback(
    async (id: number) => {
      if (confirm(tVar('warnings.delete'))) {
        try {
          await vendorsApi.delete(id);
          setErrorMessage(undefined);
        } catch (error) {
          setErrorMessage(
            typeof error === 'string'
              ? `${tVar('errors.delete')} ${id}. ${error}`
              : `${tVar('errors.delete')} ${id}`
          );
          console.error(`${tVar('errors.delete')} ${id}`, error);
        }
      }
      await mutate();
    },
    [mutate, tVar]
  );

  const handleView = useCallback((id: number) => {
    console.log(`view the vendor id: ${id}`);
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: tVar('table.id'),
      },
      {
        accessorKey: 'alias',
        header: tVar('table.alias'),
        enableSorting: true,
      },
      {
        accessorKey: 'name',
        header: tVar('table.name'),
        enableSorting: true,
      },
      {
        accessorKey: 'address',
        header: tVar('table.address'),
        enableSorting: true,
      },
      {
        accessorKey: 'country',
        header: tVar('table.country'),
        enableSorting: true,
      },
      {
        id: 'actions',
        header: tVar('actions.title'),
        cell: ({ row }: { row: { original: VendorRow } }) => {
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
    handleDelete,
    isDialogOpen,
    setIsDialogOpen,
    currentVendor,
    setCurrentVendor,
    errorMessage,
    setErrorMessage,
  };
}
