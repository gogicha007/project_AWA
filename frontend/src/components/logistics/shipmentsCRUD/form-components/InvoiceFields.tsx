import { CurrencyDTO, InvoiceDTO, VendorDTO } from '@/api/types';
import React from 'react';

type Props = {
  auxData: {
    currencies: Partial<CurrencyDTO>[];
    vendors: Partial<VendorDTO>[];
  };
  invoiceArray: InvoiceDTO[];
  setInvoiceArray: (invoices: InvoiceDTO[]) => void;
  tB: (key: string) => string;
  tS: (key: string) => string;
};

const InvoiceFields = (props: Props) => {
 
  console.log(props.invoiceArray)
 

  return (
    <div>
      InvoiceFields
    </div>
  );
};

export default InvoiceFields;
