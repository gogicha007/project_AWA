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

  const handleAddItem = () => {
    console.log('Adding new item for invoice:', invoiceId);
    console.log('Current fields before append:', fields);
    
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
    console.log('New item to append:', newItem);
    
    append(newItem, { shouldFocus: false });
    
    setTimeout(() => {
      const newIndex = fields.length;
      setValue(`invoiceItems.${newIndex}.invoiceId`, invoiceId);
      setValue(`invoiceItems.${newIndex}.productId`, 0);
      setValue(`invoiceItems.${newIndex}.description`, '');
      setValue(`invoiceItems.${newIndex}.unitId`, 0);
      setValue(`invoiceItems.${newIndex}.quantity`, 0);
      setValue(`invoiceItems.${newIndex}.unitPrice`, 0);
      setValue(`invoiceItems.${newIndex}.total`, 0);
    }, 0);
    
    console.log('Fields after append:', fields);
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

  return { columns, control, fields, handleAddItem, handleRemoveItem };
}
