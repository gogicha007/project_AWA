import { useMemo } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { InvoiceDTO, CurrencyDTO, VendorDTO } from '@/api/types';
import { arrayToIdValueMap, negIdCounter } from '@/utils/helper';
import InvoiceColumns from './invoiceTableColumns';
import { InvoiceRow } from './invoiceTableColumns';

type Props = {
  auxData: {
    currencies: Partial<CurrencyDTO>[];
    vendors: Partial<VendorDTO>[];
  };
  tVar: (key: string) => string;
};

export interface InvoiceFormValues {
  invoices: InvoiceRow[];
}

type InvoiceFieldPath = 
  | `invoices.${number}.vendorId`
  | `invoices.${number}.invoiceNumber`
  | `invoices.${number}.invoiceDate`
  | `invoices.${number}.currencyId`
  | `invoices.${number}.totalAmount`
  | `invoices.${number}.isArrived`;

export function useInvoiceTable(props: Props) {
  const {
    auxData: { currencies, vendors },
    tVar,
  } = props;
  const { control, formState, resetField, reset, getValues } =
    useFormContext<InvoiceFormValues>();
  const { dirtyFields } = formState;
  const { fields, append, remove } = useFieldArray({
    control,
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

  const openItemsDialog = (id: number) => {
    console.log('invoice id', id);
    console.log(fields);
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
      isArrived: false,
    };

    append(newInvoice, { shouldFocus: false });

    setTimeout(() => {
      const currentInvoices = getValues('invoices');
      reset(
        { invoices: currentInvoices },
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
      console.log('Cannot find row with ID:', id);
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
      console.log('No dirty fields found for this row');
    }
  };

  const handleRemoveInvoice = (id: number) => {
    const index = fields.findIndex((field) => field.id === id);

    if (index !== -1) {
      remove(index);

      setTimeout(() => {
        const currentInvoices = getValues('invoices');
        reset(
          { invoices: currentInvoices },
          {
            keepDirty: false,
            keepValues: true,
          }
        );
      }, 0);
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
    fields,
    columns,
    handleAddInvoice,
    handleResetInvoice,
    handleRemoveInvoice,
  };
}
