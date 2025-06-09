import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useAuth } from '@/context/auth';
import { shipmentApi } from '@/api/endpoints/shipments/shipmentApi';
import { shipmentFileApi } from '@/api/endpoints/shipments/shipmentFileApi';
import convertToBase64 from '@/utils/file-utils';
import { enUS as enUSLocale, ka as kaLocale } from 'date-fns/locale';
import { formatToISODateTime } from '@/utils/dateFormat';

const localeMap = {
  en: enUSLocale,
  ka: kaLocale,
};

export type ShipmentFormValues = {
  alias: string;
  status: 'APPLIED' | 'DECLARED' | 'ARRIVED';
  declaration_number?: string;
  declaration_date?: Date;
  files?: Array<FileData>;
};

export type FileData = {
  fileName: string;
  fileType: string;
  fileData: string;
};

export function useShipmentForm(id?: number) {
  const [loading, setLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [fileDataArray, setFileDataArray] = useState<FileData[]>([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const isEditMode = !!id;
  const router = useRouter();
  const tS = useTranslations('Logistics');
  const tB = useTranslations('Buttons');
  const { dbUserId } = useAuth();
  const localeCode = useLocale();

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ShipmentFormValues>({
    defaultValues: {
      alias: '',
      status: undefined,
      declaration_number: '',
      declaration_date: undefined,
    },
  });

  useEffect(() => {
    if (id) {
      setLoading(true);
      const fetchShipment = async () => {
        try {
          const shipment = await shipmentApi.getById(id);

          reset({
            alias: shipment.alias,
            status: shipment.status as 'APPLIED' | 'DECLARED' | 'ARRIVED',
            declaration_number: shipment.declaration_number || '',
            declaration_date: shipment.declaration_date
              ? typeof shipment.declaration_date === 'string'
                ? new Date(shipment.declaration_date)
                : shipment.declaration_date
              : undefined,
          });

          const files = await shipmentFileApi.getAll(id);
          setFileDataArray(files || []);
          setSelectedFiles(
            files.map(
              (file) => new File([], file.fileName, { type: file.fileType })
            )
          );

          // const invoices = []
        } catch (error) {
          console.error('Failed to fetch shipment:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchShipment();
    }
  }, [id, reset]);

  const submitHandler = async (data: ShipmentFormValues) => {
    try {
      if (dbUserId === null) {
        throw new Error('User ID is required to create a shipment.');
      }
      const formattedDate = formatToISODateTime(data.declaration_date);

      if (isEditMode && id) {
        await shipmentApi.update(
          {
            id: id,
            ...data,
            declaration_number: data.declaration_number ?? '',
            declaration_date: formattedDate as Date,
          },
          dbUserId
        );

        if (fileDataArray.length > 0) {
          await shipmentFileApi.update(fileDataArray, id);
        }
      } else {
        const createdShipment = await shipmentApi.create(
          {
            ...data,
            declaration_number: data.declaration_number ?? '',
            declaration_date: formattedDate as Date,
          },
          dbUserId
        );
        if (fileDataArray.length > 0) {
          if (createdShipment.id === undefined) {
            throw new Error('Created shipment ID is undefined.');
          }
          await shipmentFileApi.create(fileDataArray, createdShipment.id);
        }
      }

      router.push('/shipments');
    } catch (error) {
      setSnackbarMessage(
        error instanceof Error
          ? error.message
          : 'An error occurred while saving the shipment'
      );
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleCancel = () => {
    router.push('/shipments');
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    const newFiles = Array.from(e.target.files);
    setSelectedFiles((prev) => [...prev, ...newFiles]);

    // Convert files to base64
    const filesData = await Promise.all(
      newFiles.map(async (file) => {
        const base64 = await convertToBase64(file);
        return {
          fileName: file.name,
          fileType: file.type,
          fileData: base64,
        } as FileData;
      })
    );

    setFileDataArray((prev) => [...prev, ...filesData]);
  };

  const handleRemoveFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setFileDataArray((prev) => prev.filter((_, i) => i !== index));
  };

  return {
    tS,
    tB,
    loading,
    localeCode,
    localeMap,
    control,
    register,
    handleSubmit,
    errors,
    selectedFiles,
    fileDataArray,
    submitHandler,
    handleCancel,
    handleFileChange,
    handleRemoveFile,
    isEditMode,
    snackbarOpen,
    snackbarMessage,
    handleSnackbarClose,
  };
}
