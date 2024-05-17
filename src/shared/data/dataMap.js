export const facultiesDataMap = {
  fitr: { label: 'ФИТР', value: 'fitr' },
  fmmp: { label: 'ФММП', value: 'fmmp' },
  msf: { label: 'МСФ', value: 'msf' },
};

export const chipDataMap = {
  conference: { name: 'Конференция', value: 'conference', color: 'success' },
  notification: { name: 'Уведомление', value: 'notification', color: 'warning' },
};

export const userStatusMap = {
  active: { name: 'Активен', color: 'success' },
  paused: { name: 'Заморожен', color: 'warning' },
  blocked: { name: 'Заблокирован', color: 'danger' },
};

export const conferenceStatusMap = {
  registrationOpen: { name: 'Регистрация открыта', color: 'success' },
  registrationClosed: { name: 'Регистрация закрыта', color: 'warning' },
  declined: { name: 'Отменена', color: 'danger' },
  completed: { name: 'Проведена', color: 'default' },
  held: { name: 'Проводится', color: 'secondary' },
};

export const reportStatusMap = {
  accepted: { name: 'Принят', color: 'success' },
  pending: { name: 'На рассмотрении', color: 'warning' },
  declined: { name: 'Отклонен', color: 'danger' },
};
