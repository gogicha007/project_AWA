import { shipmentApi } from '@/api/endpoints/shipments/shipmentApi';
import { shipmentFileApi } from '@/api/endpoints/shipments/shipmentFileApi';
import { handleSubmitInvoice } from '../utils/submitInvoices';
import { handleSubmitFreights } from '../utils/submitFreights';
import { shipmentFormBaseSchema } from '../../shipmentSchema';
import {
  detectFormChanges,
  transformFormDataForSubmission,
} from '../utils/shipmentFormUtils';
import { useRouter } from 'next/navigation';
import { FieldNamesMarkedBoolean } from 'react-hook-form';
import { GeneralInfoDTO } from '@/api/types';
import { z } from 'zod';

type BaseSchemaType = z.infer<typeof shipmentFormBaseSchema>;

export const useShipmentSubmitHandlers = (
  dbUserId: number | null,
  dirtyFields: FieldNamesMarkedBoolean<BaseSchemaType>,
  reset: (data: BaseSchemaType) => void,
  setSnackbarOpen: (open: boolean) => void,
  setSnackbarStatus: (status: { message: string; success: boolean }) => void,
  setShipmentId: (id: number) => void,
  shipmentId: number | undefined
) => {
  const router = useRouter();

  const handleGenInfoSubmit = async (data: BaseSchemaType) => {
    console.log('gen info submit');
    try {
      if (dbUserId === null) {
        throw new Error('User ID is required to create a shipment');
      }

      const validatedData = shipmentFormBaseSchema.parse(data);

      const createdShipment = await shipmentApi.create(
        {
          ...validatedData,
          declaration_number: validatedData.declaration_number ?? '',
          declaration_date: validatedData.declaration_date as Date,
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
        Files: [],
        Invoices: [],
        InvoiceItems: [],
        Freights: [],
        _hasRemovals: {
          inFiles: false,
          inInvoices: [],
          inInvoiceItems: [],
          inFreights: [],
        },
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

  const handleEditSubmit = async (data: BaseSchemaType) => {
    console.log('handle edit submit')
    try {
      if (!shipmentId || dbUserId === null) {
        throw new Error(
          'Shipment ID and User ID are required to update shipment'
        );
      }
      console.log('data', data);
      console.log('shipment id', shipmentId);

      // Validate if status is being changed to ensure business rules
      if (dirtyFields.status && data.status !== '') {
        try {
          shipmentFormBaseSchema.parse(data);
        } catch (error) {
          if (error instanceof z.ZodError) {
            const statusError = error.errors.find(err => err.path.includes('status'));
            const declNumberError = error.errors.find(err => err.path.includes('declaration_number'));
            const declDateError = error.errors.find(err => err.path.includes('declaration_date'));
            
            if (statusError || declNumberError || declDateError) {
              throw new Error(statusError?.message || declNumberError?.message || declDateError?.message);
            }
          }
          throw error;
        }
      }

      const transformedData = transformFormDataForSubmission(data);

      const changes = detectFormChanges(dirtyFields);

      if (changes.hasGeneralFieldChanges) {
        console.log('general fields change detected');

        const generalInfoUpdate: GeneralInfoDTO = {
          id: shipmentId,
          alias: transformedData.alias,
          declaration_number: transformedData.declaration_number ?? '',
          declaration_date: transformedData.declaration_date as Date,
          status: transformedData.status as 'APPLIED' | 'DECLARED' | 'ARRIVED',
        };
        
        await shipmentApi.update(generalInfoUpdate, dbUserId);
      }

      // Handle files
      if (changes.hasFileChanges()) {
        console.log('file change detected');

        if (transformedData.Files && transformedData.Files.length > 0) {
          await shipmentFileApi.update(transformedData.Files, shipmentId);
        } else {
          await shipmentFileApi.deleteAllByShipmentId(shipmentId);
        }
      }

      // Handle invoices&items
      if (changes.hasInvoiceChanges() || changes.hasInvoiceItemChanges()) {
        console.log('invoice/invoice items changed');

        // Ensure invoices are an array
        if (!Array.isArray(transformedData.Invoices)) {
          throw new Error('Invoices must be an array');
        }

        await handleSubmitInvoice(transformedData, shipmentId, dbUserId);
      }

      // Handle freights
      if (changes.hasFreightChanges()) {
        handleSubmitFreights(transformedData, shipmentId, dbUserId);
      }

      setSnackbarStatus({
        message: 'Shipment updated successfully',
        success: true,
      });
      setSnackbarOpen(true);
      router.push('/shipments');
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
