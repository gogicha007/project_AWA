import { useEffect } from 'react';
import { NumericFormat } from 'react-number-format';
import { Control, UseFormSetValue, useWatch } from 'react-hook-form';
import { InvoiceItemFormValues } from './useInvoiceItemsTable';
import { InvoiceItemRow } from './invoiceItemsTableColumns';

export function TotalCell({
  row,
  control,
  setValue,
  styles,
}: {
  row: { index: number; original: InvoiceItemRow };
  control: Control<InvoiceItemFormValues>;
  setValue: UseFormSetValue<InvoiceItemFormValues>;
  styles: Record<string, string>;
}) {
  const quantity = useWatch({
    control,
    name: `invoiceItems.${row.index}.quantity`,
  });
  const unitPrice = useWatch({
    control,
    name: `invoiceItems.${row.index}.unitPrice`,
  });

  const total = (Number(quantity) || 0) * (Number(unitPrice) || 0);

  useEffect(() => {
    setValue(`invoiceItems.${row.index}.total`, total, {
      shouldValidate: false,
      shouldDirty: false,
    });
  }, [total, row.index, setValue]);

  return (
    <NumericFormat
      value={total}
      displayType="input"
      thousandSeparator=","
      decimalScale={2}
      fixedDecimalScale
      disabled
      className={`${styles.input} ${styles.total}`}
    />
  );
}
