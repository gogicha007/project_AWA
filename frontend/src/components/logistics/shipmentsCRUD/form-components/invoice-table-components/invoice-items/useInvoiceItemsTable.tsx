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

  const { control, formState, register, setValue } =
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

  const handleAddItem = (
    newItemData: Partial<InvoiceItemRow> = {
      invoiceId: invoiceId,
      productId: 0,
      description: 'new',
      unitId: 0,
      quantity: 0,
      unitPrice: 0,
      total: 0,
    }
  ) => {
    const newItem: InvoiceItemRow = {
      id: negIdCounter.getId(),
      invoiceId: newItemData.invoiceId ?? invoiceId,
      productId: newItemData.productId ?? 0,
      description: newItemData.description ?? '',
      unitId: newItemData.unitId ?? 0,
      quantity: newItemData.quantity ?? 0,
      unitPrice: newItemData.unitPrice ?? 0,
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
      fields.length,
      formState.dirtyFields,
      handleRemoveItem,
      materials,
      materialsObj,
      register,
      tVar,
      units,
      unitsObj,
    ]
  );

  return { columns, fields, handleAddItem, handleRemoveItem };
}
