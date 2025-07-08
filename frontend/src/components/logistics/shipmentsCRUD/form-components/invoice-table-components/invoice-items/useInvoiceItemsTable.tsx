import { useMemo } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { MaterialNameDTO, UnitDTO } from '@/api/types';
import InvoiceItemColumns, { InvoiceItemRow } from './invoiceItemsTableColumns';
import { arrayToIdValueMap, negIdCounter } from '@/utils/helper';

type Props = {
  auxData: {
    materials: MaterialNameDTO[];
    units: UnitDTO[];
  };
  invoiceId: number;
  tVar: (key: string) => string;
};

export interface InvoiceItemFormValues {
  invoiceItems: InvoiceItemRow[];
}

export function useInvoiceItemsTable(props: Props) {
  const {
    auxData: { materials, units },
    invoiceId,
    tVar,
  } = props;

  const { control, formState, register, setValue, getValues, trigger } =
    useFormContext<InvoiceItemFormValues>();

  const { fields, append, remove } = useFieldArray({
    control,
    keyName: 'uid',
    name: 'invoiceItems',
  });

  const unitsObj = useMemo(() => arrayToIdValueMap(units, 'unit'), [units]);
  const materialsObj = useMemo(
    () => arrayToIdValueMap(materials, 'name'),
    [materials]
  );

  const handleAddItem = () => {
    const newItem: InvoiceItemRow = {
      id: negIdCounter.getId(),
      invoiceId: invoiceId,
      productId: 0,
      description: '',
      unitId: 0,
      quantity: 0,
      unitPrice: 0,
      total: 0,
    };
    append(newItem, { shouldFocus: false });
  };

  const handleRemoveItem = (id: number) => {
    if (confirm(tVar('warnings.delete'))) {
      const index = fields.findIndex((field) => field.id === id);

      if (index !== -1) {
        remove(index);
      }

      // if (id > 0) {
      //   const removedInvoiceItemsArr = getValues('') || [];
      //   const newRemInvArr = [...removedInvoiceArr, id];
      //   setValue('_hasRemovals.inInvoices', newRemInvArr, {
      //     shouldDirty: true,
      //   });
      // }
    }
  };

  const columns = useMemo(
    () =>
      InvoiceItemColumns({
        control,
        dirtyFields: formState.dirtyFields,
        handleRemoveItem,
        materials,
        materialsObj,
        register,
        setValue,
        tVar,
        units,
        unitsObj,
      }),
    [
      control,
      formState.dirtyFields,
      handleRemoveItem,
      materials,
      materialsObj,
      register,
      setValue,
      tVar,
      units,
      unitsObj,
    ]
  );

  return {
    columns,
    control,
    fields,
    getValues,
    handleAddItem,
    handleRemoveItem,
    trigger,
  };
}
