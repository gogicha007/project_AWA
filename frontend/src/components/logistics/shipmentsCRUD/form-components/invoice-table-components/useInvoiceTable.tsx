import { useMemo, useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { InvoiceDTO, CurrencyDTO, VendorDTO, InvoiceItemDTO } from '@/api/types';
import { arrayToIdValueMap, negIdCounter } from '@/utils/helper';
import InvoiceColumns from './invoiceTableColumns';
import { InvoiceRow } from './invoiceTableColumns';
import { SnackbarControls } from '../../../../feedback/snackbar/snackbarTypes';

type Props = {
  auxData: {
    currencies: Partial<CurrencyDTO>[];
    vendors: Partial<VendorDTO>[];
  };
  snackbarControls?: SnackbarControls;
  tVar: (key: string) => string;
};

export interface InvoiceFormValues {
  invoices: InvoiceRow[];
  invoiceItems?: Array<InvoiceItemDTO>;
}

type InvoiceFieldPath =
  | `invoices.${number}.vendorId`
  | `invoices.${number}.invoiceNumber`
  | `invoices.${number}.invoiceDate`
  | `invoices.${number}.currencyId`
  | `invoices.${number}.totalAmount`;

export function useInvoiceTable(props: Props) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentInvoice, setCurrentInvoice] = useState<Partial<InvoiceRow>>({
    id: 0,
    invoiceNumber: '',
    invoiceDate: new Date(),
  });
  const {
    auxData: { currencies, vendors },
    snackbarControls,
    tVar,
  } = props;
  const { control, formState, resetField, reset, getValues, setValue } =
    useFormContext<InvoiceFormValues>();
  const { dirtyFields } = formState;
  const { fields, append, remove } = useFieldArray({
    control,
    keyName: 'uid',
    name: 'invoices',
  });

  const currenciesObj = useMemo(
    () => arrayToIdValueMap(currencies, 'code'),
    [currencies]
  );

  const vendorsObj = useMemo(
    () => arrayToIdValueMap(vendors, 'alias'),
    [vendors]
  );

  const openItemsDialog = (uid: number) => {
    const index = fields.findIndex((field) => field.id === uid);

    if (index === -1) {
      snackbarControls?.setStatus({
        message: `Cannot find row with database ID: ${uid}`,
        success: false,
      });
      snackbarControls?.setOpen(true);
      return;
    }

    const invoice = fields[index];
    const formValues = getValues('invoices')[index];

    setCurrentInvoice({
      id: invoice.id,
      invoiceNumber: formValues.invoiceNumber,
      invoiceDate: formValues.invoiceDate,
      totalAmount: formValues.totalAmount,
    });

    setIsDialogOpen(true);
  };

  const handleAddInvoice = (
    newInvoiceData: InvoiceDTO = {
      vendorId: 0,
      invoiceNumber: '',
      invoiceDate: new Date(),
      currencyId: 0,
    }
  ) => {
    const newInvoice: InvoiceRow = {
      ...newInvoiceData,
      id: negIdCounter.getId(),
      totalAmount: 0,
    };

    append(newInvoice, { shouldFocus: false });

    setTimeout(() => {
      const currentInvoices = getValues('invoices');
      const currentInvoiceItems = getValues('invoiceItems');
      reset(
        { 
          invoices: currentInvoices,
          invoiceItems: currentInvoiceItems 
        },
        {
          keepDirty: false,
          keepValues: true,
        }
      );
    }, 0);
  };

  const handleResetInvoice = (id: number) => {
    const index = fields.findIndex((field) => field.id === id);

    if (index === -1) {
      snackbarControls?.setStatus({
        message: `Cannot find row with ID: ${id}`,
        success: false,
      });
      snackbarControls?.setOpen(true);
      return;
    }

    const defaultInvoices = control._defaultValues?.invoices ?? [];
    const defaultRow = defaultInvoices[index];

    const rowDirtyFields = dirtyFields.invoices?.[index];

    if (rowDirtyFields) {
      const keysArray = Object.keys(rowDirtyFields);

      if (keysArray.length > 0) {
        keysArray.forEach((key) => {
          resetField(`invoices.${index}.${key}` as InvoiceFieldPath, {
            defaultValue: defaultRow?.[key as keyof typeof defaultRow],
          });
        });
      }
    } else {
      snackbarControls?.setStatus({
        message: 'No dirty fields found for this row',
        success: false,
      });
      snackbarControls?.setOpen(true);
    }
  };

  const handleRemoveInvoice = (id: number) => {
    if (confirm(tVar('warnings.delete'))) {
      const index = fields.findIndex((field) => field.id === id);

      if (index !== -1) {
        const currentInvoiceItems = getValues('invoiceItems') || [];
        const filteredInvoiceItems = (currentInvoiceItems as Array<InvoiceItemDTO>).filter(
          (item) => item.invoiceId !== id
        );
        
        setValue('invoiceItems', filteredInvoiceItems);

        remove(index);

        setTimeout(() => {
          const currentInvoices = getValues('invoices');
          const currentFilteredItems = getValues('invoiceItems');
          reset(
            { 
              invoices: currentInvoices,
              invoiceItems: currentFilteredItems 
            },
            {
              keepDirty: false,
              keepValues: true,
            }
          );
        }, 0);
      }
    }
  };

  const updateInvoiceTotalAmount = (invoiceId: number, totalAmount: number) => {
    const index = fields.findIndex((field) => field.id === invoiceId);
    if (index !== -1) {
      setValue(`invoices.${index}.totalAmount`, totalAmount);
    }
  };

  const columns = InvoiceColumns({
    tVar,
    vendors,
    currencies,
    vendorsObj,
    currenciesObj,
    openItemsDialog,
    handleResetInvoice,
    handleRemoveInvoice,
    dirtyFields: formState.dirtyFields,
  });

  return {
    columns,
    currentInvoice,
    fields,
    isDialogOpen,
    setIsDialogOpen,
    handleAddInvoice,
    handleResetInvoice,
    handleRemoveInvoice,
    updateInvoiceTotalAmount,
  };
}
