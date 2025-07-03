import { ShipmentFormValues } from '../useShipmentFormSet';
import { shipmentApi } from '@/api/endpoints/shipments/shipmentApi';
import { shipmentFileApi } from '@/api/endpoints/shipments/shipmentFileApi';
import { formatToISODateTime } from '@/utils/dateFormat';
import {
  detectFormChanges,
  handleInvoiceChange,
} from '../utils/shipmentFormUtils';
import { FieldNamesMarkedBoolean } from 'react-hook-form';

export const useShipmentSubmitHandlers = (
  dbUserId: number | null,
  dirtyFields: FieldNamesMarkedBoolean<ShipmentFormValues>,
  originalValues: Partial<ShipmentFormValues>,
  reset: (data: ShipmentFormValues) => void,
  setSnackbarOpen: (open: boolean) => void,
  setSnackbarStatus: (status: { message: string; success: boolean }) => void,
  setShipmentId: (id: number) => void,
  shipmentId: number | undefined,
) => {
  const handleGenInfoSubmit = async (data: ShipmentFormValues) => {
    console.log('gen info submit');
    try {
      if (dbUserId === null) {
        throw new Error('User ID is required to create a shipment');
      }

      const formattedDate = formatToISODateTime(data.declaration_date);
      const createdShipment = await shipmentApi.create(
        {
          ...data,
          declaration_number: data.declaration_number ?? '',
          declaration_date: formattedDate as Date,
        },
        dbUserId
      );

      reset({
        alias: createdShipment.alias,
        status: createdShipment.status as 'APPLIED' | 'DECLARED' | 'ARRIVED',
        declaration_number: createdShipment.declaration_number || '',
        declaration_date: createdShipment.declaration_date
          ? typeof createdShipment.declaration_date === 'string'
            ? new Date(createdShipment.declaration_date)
            : createdShipment.declaration_date
          : undefined,
        files: [],
        invoices: [],
        invoiceItems: [],
        _hasRemovals: false, // Add this
      });

      setShipmentId(createdShipment.id as number);
      setSnackbarStatus({ message: 'Shipment created', success: true });
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarStatus({
        message:
          error instanceof Error
            ? error.message
            : 'An error occurred while saving the shipment',
        success: false,
      });
      setSnackbarOpen(true);
    }
  };

  const handleEditSubmit = async (data: ShipmentFormValues) => {
    try {
      if (!shipmentId || dbUserId === null) {
        throw new Error(
          'Shipment ID and User ID are required to update shipment'
        );
      }

      const changes = detectFormChanges(data, originalValues, dirtyFields);

      // Update general fields
      if (changes.hasGeneralFieldChanges) {
        console.log('general fields change detected');

        const formattedDate = formatToISODateTime(data.declaration_date);
        await shipmentApi.update(
          {
            id: shipmentId,
            alias: data.alias,
            declaration_number: data.declaration_number ?? '',
            declaration_date: formattedDate as Date,
            status: data.status,
          },
          dbUserId
        );
      }

      // Handle files
      if (changes.hasFileChanges()) {
        console.log('file change detected');

        if (data.files && data.files.length > 0) {
          await shipmentFileApi.update(data.files, shipmentId);
        } else {
          await shipmentFileApi.deleteAllByShipmentId(shipmentId);
        }
      }

      // Handle invoices&items
      if (changes.hasInvoiceChanges() || changes.hasInvoiceItemChanges()) {
        console.log('invoice/invoice items changed');

        // Ensure invoices are an array
        if (!Array.isArray(data.invoices)) {
          throw new Error('Invoices must be an array');
        }

        await handleInvoiceChange(data, shipmentId, dbUserId);
      }

      setSnackbarStatus({
        message: 'Shipment updated successfully',
        success: true,
      });
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarStatus({
        message:
          error instanceof Error
            ? error.message
            : 'An error occurred while updating the shipment',
        success: false,
      });
      setSnackbarOpen(true);
    }
  };

  return {
    handleGenInfoSubmit,
    handleEditSubmit,
  };
};
