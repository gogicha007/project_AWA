import React from 'react';
import { VendorDTO } from '@/api/types';
type Props = {
  data: VendorDTO[];
  setVendor: (id: number) => void;
};
const SelectVendor = ({ data, setVendor }: Props) => {
  console.log(setVendor);
  console.log('select vendor', data);
  return <div>selectVendor</div>;
};

export default SelectVendor;
