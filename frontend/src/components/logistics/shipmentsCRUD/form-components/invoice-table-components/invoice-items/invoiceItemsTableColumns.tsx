import { MaterialNameDTO, UnitDTO } from '@/api/types';
import styles from './invoice-items.module.css';
import {
  Control,
  FieldNamesMarkedBoolean,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';
import InvoiceTableActions from '../InvoiceTableActions';
import { TotalCell } from './TotalCell';
import { SelectProduct } from './SelectProduct';
import { ShipmentFormSchema } from '../../../shipmentSchema';

export interface InvoiceItemRow {
  id: number;
  invoiceId: number;
  productId: number;
  description: string;
  quantity: number;
  unitId: number;
  unitPrice: number;
  total: number;
  originalIndex?: number;
}

type Props = {
  control: Control<ShipmentFormSchema>;
  dirtyFields: FieldNamesMarkedBoolean<ShipmentFormSchema>;
  handleRemoveItem: (id: number) => void;
  materials: MaterialNameDTO[];
  materialsObj: Record<string, string | undefined>;
  register: UseFormRegister<ShipmentFormSchema>;
  setValue: UseFormSetValue<ShipmentFormSchema>;
  tVar: (key: string) => string;
  units: UnitDTO[];
  unitsObj: Record<string, string | undefined>;
};

const InvoiceItemColumns = (props: Props) => {
  const {
    control,
    dirtyFields,
    handleRemoveItem,
    materials,
    register,
    setValue,
    units,
    unitsObj,
    tVar,
  } = props;
  const options = materials.map((material) => {
    return { value: material.id, label: material.name };
  });

  return [
    {
      header: tVar('table.material'),
      accessorKey: 'productId',
      cell: ({ row }: { row: { index: number; original: InvoiceItemRow } }) => {
        const fieldIndex = row.original.originalIndex ?? row.index;
        const name = `InvoiceItems.${fieldIndex}.productId` as const;
        return (
          <SelectProduct
            control={control}
            dirtyFields={dirtyFields}
            fieldIndex={fieldIndex}
            name={name}
            options={options}
            styles={styles}
            tVar={tVar}
          />
        );
      },
    },

    {
      header: tVar('table.description'),
      accessorKey: 'description',
      cell: ({ row }: { row: { index: number; original: InvoiceItemRow } }) => {
        const fieldIndex = row.original.originalIndex ?? row.index;
        return (
          <input
            type="text"
            {...register(`InvoiceItems.${fieldIndex}.description` as const)}
            className={`${styles.input} ${dirtyFields?.InvoiceItems?.[fieldIndex]?.description ? styles.dirty : ''}`}
          />
        );
      },
    },
    {
      header: tVar('table.quantity'),
      accessorKey: 'quantity',
      cell: ({ row }: { row: { index: number; original: InvoiceItemRow } }) => {
        const fieldIndex = row.original.originalIndex ?? row.index;
        return (
          <input
            type="number"
            step="0.01"
            {...register(`InvoiceItems.${fieldIndex}.quantity` as const, {
              valueAsNumber: true,
              required: tVar('validation.required'),
              min: { value: 0.01, message: tVar('validation.min_value') },
            })}
            className={`${styles.input} ${dirtyFields?.InvoiceItems?.[fieldIndex]?.quantity ? styles.dirty : ''}`}
          />
        );
      },
    },
    {
      header: tVar('table.unit'),
      accessorKey: 'unitId',
      cell: ({ row }: { row: { index: number; original: InvoiceItemRow } }) => {
        const fieldIndex = row.original.originalIndex ?? row.index;
        return (
          <select
            {...register(`InvoiceItems.${fieldIndex}.unitId` as const, {
              valueAsNumber: true,
              required: tVar('validation.required'),
              validate: (value) => value > 0 || tVar('validation.required'),
            })}
            className={`${styles.input} ${dirtyFields?.InvoiceItems?.[fieldIndex]?.unitId ? styles.dirty : ''}`}
          >
            <option value="">Select</option>
            {units.map((u) => (
              <option key={u.id} value={u.id}>
                {unitsObj[u.id as number]}
              </option>
            ))}
          </select>
        );
      },
    },
    {
      header: tVar('table.price'),
      accessorKey: 'unitPrice',
      cell: ({ row }: { row: { index: number; original: InvoiceItemRow } }) => {
        const fieldIndex = row.original.originalIndex ?? row.index;
        return (
          <input
            type="number"
            step="0.01"
            {...register(`InvoiceItems.${fieldIndex}.unitPrice` as const, {
              valueAsNumber: true,
              required: tVar('validation.required'),
              min: { value: 0.01, message: tVar('validation.min_value') },
            })}
            className={`${styles.input} ${dirtyFields?.InvoiceItems?.[fieldIndex]?.unitPrice ? styles.dirty : ''}`}
          />
        );
      },
    },
    {
      header: tVar('table.total'),
      accessorKey: 'total',
      cell: ({ row }: { row: { index: number; original: InvoiceItemRow } }) => {
        return (
          <TotalCell
            row={row}
            control={control}
            setValue={setValue}
            styles={styles}
          />
        );
      },
    },
    {
      id: 'actions',
      header: tVar('actions.title'),
      cell: ({ row }: { row: { index: number; original: InvoiceItemRow } }) => (
        <InvoiceTableActions
          id={row.original.id ?? 0}
          onDelete={handleRemoveItem}
          disableReset={true}
        />
      ),
    },
  ];
};

export default InvoiceItemColumns;

// {
//   header: tVar('table.material'),
//   accessorKey: 'productId',
//   cell: ({ row }: { row: { index: number; original: InvoiceItemRow } }) => {
//     const fieldIndex = row.original.originalIndex ?? row.index;
//     return (
//       <select
//         {...register(`invoiceItems.${fieldIndex}.productId` as const, {
//           valueAsNumber: true,
//           required: tVar('validation.required'),
//           validate: (value) => value > 0 || tVar('validatoin.required'),
//         })}
//         className={`${styles.input} ${dirtyFields?.invoiceItems?.[fieldIndex]?.productId ? styles.dirty : ''}`}
//       >
//         <option value="">Select</option>
//         {materials.map((p) => (
//           <option key={p.id} value={p.id}>
//             {materialsObj[p.id as number]}
//           </option>
//         ))}
//       </select>
//     );
//   },
// },
