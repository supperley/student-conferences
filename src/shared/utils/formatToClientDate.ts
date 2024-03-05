const defaultOptions = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
};

export const formatToClientDate = (date?: Date, options = defaultOptions) => {
  if (!date) {
    return '';
  }

  return new Date(date).toLocaleDateString('ru-RU', options);
};
