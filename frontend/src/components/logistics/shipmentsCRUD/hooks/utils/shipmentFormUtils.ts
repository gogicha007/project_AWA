import { ShipmentFormValues } from "../useShipmentFormSet";
import { ShipmentDTO } from "@/api/types";
import { FieldNamesMarkedBoolean } from 'react-hook-form';

export const createDefaultValues = (): ShipmentFormValues => ({
  alias: '',
  status: '' as '' | 'APPLIED' | 'DECLARED' | 'ARRIVED',
  declaration_number: '',
  declaration_date: undefined,
  files: [],
  invoices: [],
  invoiceItems: [],
});

export const transformShipmentToFormData = (shipment: ShipmentDTO): ShipmentFormValues => ({
  alias: shipment.alias,
  status: shipment.status as 'APPLIED' | 'DECLARED' | 'ARRIVED',
  declaration_number: shipment.declaration_number || '',
  declaration_date: shipment.declaration_date
    ? typeof shipment.declaration_date === 'string'
      ? new Date(shipment.declaration_date)
      : shipment.declaration_date
    : undefined,
  files: shipment.Files,
  invoices: shipment.Invoices,
  invoiceItems: shipment.Invoices
    ? shipment.Invoices.flatMap((inv) => inv.Items ?? [])
    : [],
});

export const detectFormChanges = (
  data: ShipmentFormValues, 
  originalValues: Partial<ShipmentFormValues>,
  dirtyFields: FieldNamesMarkedBoolean<ShipmentFormValues>,
) => {
  const generalFields: (keyof ShipmentFormValues)[] = [
    'alias',
    'declaration_date', 
    'declaration_number',
    'status',
  ];

  const hasGeneralFieldChanges = generalFields.some(
    (item) => dirtyFields[item] === true
  );

  const hasFileChanges = 'files' in dirtyFields;
  const hasInvoiceChanges = 'invoices' in dirtyFields;
  const hasInvoiceItemChanges = 'invoiceItems' in dirtyFields;

  return {
    hasGeneralFieldChanges,
    hasFileChanges,
    hasInvoiceChanges,
    hasInvoiceItemChanges,
  };
};