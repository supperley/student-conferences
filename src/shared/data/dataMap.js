export const conferenceStatusMap = {
  registrationOpen: { name: 'Регистрация открыта', color: 'success' },
  registrationClosed: { name: 'Регистрация закрыта', color: 'warning' },
  declined: { name: 'Отменена', color: 'danger' },
  completed: { name: 'Проведена', color: 'default' },
};

export const chipDataMap = {
  conference: { name: 'Конференция', color: 'success' },
  notification: { name: 'Уведомление', color: 'warning' },
};

export const newsType = [
  { label: 'Конференция', value: 'conference' },
  { label: 'Уведомление', value: 'notification' },
];

export const facultiesDataMap = {
  fitr: { label: 'ФИТР', value: 'fitr' },
  fmmp: { label: 'ФММП', value: 'fmmp' },
};

export const faculties = [
  { label: 'ФИТР', value: 'fitr' },
  { label: 'ФММП', value: 'fmmp' },
];

export const reportStatusMap = {
  accepted: { name: 'Принят', color: 'success' },
  pending: { name: 'На рассмотрении', color: 'warning' },
  declined: { name: 'Отклонен', color: 'danger' },
};

export const userStatusMap = {
  active: { name: 'Активен', color: 'success' },
  paused: { name: 'Заморожен', color: 'warning' },
  blocked: { name: 'Заблокирован', color: 'danger' },
};
