import { Link as NextLink } from '@nextui-org/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Link = ({ href, isExternal, className, ...props }) => {
  const navigate = useNavigate();
  return (
    <NextLink
      {...props}
      className={className + ' cursor-pointer'}
      // href={href}
      onPress={() => {
        if (href) {
          if (!isExternal) {
            navigate(href);
          } else {
            window.open(href, '_blank');
          }
        }
      }}
    />
  );
};
