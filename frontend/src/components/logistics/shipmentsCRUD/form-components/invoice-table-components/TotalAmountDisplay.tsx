import styles from './invoice-fields.module.css';
import { useFormContext, useWatch } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';

const TotalAmountDisplay = ({ rowIndex }: { rowIndex: number }) => {
  const { control } = useFormContext();
  const totalAmount =
    useWatch({
      control,
      name: `invoices.${rowIndex}.totalAmount`,
    }) || 0;

  return (
    <NumericFormat
      value={totalAmount}
      displayType="text"
      thousandSeparator=","
      decimalScale={2}
      fixedDecimalScale
      className={styles.input}
    />
  );
};

export default TotalAmountDisplay;
