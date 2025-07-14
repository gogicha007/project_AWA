import { CurrencyDTO } from '@/api/types';
import { useMemo } from 'react';

type Props = {
  currencies: Partial<CurrencyDTO>[];
  currenciesObj: Record<string, string | undefined>;
  tVar: (key: string) => string;
};

const FreightColumns = (props: Props) => {
  const { tVar } = props;
  return useMemo(
    () => [
      {
        header: tVar('table.truck_number'),
        accessorKey: 'truck_number',
      },
    ],
    [tVar]
  );
};

export default FreightColumns;
