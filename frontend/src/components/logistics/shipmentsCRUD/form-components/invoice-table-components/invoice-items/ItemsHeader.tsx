import { Control, useWatch } from 'react-hook-form';
import { InvoiceItemFormValues } from './useInvoiceItemsTable';
import { NumericFormat } from 'react-number-format';
import { useMemo } from 'react';

export function ItemsHeader({
  control,
  invoice,
}: {
  control: Control<InvoiceItemFormValues>;
  invoice: {
    num: string;
    date: Date | string | null;
  };
}) {
  const items = useWatch({
    control,
    name: 'invoiceItems',
  });

  const totalAmount = useMemo(() => {
    if (!items || items.length === 0) return 0;
    return items.reduce((sum, item) => sum + (item?.total || 0), 0);
  }, [items]);

  return (
    <>
      <h2>
        Invoice: {invoice.num} | Date:{' '}
        {invoice.date
          ? new Date(invoice.date).toISOString().split('T')[0]
          : 'Not set'}{' '}
        | Total amount:{' '}
        <NumericFormat
          value={totalAmount}
          displayType="text"
          thousandSeparator=","
          decimalScale={2}
          fixedDecimalScale
          disabled
        />
      </h2>
    </>
  );
}
