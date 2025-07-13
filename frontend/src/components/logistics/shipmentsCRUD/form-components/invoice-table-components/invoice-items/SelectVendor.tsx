import { Controller, Control, FieldNamesMarkedBoolean } from 'react-hook-form';
import Select from 'react-select';
import { ShipmentFormValues } from '../../../hooks/useShipmentFormSet';

type Props = {
  control: Control<ShipmentFormValues>;
  dirtyFields: FieldNamesMarkedBoolean<ShipmentFormValues>;
  fieldIndex: number;
  options: {
    value: number | undefined;
    label: string;
  }[];
  styles: {
    readonly [key: string]: string;
  };
  tVar: (key: string) => string;
};

export function SelectVendor({
  control,
  dirtyFields,
  fieldIndex,
  options,
  styles,
  tVar,
}: Props) {
  return (
    <Controller
      name={`invoiceItems.${fieldIndex}.productId`}
      control={control}
      rules={{
        required: tVar('validation.required'),
        validate: (value) => value > 0 || tVar('validation.required'),
      }}
      render={({ field }) => {
        console.log('field value:', field.value);
        const selectedOption =
          options.find((option) => option.value === field.value) || null;
        console.log('selected option:', selectedOption);

        return (
          <Select<{ value: number | undefined; label: string }>
            options={options}
            onChange={(selectedOption) => {
              console.log('onChange selectedOption:', selectedOption);
              field.onChange(selectedOption?.value || 0);
            }}
            value={selectedOption}
            placeholder="Select material..."
            // isClearable
            isSearchable
            menuPlacement="top"
            // menuPortalTarget={document.body}
            styles={{
              menu: (base) => ({
                ...base,
                zIndex: 9999,
                position: 'absolute',
              }),
              menuList: (base) => ({
                ...base,
                maxHeight: '220px',
              }),
              control: (base, state) => ({
                ...base,
                minHeight: '32px',
                height: '32px',
                width: '250px',
                fontSize: '0.8rem',
                borderColor: state.isFocused ? '#10b981' : '#e5e7eb',
                boxShadow: state.isFocused
                  ? '0 0 0 2px rgba(16, 185, 129, 0.2)'
                  : 'none',
                '&:hover': {
                  borderColor: '#10b981',
                },
              }),
              valueContainer: (base) => ({
                ...base,
                height: '30px',
                padding: '0 6px',
              }),
              input: (base) => ({
                ...base,
                margin: '0px',
              }),
              indicatorSeparator: () => ({
                display: 'none',
              }),
              indicatorsContainer: (base) => ({
                ...base,
                height: '30px',
              }),
              option: (base, state) => ({
                ...base,
                backgroundColor: state.isSelected
                  ? '#10b981'
                  : state.isFocused
                    ? '#f0f9ff'
                    : 'white',
                color: state.isSelected ? 'white' : '#374151',
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: state.isSelected ? '#10b981' : '#f0f9ff',
                },
              }),
            }}
            className={
              dirtyFields?.invoiceItems?.[fieldIndex]?.productId
                ? styles.dirty
                : ''
            }
          />
        );
      }}
    />
  );
}
