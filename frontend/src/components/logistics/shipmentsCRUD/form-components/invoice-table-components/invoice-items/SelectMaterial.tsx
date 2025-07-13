import { FieldNamesMarkedBoolean, UseFormRegister } from 'react-hook-form';
import { ShipmentFormValues } from '../../../hooks/useShipmentFormSet';
import { MaterialNameDTO } from '@/api/types';

type Props = {
  dirtyFields: FieldNamesMarkedBoolean<ShipmentFormValues>;
  fieldIndex: number;
  materials: MaterialNameDTO[];
  materialsObj: Record<string, string | undefined>;
  register: UseFormRegister<ShipmentFormValues>;
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
      {...register(`invoiceItems.${fieldIndex}.productId` as const, {
        valueAsNumber: true,
        required: tVar('validation.required') as unknown as string,
        validate: (value) => value > 0 || tVar('validation.required'),
      })}
      className={`${styles.input} ${dirtyFields?.invoiceItems?.[fieldIndex]?.productId ? styles.dirty : ''}`}
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
