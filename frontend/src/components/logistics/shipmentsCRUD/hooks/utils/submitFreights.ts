import { ShipmentFormValues } from '../useShipmentFormSet';

export const handleSubmitFreights = (
  data: ShipmentFormValues,
  shipmentId: number,
  dbUserId: number
) => {
  console.log('freight data', data.freights);
  console.log('ids for freight', shipmentId, dbUserId);
};
