'use client';

import { useMemo, useCallback } from 'react';
import { ShipmentDTO } from '@/api/types';
import { shipmentApi } from '@/api/endpoints/shipments/shipmentApi';
import TableRowActions from '../controls/table-row-actions/TableRowActions';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();

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
    router.push('/shipments/add');
  }, [router]);

  const handleEdit = useCallback(
    (id: number) => {
      router.push(`/shipments/${id}/edit`);
    },
    [router]
  );

  const handleView = useCallback(
    (id: number) => {
      router.push(`/shipments/${id}`);
    },
    [router]
  );

  const handleDelete = useCallback(
    async (id: number) => {
      if (confirm(tVar('warnings.delete'))) {
        try {
          await shipmentApi.delete(id);
        } catch (error) {
          console.error(`${tVar('errors.delete')} ${id}`, error);
        }
      }
      await mutate();
    },
    [mutate, tVar]
  );

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
        cell: ({ row }: { row: { original: ShipmentRow } }) => {
          const date = row.original.declaration_date;
          if (!date) return '';
          if (typeof date === 'string') return (date as string).substring(0, 10);
          if (date instanceof Date) return date.toISOString().substring(0, 10);
          return String(date);
        },
        enableSorting: false,
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
    handleView,
  };
}
