import {
  Controller,
  Control,
  FieldNamesMarkedBoolean,
  FieldPath,
} from 'react-hook-form';
import Select from 'react-select';
import { ShipmentFormSchema } from '../../../shipmentSchema';

type Props = {
  control: Control<ShipmentFormSchema>;
  dirtyFields: FieldNamesMarkedBoolean<ShipmentFormSchema>;
  fieldIndex: number;
  name: FieldPath<ShipmentFormSchema>;
  options: {
    value: number | undefined;
    label: string;
  }[];
  styles: {
    readonly [key: string]: string;
  };
  tVar: (key: string) => string;
};

export function SelectProduct({
  control,
  dirtyFields,
  fieldIndex,
  name,
  options,
  styles,
  tVar,
}: Props) {
  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: tVar('validation.required'),
        validate: (value) =>
          (typeof value === 'number' && value > 0) ||
          tVar('validation.required'),
      }}
      render={({ field }) => {
        const selectedOption =
          options.find((option) => option.value === field.value) || null;

        return (
          <Select<{ value: number | undefined; label: string }>
            options={options}
            onChange={(selectedOption) => {
              field.onChange(selectedOption?.value || 0);
            }}
            value={selectedOption}
            placeholder="Select material..."
            // isClearable
            isSearchable
            menuPlacement="top"
            styles={{
              menu: (styles) => ({
                ...styles,
                zIndex: 9999,
                // position: 'absolute',
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
                boxShadow:
                  '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
              }),
              menuList: (styles) => ({
                ...styles,
                maxHeight: '220px',
              }),
              control: (styles, state) => ({
                ...styles,
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
              valueContainer: (styles) => ({
                ...styles,
                height: '30px',
                padding: '0 6px',
              }),
              input: (styles) => ({
                ...styles,
                margin: '0px',
              }),
              indicatorSeparator: () => ({
                display: 'none',
              }),
              indicatorsContainer: (styles) => ({
                ...styles,
                height: '30px',
              }),
              option: (styles, state) => ({
                ...styles,
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
              dirtyFields?.InvoiceItems?.[fieldIndex]?.productId
                ? styles.dirty
                : ''
            }
          />
        );
      }}
    />
  );
}
