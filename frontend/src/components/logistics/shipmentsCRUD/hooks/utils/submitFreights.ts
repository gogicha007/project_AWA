import { ensureInteger, ensureNumber } from '@/utils/helper';
import { ShipmentFormValues } from '../useShipmentFormSet';
import { formatToISODateTime } from '@/utils/dateFormat';

export const handleSubmitFreights = (
  data: ShipmentFormValues,
  shipmentId: number,
  dbUserId: number
) => {
  console.log('freight data', data.freights);
  console.log('ids for freight', shipmentId, dbUserId);
  try {
    if (
      data._hasRemovals.inFreights &&
      data._hasRemovals.inFreights.length > 0
    ) {
      console.log('remove freight ids', data._hasRemovals.inFreights);
    }

    if (data.freights && data.freights.length > 0) {
      const freightsToSubmit = data.freights.map((freight) => ({
        id: freight.id,
        truckNumber: freight.truckNumber,
        forwarder: freight.forwarder,
        billNumber: freight.billNumber,
        billDate: freight.billDate
          ? formatToISODateTime(freight.billDate)
          : null,
        currencyId: ensureInteger(freight.currencyId),
        freightRate: ensureNumber(freight.freightRate),
        userId: dbUserId,
        shipmentId: shipmentId,
      }));
      console.log('freights to submit', freightsToSubmit);
    }
    return { success: true };
  } catch (error) {
    console.error('Error submitting freights:', error);
    throw error;
  }
};
