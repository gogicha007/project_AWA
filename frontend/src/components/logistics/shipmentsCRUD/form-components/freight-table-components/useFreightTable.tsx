import { useMemo } from 'react';
import { CurrencyDTO, FreightDTO } from '@/api/types';
import { arrayToIdValueMap, negIdCounter } from '@/utils/helper';
import { SnackbarControls } from '@/components/feedback/snackbar/snackbarTypes';
import FreightColumns from './freightTableColumns';
import { useFieldArray, useFormContext } from 'react-hook-form';
// import { ShipmentFormValues } from '../../hooks/useShipmentFormSet';
import { ShipmentFormSchema } from '../../shipmentSchema';

type Props = {
  currencies: Partial<CurrencyDTO>[];
  snackbarControls?: SnackbarControls;
  tVar: (key: string) => string;
};

export function useFreightTable(props: Props) {
  const { currencies, tVar } = props;
  const { control, getValues, setValue } = useFormContext<ShipmentFormSchema>();
  const { fields, append, remove } = useFieldArray({
    control,
    keyName: 'uid',
    name: 'freights',
  });

  const currenciesObj = useMemo(
    () => arrayToIdValueMap(currencies, 'code'),
    [currencies]
  );

  const handleAddFreight = (
    newFreightData: FreightDTO = {
      forwarder: '',
      billNumber: '',
      billDate: new Date(),
      currencyId: 0,
      freightRate: 0,
      truckNumber: '',
    }
  ) => {
    const newFreight: FreightDTO = {
      ...newFreightData,
      id: negIdCounter.getId(),
      billDate:
        newFreightData.billDate instanceof Date
          ? newFreightData.billDate
          : newFreightData.billDate
            ? new Date(newFreightData.billDate)
            : new Date(),
    };
    append(newFreight, { shouldFocus: true });
    console.log(fields);
  };

  const handleRemoveFreight = (id: number) => {
    if (confirm(tVar('warnings.delete'))) {
      const index = fields.findIndex((field) => field.id === id);
      if (index !== -1) {
        remove(id);
        if (id > 0) {
          const removedFreightsArr = getValues('_hasRemovals.inFreights') || [];
          const newRemFreightArr = [...removedFreightsArr, id];
          setValue('_hasRemovals.inFreights', newRemFreightArr, {
            shouldDirty: true,
          });
        }
      }
    }
  };

  const columns = FreightColumns({
    currencies,
    currenciesObj,
    onDelete: handleRemoveFreight,
    tVar,
  });
  
  return {
    columns,
    fields,
    handleAddFreight,
    handleRemoveFreight,
  };
}
