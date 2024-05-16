import { Link as NextLink } from '@nextui-org/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Link = (props) => {
  const navigate = useNavigate();
  return (
    <NextLink
      {...props}
      onPress={() => {
        props && props?.href && navigate(props?.href);
      }}
    />
  );
};
