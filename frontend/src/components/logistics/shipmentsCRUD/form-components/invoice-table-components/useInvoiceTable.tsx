import { useEffect, useMemo } from 'react';
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

export function useInvoiceTable(props: Props) {
  const {
    auxData: { currencies, vendors },
    tVar,
  } = props;
  const { control, formState, reset, getValues } = useFormContext<InvoiceFormValues>();
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

  useEffect(() => {
    console.log(formState.dirtyFields.invoices);
    // console.log('fields', fields)
  }, [formState.dirtyFields.invoices, fields]);

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
    append({
      ...newInvoiceData,
      id: negIdCounter.getId(),
      totalAmount: 0,
      isArrived: false,
    });
  };

  const handleResetInvoice = (id: number) => {
    console.log('reset index', id);

    const index = fields.findIndex((field) => field.id === id);
    if (index === -1) {
      console.log('Cannot find row with ID:', id);
      return;
    }

    const defaultInvoices = control._defaultValues?.invoices ?? [];
    const defaultRow = defaultInvoices[index];
    console.log('Found row at index:', index, defaultRow);

    // Get current form values
    const currentValues = getValues();
    
    // Update the specific row in the current values
    const updatedInvoices = [...currentValues.invoices];
    updatedInvoices[index] = {
      ...updatedInvoices[index],
      vendorId: defaultRow?.vendorId ?? 0,
      invoiceNumber: defaultRow?.invoiceNumber ?? '',
      invoiceDate: defaultRow?.invoiceDate ?? null,
      currencyId: defaultRow?.currencyId ?? 0,
      totalAmount: defaultRow?.totalAmount ?? 0,
      isArrived: defaultRow?.isArrived ?? false,
    };

    // Reset the entire form with updated values to clear dirty state
    reset({ invoices: updatedInvoices });
    
    console.log(dirtyFields?.invoices);
  };

  const handleRemoveInvoice = (index: number) => {
    remove(index);
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
