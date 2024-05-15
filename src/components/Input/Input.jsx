import { Input as NextInput } from '@nextui-org/react';
import React from 'react';
import { useController } from 'react-hook-form';

export const Input = ({
  name,
  label,
  placeholder,
  type,
  control,
  rules,
  endContent,
  variant,
  className,
}) => {
  const {
    field,
    fieldState: { invalid },
    formState: { errors },
  } = useController({
    name,
    control,
    rules,
  });

  return (
    <NextInput
      isRequired={rules && rules['required'] ? true : false}
      className={className}
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
