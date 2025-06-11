import { handleApiError } from '@/utils/handleApiError';
import apiClient from '../../api-client';
import { ShipmentFileDTO } from '../../types';

export const shipmentFileApi = {
  getAll: async (shipmentId: number): Promise<ShipmentFileDTO[]> => {
    const response = await apiClient.get(
      `/shipment-files/shipment/${shipmentId}`
    );
    return response.data;
  },

  create: async (
    shipmentFiles: ShipmentFileDTO[],
    shipmentId: number
  ): Promise<ShipmentFileDTO[]> => {
    try {
      const filesWithShipmentId = mapShipmentFiles(shipmentFiles, shipmentId);
      console.log('with id', filesWithShipmentId);
      const shipmentFileResponse = await apiClient.post('/shipment-files', {
        files: filesWithShipmentId,
      });
      return shipmentFileResponse.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  update: async (
    shipmentFiles: ShipmentFileDTO[],
    shipmentId: number
  ): Promise<ShipmentFileDTO[]> => {
    try {
      await shipmentFileApi.deleteAllByShipmentId(shipmentId);

      const shipmentUpdateFileResponse = await shipmentFileApi.create(
        shipmentFiles,
        shipmentId
      );
      if (!shipmentUpdateFileResponse) {
        return [];
      }
      return shipmentUpdateFileResponse;
    } catch (error) {
      handleApiError(error);
    }
  },

  deleteAllByShipmentId: async (shipmentId: number): Promise<void> => {
    try {
      const response = await apiClient.delete(
        `shipment-files/shipment/${shipmentId}`
      );
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },
};

type BufferLike = { type: 'Buffer'; data: number[] };

export const mapShipmentFiles = (
  shipmentFiles: ShipmentFileDTO[],
  shipmentId: number
): ShipmentFileDTO[] => {
  if (!shipmentFiles || shipmentFiles.length === 0) {
    return [];
  }

  return shipmentFiles.map((file) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...rest } = file;
    let fileData = rest.fileData;

    // Handle Buffer-like object
    if (
      fileData &&
      typeof fileData === 'object' &&
      (fileData as BufferLike).type === 'Buffer' &&
      Array.isArray((fileData as BufferLike).data)
    ) {
      try {
        fileData = Buffer.from((fileData as BufferLike).data).toString(
          'base64'
        );
      } catch {
        fileData = '';
      }
    }

    // Handle data URL string (from FileReader)
    if (typeof fileData === 'string' && fileData.startsWith('data:')) {
      fileData = fileData.substring(fileData.indexOf(',') + 1);
    }

    // Ensure fileData is a string (base64) or empty string
    if (typeof fileData !== 'string') {
      fileData = '';
    }

    return {
      ...rest,
      shipmentId,
      fileData,
    };
  });
};
