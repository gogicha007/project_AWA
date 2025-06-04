import { ShipmentDTO } from '@/api/types';
import { useCallback, useState } from 'react';
import { shipmentsApi } from '@/api/endpoints/shipments';

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
  return {
    handleAdd,
    handleEdit,
    handleDelete,
    isDialogOpen,
    setIsDialogOpen,
    currentShipment,
    errorMessage,
    setErrorMessage,
  };
}
