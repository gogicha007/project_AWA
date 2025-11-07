import { ensureInteger, ensureNumber } from '@/utils/helper';
import { formatToISODateTime } from '@/utils/dateFormat';
import { ShipmentFormSchema } from '../../shipmentSchema';
import { freightApi } from '@/api/endpoints/purchases/freightApi';

export const handleSubmitFreights = async (
  data: ShipmentFormSchema,
  shipmentId: number,
  dbUserId: number
) => {
  console.log('freight data', data.Freights);
  console.log('ids for freight', shipmentId, dbUserId);

  try {
    if (
      data._hasRemovals.inFreights &&
      data._hasRemovals.inFreights.length > 0
    ) {
      console.log('remove freight ids', data._hasRemovals.inFreights);
      await freightApi.deleteFreightsArray(data._hasRemovals.inFreights);
    }

    if (data.Freights && data.Freights.length > 0) {
      const freightsToSubmit = data.Freights.map((freight) => ({
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
      await freightApi.createFreightsInBulk(freightsToSubmit);
    }
    return { success: true };
  } catch (error) {
    console.error('Error submitting freights:', error);
    throw error;
  }
};
