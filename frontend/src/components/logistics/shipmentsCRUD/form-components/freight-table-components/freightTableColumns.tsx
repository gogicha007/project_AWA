import styles from './freight-fields.module.css';
import { CurrencyDTO } from '@/api/types';
import DateInput from '@/components/controls/date-input/date-input';
import { useMemo } from 'react';
import { TiDelete } from 'react-icons/ti';
import { useFormContext } from 'react-hook-form';

export interface FreightRow {
  id: number;
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
            placeholder="Truck number(s)"
          />
        ),
      },
      {
        header: tVar('table.forwarder'),
        accessorKey: 'forwarder',
        cell: ({ row }: { row: { index: number; original: FreightRow } }) => (
          <input
            {...register(`freights.${row.index}.billNumber` as const)}
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
            placeholder="Enter bill number"
          />
        ),
      },
      {
        header: tVar('table.bill_date'),
        accessorKey: 'billDate',
        cell: ({ row }: { row: { index: number; original: FreightRow } }) => (
          <DateInput
            label=""
            name={`freithgs.${row.index}.billDate`}
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
        header: tVar('table.freight_rate'),
        accessorKey: 'freightRate',
        cell: ({ row }: { row: { index: number; original: FreightRow } }) => (
          <input
            {...register(`freights.${row.index}.freightRate` as const, {
              valueAsNumber: true,
            })}
            className={`${styles.invoiceNumber} ${styles.input}`}
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
    [tVar]
  );
};

export default FreightColumns;
