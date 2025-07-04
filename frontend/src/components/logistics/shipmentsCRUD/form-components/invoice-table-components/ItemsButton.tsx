import styles from './invoice-fields.module.css';
import { useFormContext, useWatch } from 'react-hook-form';
const ItemsButton = ({ 
  rowIndex, 
  invoiceId, 
  onOpenDialog, 
  tVar 
}: { 
  rowIndex: number; 
  invoiceId: number; 
  onOpenDialog: (id: number) => void; 
  tVar: (key: string) => string; 
}) => {
  const { control } = useFormContext();
  const invoiceNumber = useWatch({
    control,
    name: `invoices.${rowIndex}.invoiceNumber`,
  });
  const invoiceDate = useWatch({
    control,
    name: `invoices.${rowIndex}.invoiceDate`,
  });
  
  const isEnabled = !!(invoiceNumber && invoiceDate);

  return (
    <button
      onClick={() => onOpenDialog(invoiceId)}
      className={styles.itemButton}
      disabled={!isEnabled}
    >
      {tVar('actions.items')}
    </button>
  );
};

export default ItemsButton