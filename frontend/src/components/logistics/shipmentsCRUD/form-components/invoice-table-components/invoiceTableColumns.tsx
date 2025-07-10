import styles from './invoice-fields.module.css';
import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { CurrencyDTO, VendorDTO } from '@/api/types';
import DateInput from '@/components/controls/date-input/date-input';
import InvoiceTableActions from './InvoiceTableActions';
import { FieldNamesMarkedBoolean } from 'react-hook-form';
import { ShipmentFormValues } from '../../hooks/useShipmentFormSet';
import ItemsButton from './ItemsButton';
import TotalAmountDisplay from './TotalAmountDisplay';

export interface InvoiceRow {
  id: number;
  vendorId: number;
  invoiceNumber: string;
  invoiceDate: Date | string | null;
  currencyId: number;
  totalAmount: number;
}

type Props = {
  currencies: Partial<CurrencyDTO>[];
  currenciesObj: Record<string, string | undefined>;
  dirtyFields: FieldNamesMarkedBoolean<ShipmentFormValues>;
  handleResetInvoice: (id: number) => void;
  handleRemoveInvoice: (id: number) => void;
  openItemsDialog: (id: number) => void;
  tVar: (key: string) => string;
  vendors: Partial<VendorDTO>[];
  vendorsObj: Record<string, string | undefined>;
};

const InvoiceColumns = (props: Props) => {
  const {
    currencies,
    currenciesObj,
    dirtyFields,
    handleResetInvoice,
    handleRemoveInvoice,
    openItemsDialog,
    tVar,
    vendors,
    vendorsObj,
  } = props;
  const { control, register } = useFormContext();

  return useMemo(
    () => [
      {
        header: tVar('table.vendor'),
        accessorKey: 'vendorId',
        cell: ({ row }: { row: { index: number; original: InvoiceRow } }) => (
          <select
            {...register(`invoices.${row.index}.vendorId` as const, {
              valueAsNumber: true,
              required: 'Vendor is required',
            })}
            className={`${styles.vendorSelect} ${dirtyFields?.invoices?.[row.index]?.vendorId ? styles.dirty : ''}`}
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
            {...register(`invoices.${row.index}.invoiceNumber` as const, {
              required: 'Invoice number is required',
            })}
            className={`${styles.invoiceNumber} ${styles.input} ${dirtyFields?.invoices?.[row.index]?.invoiceNumber ? styles.dirty : ''}`}
            placeholder="Enter invoice number"
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
            {...register(`invoices.${row.index}.currencyId` as const, {
              valueAsNumber: true,
              required: 'Currency is required',
            })}
            className={`${styles.currency} ${styles.input} ${dirtyFields?.invoices?.[row.index]?.currencyId ? styles.dirty : ''}`}
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
        cell: ({ row }: { row: { index: number; original: InvoiceRow } }) => {
          return <TotalAmountDisplay rowIndex={row.index} />;
        },
      },

      {
        id: 'items',
        header: tVar('actions.items'),
        cell: ({ row }: { row: { index: number; original: InvoiceRow } }) => {
          return (
            <ItemsButton
              rowIndex={row.index}
              invoiceId={row.original.id}
              onOpenDialog={openItemsDialog}
              tVar={tVar}
            />
          );
        },
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
              !(
                !!dirtyFields?.invoices?.[row.index] &&
                Object.values(dirtyFields.invoices[row.index]).some(Boolean)
              )
            }
          />
        ),
      },
    ],
    [
      control,
      currencies,
      currenciesObj,
      dirtyFields.invoices,
      handleResetInvoice,
      handleRemoveInvoice,
      openItemsDialog,
      register,
      tVar,
      vendors,
      vendorsObj,
    ]
  );
};

export default InvoiceColumns;
