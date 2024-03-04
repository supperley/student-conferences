export const formatToClientDate = (date?: Date) => {
  if (!date) {
    return '';
  }

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return new Date(date).toLocaleDateString('ru-RU', options);
};
