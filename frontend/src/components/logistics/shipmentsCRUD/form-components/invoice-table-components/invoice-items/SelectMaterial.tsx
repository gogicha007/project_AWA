import { FieldNamesMarkedBoolean, UseFormRegister } from 'react-hook-form';
import { MaterialNameDTO } from '@/api/types';
import { ShipmentFormSchema } from '../../../shipmentSchema';

type Props = {
  dirtyFields: FieldNamesMarkedBoolean<ShipmentFormSchema>;
  fieldIndex: number;
  materials: MaterialNameDTO[];
  materialsObj: Record<string, string | undefined>;
  register: UseFormRegister<ShipmentFormSchema>;
  styles: {
    readonly [key: string]: string;
  };
  tVar: (key: string) => string;
};

export function SelectMaterial({
  dirtyFields,
  fieldIndex,
  materials,
  materialsObj,
  register,
  styles,
  tVar,
}: Props) {
  return (
    <select
      {...register(`InvoiceItems.${fieldIndex}.productId` as const, {
        valueAsNumber: true,
        required: tVar('validation.required') as unknown as string,
        validate: (value) => value > 0 || tVar('validation.required'),
      })}
      className={`${styles.input} ${dirtyFields?.InvoiceItems?.[fieldIndex]?.productId ? styles.dirty : ''}`}
    >
      <option value="">Select</option>
      {materials.map((p) => (
        <option key={p.id} value={p.id}>
          {materialsObj[p.id as number]}
        </option>
      ))}
    </select>
  );
}
