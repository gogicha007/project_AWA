import { MaterialNameDTO, UnitDTO } from '@/api/types';
import styles from '../invoice-fields.module.css';
import {
  Control,
  FieldNamesMarkedBoolean,
  UseFormRegister,
} from 'react-hook-form';
import { InvoiceItemFormValues } from './useInvoiceItemsTable';
import InvoiceTableActions from '../InvoiceTableActions';

export interface InvoiceItemRow {
  id: number;
  invoiceId: number;
  productId: number;
  description: string;
  quantity: number;
  unitId: number;
  unitPrice: number;
  total: number;
}

type Props = {
  control: Control<InvoiceItemFormValues>;
  dirtyFields: FieldNamesMarkedBoolean<InvoiceItemFormValues>;
  handleRemoveItem: (id: number) => void;
  materials: MaterialNameDTO[];
  materialsObj: Record<string, string | undefined>;
  register: UseFormRegister<InvoiceItemFormValues>;
  tVar: (key: string) => string;
  units: UnitDTO[];
  unitsObj: Record<string, string | undefined>;
};

const InvoiceItemColumns = (props: Props) => {
  const {
    dirtyFields,
    handleRemoveItem,
    materials,
    materialsObj,
    tVar,
    units,
    unitsObj,
    register,
  } = props;
  return [
    {
      header: tVar('table.material'),
      accessorKey: 'productId',
      cell: ({ row }: { row: { index: number; original: InvoiceItemRow } }) => (
        <select
          {...register(`invoiceItems.${row.index}.productId` as const)}
          defaultValue={row.original.productId}
          className={`${styles.input} ${dirtyFields?.invoiceItems?.[row.index]?.productId ? styles.dirty : ''}`}
        >
          <option value="">Select</option>
          {materials.map((p) => (
            <option key={p.id} value={p.id}>
              {materialsObj[p.id as number]}
            </option>
          ))}
        </select>
      ),
    },
    {
      header: tVar('table.description'),
      accessorKey: 'description',
      cell: ({ row }: { row: { index: number; original: InvoiceItemRow } }) => (
        <input
          type="text"
          {...register(`invoiceItems.${row.index}.description` as const)}
          className={`${styles.input} ${dirtyFields?.invoiceItems?.[row.index]?.description ? styles.dirty : ''}`}
        />
      ),
    },
    {
      header: tVar('table.quantity'),
      accessorKey: 'quantity',
      cell: ({ row }: { row: { index: number; original: InvoiceItemRow } }) => (
        <input
          type="number"
          step="0.01"
          {...register(`invoiceItems.${row.index}.quantity` as const, {
            valueAsNumber: true,
          })}
          className={`${styles.input} ${dirtyFields?.invoiceItems?.[row.index]?.quantity ? styles.dirty : ''}`}
        />
      ),
    },
    {
      header: tVar('table.unit'),
      accessorKey: 'unitId',
      cell: ({ row }: { row: { index: number; original: InvoiceItemRow } }) => (
        <select
          {...register(`invoiceItems.${row.index}.unitId` as const)}
          defaultValue={row.original.unitId}
          className={`${styles.input} ${dirtyFields?.invoiceItems?.[row.index]?.unitId ? styles.dirty : ''}`}
        >
          <option value="">Select</option>
          {units.map((u) => (
            <option key={u.id} value={u.id}>
              {unitsObj[u.id as number]}
            </option>
          ))}
        </select>
      ),
    },
    {
      header: tVar('table.price'),
      accessorKey: 'unitPrice',
      cell: ({ row }: { row: { index: number; original: InvoiceItemRow } }) => (
        <input
          type="number"
          step="0.01"
          {...register(`invoiceItems.${row.index}.unitPrice` as const, {
            valueAsNumber: true,
          })}
          className={`${styles.input} ${dirtyFields?.invoiceItems?.[row.index]?.unitPrice ? styles.dirty : ''}`}
        />
      ),
    },
    {
      header: tVar('table.total'),
      accessorKey: 'total',
      cell: ({ row }: { row: { index: number; original: InvoiceItemRow } }) => (
        <input
          type="number"
          step="0.01"
          {...register(`invoiceItems.${row.index}.total` as const, {
            valueAsNumber: true,
          })}
          disabled
          className={styles.input}
        />
      ),
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
