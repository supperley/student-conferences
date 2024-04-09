const defaultOptions = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
};

export const formatToClientDate = (date, options = defaultOptions) => {
  if (!date) {
    return '';
  }

  return new Date(date).toLocaleDateString('ru-RU', options);
};
