import styles from './freight-fields.module.css';
import { TiDelete } from 'react-icons/ti';
import { useMemo } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { CurrencyDTO } from '@/api/types';
import DateInput from '@/components/controls/date-input/date-input';
import { NumericFormat } from 'react-number-format';

export interface FreightRow {
  id: number;
  truckNumber: string;
  forwarder: string;
  billNumber: string;
  billDate: Date | string | null;
  currencyId: number;
  freightRate: number;
}

type Props = {
  currencies: Partial<CurrencyDTO>[];
  currenciesObj: Record<string, string | undefined>;
  onDelete: (id: number) => void;
  tVar: (key: string) => string;
};

const FreightColumns = (props: Props) => {
  const { currencies, currenciesObj, onDelete, tVar } = props;
  const { control, register } = useFormContext();
  return useMemo(
    () => [
      {
        header: tVar('table.truck_number'),
        accessorKey: 'truckNumber',
        cell: ({ row }: { row: { index: number; original: FreightRow } }) => (
          <input
            {...register(`freights.${row.index}.truckNumber` as const)}
            className={`${styles.invoiceNumber} ${styles.input}`}
          />
        ),
      },
      {
        header: tVar('table.forwarder'),
        accessorKey: 'forwarder',
        cell: ({ row }: { row: { index: number; original: FreightRow } }) => (
          <input
            {...register(`freights.${row.index}.forwarder` as const)}
            className={`${styles.invoiceNumber} ${styles.input}`}
          />
        ),
      },
      {
        header: tVar('table.bill_number'),
        accessorKey: 'billNumber',
        cell: ({ row }: { row: { index: number; original: FreightRow } }) => (
          <input
            {...register(`freights.${row.index}.billNumber` as const)}
            className={`${styles.invoiceNumber} ${styles.input}`}
          />
        ),
      },
      {
        header: tVar('table.bill_date'),
        accessorKey: 'billDate',
        cell: ({ row }: { row: { index: number; original: FreightRow } }) => (
          <DateInput
            label=""
            name={`freights.${row.index}.billDate`}
            control={control}
            className={styles.inputDate}
          />
        ),
      },
      {
        header: tVar('table.currency'),
        accessorKey: 'currencyId',
        cell: ({ row }: { row: { index: number; original: FreightRow } }) => (
          <select
            {...register(`freights.${row.index}.currencyId` as const, {
              valueAsNumber: true,
            })}
            className={`${styles.currency} ${styles.input}`}
          >
            <option value={0}>Select</option>
            {currencies.map((c) => (
              <option key={c.id} value={c.id}>
                {currenciesObj[c.id as number]}
              </option>
            ))}
          </select>
        ),
      },
      {
        header: tVar('table.freight_rate'),
        accessorKey: 'freightRate',
        cell: ({ row }: { row: { index: number; original: FreightRow } }) => (
          <Controller
            control={control}
            name={`freights.${row.index}.freightRate`}
            render={({ field: { name, value, onChange } }) => (
              <NumericFormat
                name={name}
                value={value}
                onValueChange={(values) => {
                  onChange(values.floatValue || 0);
                }}
                thousandSeparator=","
                decimalScale={2}
                fixedDecimalScale
                allowNegative={false}
                className={`${styles.invoiceNumber} ${styles.input}`}
              />
            )}
          />
        ),
      },
      {
        id: 'actions',
        header: tVar('actions.title'),
        cell: ({ row }: { row: { index: number; original: FreightRow } }) => (
          <button
            onClick={() => onDelete(row.original.id)}
            className={`${styles.actionButton} ${styles.deleteButton}`}
            title="Delete"
          >
            <TiDelete size={20} />
          </button>
        ),
      },
    ],
    [control, register, currencies, currenciesObj, onDelete, tVar]
  );
};

export default FreightColumns;
