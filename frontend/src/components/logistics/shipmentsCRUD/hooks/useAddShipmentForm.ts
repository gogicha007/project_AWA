import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useAuth } from '@/context/auth';
import { shipmentsApi } from '@/api/endpoints/shipments';
import convertToBase64 from '@/utils/file-utils';
import { enUS as enUSLocale, ka as kaLocale } from 'date-fns/locale';

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

export function useAddShipmentForm() {
  const tS = useTranslations('Logistics');
  const tB = useTranslations('Buttons');
  const localeCode = useLocale();
  const router = useRouter();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShipmentFormValues>();
  const { dbUserId } = useAuth();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [fileDataArray, setFileDataArray] = useState<FileData[]>([]);

  const submitHandler = async (data: ShipmentFormValues) => {
    try {
      if (dbUserId === null) {
        throw new Error('User ID is required to create a shipment.');
      }
      await shipmentsApi.create(
        {
          ...data,
          declaration_number: data.declaration_number ?? '',
          declaration_date: data.declaration_date ?? new Date(0),
          files: fileDataArray,
        },
        dbUserId
      );
    } catch (error) {
      console.error(error);
    }
    router.push('/shipments');
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
  };
}
