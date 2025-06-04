import { useMemo, useState, useCallback } from 'react';
import { ShipmentDTO } from '@/api/types';
import { shipmentsApi } from '@/api/endpoints/shipments';
import TableRowActions from '../controls/table-row-actions/TableRowActions';
import { useAuth } from '@/context/auth';

type ShipmentRow = {
  id: number;
  alias: string;
  declaration_number: string;
  declaration_date: Date;
  status: string;
};

export function useShipmentsLogic(
  shipments: ShipmentDTO[],
  mutate: () => Promise<void | ShipmentDTO[]>,
  tVar: (key: string) => string
) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentShipment, setCurrentShipment] = useState<
    ShipmentDTO | undefined
  >();
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const { dbUserId } = useAuth();

  const data: ShipmentRow[] = useMemo(
    () =>
      shipments.map((shipment) => ({
        ...shipment,
        id:
          typeof shipment.id === 'string'
            ? parseInt(shipment.id, 10)
            : Number(shipment.id),
      })),
    [shipments]
  );

  const handleAdd = useCallback(() => {
    setCurrentShipment(undefined);
    setIsDialogOpen(true);
  }, []);

  const handleEdit = useCallback(
    (id: number) => {
      const shipment = shipments.find((s) => s.id === id);
      setCurrentShipment(shipment);
      setIsDialogOpen(true);
    },
    [shipments]
  );

  const handleSave = useCallback(
    async (shipment: ShipmentDTO) => {
      try {
        if (shipment.id) {
          if (dbUserId === null) {
            throw new Error('User ID is required to create a shipment');
          }
          await shipmentsApi.update(shipment, dbUserId);
          setCurrentShipment(shipment);
        } else {
          if (dbUserId === null) {
            throw new Error('User ID is required to create a shipment');
          }
          await shipmentsApi.create(shipment, dbUserId);
        }
        await mutate();
        setCurrentShipment(undefined);
        setIsDialogOpen(false);
        setErrorMessage(undefined);
      } catch (error) {
        setErrorMessage(
          typeof error === 'string'
            ? `${tVar('errors.save')}`
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
          await shipmentsApi.delete(id);
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
    console.log(`view the shipment id: ${id}`);
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
        accessorKey: 'declaration_number',
        header: tVar('table.declaration_number'),
        enableSorting: false,
      },
      {
        accessorKey: 'declaration_date',
        header: tVar('table.declaration_date'),
        enableSorting: true,
      },
      {
        accessorKey: 'status',
        header: tVar('table.status'),
        enableSorting: true,
      },
      {
        id: 'actions',
        header: tVar('actions.title'),
        cell: ({ row }: { row: { original: ShipmentRow } }) => {
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
    handleDelete,
    handleSave,
    handleView,
    isDialogOpen,
    setIsDialogOpen,
    currentShipment,
    errorMessage,
    setErrorMessage,
  };
}
