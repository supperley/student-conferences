import { Input as NextInput } from '@nextui-org/react';
import React from 'react';
import { useController } from 'react-hook-form';

export const Input = ({
  name,
  label,
  placeholder,
  type,
  control,
  required = '',
  endContent,
  variant,
}) => {
  const {
    field,
    fieldState: { invalid },
    formState: { errors },
  } = useController({
    name,
    control,
    rules: { required },
  });

  return (
    <NextInput
      id={name}
      label={label}
      type={type}
      placeholder={placeholder}
      value={field.value}
      name={field.name}
      isInvalid={invalid}
      onChange={field.onChange}
      onBlur={field.onBlur}
      errorMessage={`${errors[name]?.message ?? ''}`}
      endContent={endContent}
      variant={variant}
    />
  );
};
