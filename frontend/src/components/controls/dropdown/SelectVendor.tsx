import React from 'react';
import Select from 'react-select';

type Props = {
  options: {
    value: number | undefined;
    label: string;
  }[];
  setOption: (id: number | null) => void;
  selectedValue?: number | null;
};
const SelectVendor = ({ options, setOption, selectedValue }: Props) => {
  const handleSelect = (option: { value: number | undefined; label: string } | null) => {
    if (option === null) {
      setOption(null);
    } else if (option?.value !== undefined) {
      console.log('vendor id', option.value);
      setOption(option.value);
    }
  };

  const selectedOption = selectedValue 
    ? options.find(option => option.value === selectedValue) 
    : null;
  return (
    <Select
      options={options}
      value={selectedOption}
      onChange={handleSelect}
      placeholder="Select vendor..."
      isClearable={true}
      menuPlacement="top"
      styles={{
        menu: (styles) => ({
          ...styles,
          zIndex: 9999,
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
    />
  );
};

export default SelectVendor;
