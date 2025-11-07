const errorObject = {
  Invoices: [
    {
      vendorId: { message: 'vendor' },
      invoiceNumber: { message: 'invoice_number' },
    },
    {
      vendorId: { message: 'vendor' },
      invoiceNumber: { message: 'invoice number' },
    },
  ],
  Freights: [
    {
      truckNumber: { message: 'truck number' },
      currencyId: { message: 'currency ID' },
    },
  ],
  declaration_number: { message: 'declaration_number' },
};

const collectErrors = (errors) => {
  const messages = Object.values(errors).flatMap((val) => {
    const acc = [];
    if (Array.isArray(val)) {
      val.map((el) => {
        Object.values(el).map((elVal) => acc.push(elVal.message));
      });
    } else {
      console.log(val.message);
      acc.push(val.message);
    }
    return acc;
  });
  return messages.filter(Boolean);
};

console.log(collectErrors(errorObject));
