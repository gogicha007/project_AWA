import { useMemo } from 'react';
import { CurrencyDTO, FreightDTO } from '@/api/types';
import { arrayToIdValueMap } from '@/utils/helper';
import { SnackbarControls } from '@/components/feedback/snackbar/snackbarTypes';
import FreightColumns from './freightTableColumns';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { ShipmentFormValues } from '../../hooks/useShipmentFormSet';

type Props = {
  currencies: Partial<CurrencyDTO>[];
  snackbarControls?: SnackbarControls;
  tVar: (key: string) => string;
};

export function useFreightTable(props: Props) {
  const { currencies, tVar } = props;
  const { control } = useFormContext<ShipmentFormValues>();
  const { fields, append, remove } = useFieldArray({
    control,
    keyName: 'uid',
    name: 'freights',
  });

  const currenciesObj = useMemo(
    () => arrayToIdValueMap(currencies, 'code'),
    [currencies]
  );

  console.log(fields);
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
    append(newFreightData);
  };
  const handleRemoveFreight = (index: number) => {
    remove(index);
  };
  const columns = FreightColumns({ currencies, currenciesObj, tVar });
  return {
    columns,
    handleAddFreight,
    handleRemoveFreight,
  };
}
