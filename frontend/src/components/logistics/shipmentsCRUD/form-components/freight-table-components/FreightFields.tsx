import { CurrencyDTO } from '@/api/types';
import { SnackbarControls } from '@/components/feedback/snackbar/snackbarTypes';
import React from 'react';

type Props = {
  currencies: Partial<CurrencyDTO>[];
  snackbarControls?: SnackbarControls;
};

const FreightFields = ({ currencies }: Props) => {
  currencies.map((cur) => console.log(cur));
  return <div>FreightFields</div>;
};

export default FreightFields;
