import { MaterialNameDTO, UnitDTO } from '@/api/types';
import styles from './invoice-items.module.css';
import {
  Control,
  FieldNamesMarkedBoolean,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';
import { InvoiceItemFormValues } from './useInvoiceItemsTable';
import InvoiceTableActions from '../InvoiceTableActions';
import { TotalCell } from './TotalCell';

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
  control: Control<InvoiceItemFormValues>;
  dirtyFields: FieldNamesMarkedBoolean<InvoiceItemFormValues>;
  handleRemoveItem: (id: number) => void;
  materials: MaterialNameDTO[];
  materialsObj: Record<string, string | undefined>;
  register: UseFormRegister<InvoiceItemFormValues>;
  setValue: UseFormSetValue<InvoiceItemFormValues>;
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
    materialsObj,
    register,
    setValue,
    units,
    unitsObj,
    tVar,
  } = props;
  return [
    {
      header: tVar('table.material'),
      accessorKey: 'productId',
      cell: ({ row }: { row: { index: number; original: InvoiceItemRow } }) => {
        const fieldIndex = row.original.originalIndex ?? row.index;
        return (
          <select
            {...register(`invoiceItems.${fieldIndex}.productId` as const, {
              required: tVar('validation.required'),
              validate: (value) => value > 0 || tVar('validatoin.required'),
            })}
            defaultValue={row.original.productId}
            className={`${styles.input} ${dirtyFields?.invoiceItems?.[fieldIndex]?.productId ? styles.dirty : ''}`}
          >
            <option value="">Select</option>
            {materials.map((p) => (
              <option key={p.id} value={p.id}>
                {materialsObj[p.id as number]}
              </option>
            ))}
          </select>
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
            {...register(`invoiceItems.${fieldIndex}.description` as const)}
            className={`${styles.input} ${dirtyFields?.invoiceItems?.[fieldIndex]?.description ? styles.dirty : ''}`}
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
            {...register(`invoiceItems.${fieldIndex}.quantity` as const, {
              valueAsNumber: true,
              required: tVar('validation.required'),
              min: { value: 0.01, message: tVar('validation.minValue') },
            })}
            className={`${styles.input} ${dirtyFields?.invoiceItems?.[fieldIndex]?.quantity ? styles.dirty : ''}`}
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
            {...register(`invoiceItems.${fieldIndex}.unitId` as const, {
              required: tVar('validation.required'),
              validate: (value) => value > 0 || tVar('validation.required'),
            })}
            defaultValue={row.original.unitId}
            className={`${styles.input} ${dirtyFields?.invoiceItems?.[fieldIndex]?.unitId ? styles.dirty : ''}`}
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
            {...register(`invoiceItems.${fieldIndex}.unitPrice` as const, {
              valueAsNumber: true,
              required: tVar('validation.required'),
              min: { value: 0.01, message: tVar('validation.minValue') },
            })}
            className={`${styles.input} ${dirtyFields?.invoiceItems?.[fieldIndex]?.unitPrice ? styles.dirty : ''}`}
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
