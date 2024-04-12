import React from 'react';

export const ErrorMessage = ({ error = '' }) => {
  return error && <p className="text-red-500 text-small">{error}</p>;
};
