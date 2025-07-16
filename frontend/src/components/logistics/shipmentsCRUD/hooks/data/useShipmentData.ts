import { useEffect } from 'react';
import { shipmentApi } from '@/api/endpoints/shipments/shipmentApi';
import { transformShipmentToFormData } from '../utils/shipmentFormUtils';
import { ShipmentFormSchema } from '../../shipmentSchema';
// import { ShipmentFormValues } from '../useShipmentFormSet';
import { FileData } from '@/components/controls/file-input/FileInput';

export const useShipmentData = (
  id: number | undefined,
  authLoading: boolean,
  dbUserId: number | null,
  currenciesLoading: boolean,
  vendorsLoading: boolean,
  reset: (data: ShipmentFormSchema) => void,
  setFileDataArray: (files: FileData[]) => void,
  setShipmentId: (id: number) => void,
  setLoading: (loading: boolean) => void,
  setSnackbarStatus: (status: { message: string; success: boolean }) => void,
  setSnackbarOpen: (open: boolean) => void
) => {
  useEffect(() => {
    if (
      !id ||
      authLoading ||
      dbUserId === null ||
      currenciesLoading ||
      vendorsLoading
    )
      return;

    setShipmentId(id);
    setLoading(true);

    const fetchShipment = async () => {
      try {
        const shipment = await shipmentApi.getById(id);
        const shipmentFormData = transformShipmentToFormData(shipment);
        reset(shipmentFormData);
        setFileDataArray(shipment.files || []);
      } catch (error) {
        setSnackbarStatus({
          message: `Failed to fetch shipment: ${error}`,
          success: false,
        });
        setSnackbarOpen(true);
      } finally {
        setLoading(false);
      }
    };

    fetchShipment();
  }, [
    authLoading,
    currenciesLoading,
    dbUserId,
    id,
    reset,
    setFileDataArray,
    setLoading,
    setShipmentId,
    vendorsLoading,
  ]);
};
