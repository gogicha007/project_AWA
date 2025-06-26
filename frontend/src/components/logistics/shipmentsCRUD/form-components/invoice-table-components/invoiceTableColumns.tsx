import styles from './invoice-fields.module.css';
import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { CurrencyDTO, VendorDTO } from '@/api/types';
import DateInput from '@/components/controls/date-input/date-input';
import InvoiceTableActions from './InvoiceTableActions';
import { FieldNamesMarkedBoolean } from 'react-hook-form';
import { InvoiceFormValues } from './useInvoiceTable';

export interface InvoiceRow {
  id: number;
  vendorId: number;
  invoiceNumber: string;
  invoiceDate: Date | string | null;
  currencyId: number;
  totalAmount: number;
  isArrived: boolean;
}

type Props = {
  tVar: (key: string) => string;
  vendors: Partial<VendorDTO>[];
  currencies: Partial<CurrencyDTO>[];
  vendorsObj: Record<string, string | undefined>;
  currenciesObj: Record<string, string | undefined>;
  openItemsDialog: (id: number) => void;
  handleResetInvoice: (id: number) => void;
  handleRemoveInvoice: (id: number) => void;
  dirtyFields: FieldNamesMarkedBoolean<InvoiceFormValues>;
};

const InvoiceColumns = (props: Props) => {
  const {
    tVar,
    vendors,
    currencies,
    vendorsObj,
    currenciesObj,
    openItemsDialog,
    handleResetInvoice,
    handleRemoveInvoice,
    dirtyFields,
  } = props;
  const { control, register } = useFormContext();

  return useMemo(
    () => [
      {
        header: tVar('table.vendor'),
        accessorKey: 'vendorId',
        cell: ({ row }: { row: { index: number; original: InvoiceRow } }) => (
          <select
            {...register(`invoices.${row.index}.vendorId` as const)}
            defaultValue={row.original.vendorId}
            className={`${styles.input} ${dirtyFields?.invoices?.[row.index]?.vendorId ? styles.dirty : ''}`}
          >
            <option value="">Select</option>
            {vendors.map((v) => (
              <option key={v.id} value={v.id}>
                {vendorsObj[v.id as number]}
              </option>
            ))}
          </select>
        ),
      },
      {
        header: tVar('table.invoice_number'),
        accessorKey: 'invoiceNumber',
        cell: ({ row }: { row: { index: number; original: InvoiceRow } }) => (
          <input
            {...register(`invoices.${row.index}.invoiceNumber` as const)}
            defaultValue={row.original.invoiceNumber}
            className={`${styles.input} ${dirtyFields?.invoices?.[row.index]?.invoiceNumber ? styles.dirty : ''}`}
          />
        ),
      },
      {
        header: tVar('table.invoice_date'),
        accessorKey: 'invoiceDate',
        cell: ({ row }: { row: { index: number; original: InvoiceRow } }) => (
          <DateInput
            label=""
            name={`invoices.${row.index}.invoiceDate`}
            control={control}
            className={`${styles.inputDate} ${dirtyFields?.invoices?.[row.index]?.invoiceDate ? styles.dirty : ''}`}
          />
        ),
      },
      {
        header: tVar('table.currency'),
        accessorKey: 'currencyId',
        cell: ({ row }: { row: { index: number; original: InvoiceRow } }) => (
          <select
            {...register(`invoices.${row.index}.currencyId` as const)}
            defaultValue={row.original.currencyId}
            className={`${styles.input} ${dirtyFields?.invoices?.[row.index]?.currencyId ? styles.dirty : ''}`}
          >
            <option value="">Select</option>
            {currencies.map((c) => (
              <option key={c.id} value={c.id}>
                {currenciesObj[c.id as number]}
              </option>
            ))}
          </select>
        ),
      },
      {
        header: tVar('table.total_amount'),
        accessorKey: 'totalAmount',
        cell: ({ row }: { row: { index: number; original: InvoiceRow } }) => (
          <input
            type="number"
            step="0.01"
            {...register(`invoices.${row.index}.totalAmount` as const, {
              valueAsNumber: true,
            })}
            className={`${styles.input} ${dirtyFields?.invoices?.[row.index]?.totalAmount ? styles.dirty : ''}`}
          />
        ),
      },
      {
        header: tVar('table.is_arrived'),
        accessorKey: 'isArrived',
        cell: ({ row }: { row: { index: number; original: InvoiceRow } }) => (
          <input
            type="checkbox"
            {...register(`invoices.${row.index}.isArrived` as const)}
            defaultChecked={row.original.isArrived}
          />
        ),
      },
      {
        id: 'items',
        header: tVar('actions.items'),
        cell: ({ row }: { row: { original: InvoiceRow } }) => (
          <button
            onClick={() => openItemsDialog(row.original.id)}
            className={styles.itemButton}
          >
            {tVar('actions.items')}
          </button>
        ),
      },
      {
        id: 'actions',
        header: tVar('actions.title'),
        cell: ({ row }: { row: { index: number; original: InvoiceRow } }) => (
          <InvoiceTableActions
            id={row.original.id ?? 0}
            onReset={handleResetInvoice}
            onDelete={handleRemoveInvoice}
            disableReset={
              !(!!dirtyFields?.invoices?.[row.index] &&
              Object.values(dirtyFields.invoices[row.index]).some(Boolean))
            }
          />
        ),
      },
    ],
    [
      tVar,
      register,
      control,
      vendors,
      currencies,
      vendorsObj,
      currenciesObj,
      handleResetInvoice,
      handleRemoveInvoice,
      openItemsDialog,
    ]
  );
};

export default InvoiceColumns;
