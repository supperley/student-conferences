import { Select, SelectItem } from '@nextui-org/react';
import React from 'react';
import { Controller } from 'react-hook-form';
import { facultiesDataMap } from '../../shared/data/dataMap';

const FacultySelect = ({ control, getValues, name = 'faculties' }) => {
  const handleSelectionChange = (keys, onChange) => {
    console.log('getValues', getValues('faculties'));
    console.log('keys', keys);

    if (
      getValues('faculties')?.length === 1 &&
      getValues('faculties')[0] === 'all' &&
      keys.size > 1
    ) {
      onChange([...keys].filter((key) => key !== 'all'));
      return;
    }

    if (keys.has('all')) {
      onChange(['all']);
    } else {
      onChange([...keys]);
    }
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange: onChangeFaculties, value: facultiesValue } }) => (
        <Select
          label="Факультеты"
          selectionMode="multiple"
          variant="bordered"
          selectedKeys={facultiesValue}
          onSelectionChange={(keys) => handleSelectionChange(keys, onChangeFaculties)}>
          {Object.values(facultiesDataMap).map((faculty) => (
            <SelectItem key={faculty.value} value={faculty.value}>
              {faculty.label}
            </SelectItem>
          ))}
        </Select>
      )}
    />
  );
};

export default FacultySelect;
