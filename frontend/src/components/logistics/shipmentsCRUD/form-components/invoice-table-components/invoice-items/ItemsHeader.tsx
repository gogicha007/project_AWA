import { Control, useWatch } from 'react-hook-form';
import { ShipmentFormValues } from '../../../hooks/useShipmentFormSet';
import { NumericFormat } from 'react-number-format';
import { useMemo } from 'react';

export function ItemsHeader({
  control,
  invoice,
  invoiceId,
}: {
  control: Control<ShipmentFormValues>;
  invoice: {
    num: string;
    date: Date | string | null;
  };
  invoiceId: number;
}) {
  const items = useWatch({
    control,
    name: 'invoiceItems',
  });

  const totalAmount = useMemo(() => {
    if (!items || items.length === 0) return 0;
    const currentInvoiceItems = items.filter(item => item.invoiceId === invoiceId);
    return currentInvoiceItems.reduce((sum, item) => sum + (item?.total || 0), 0);
  }, [items, invoiceId]);

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
