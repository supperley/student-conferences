export const facultiesDataMap = {
  all: { label: 'Все факультеты', value: 'all' },
  atf: { label: 'АТФ', value: 'atf' },
  fgde: { label: 'ФГДИЭ', value: 'fgde' },
  msf: { label: 'МСФ', value: 'msf' },
  mtf: { label: 'МТФ', value: 'mtf' },
  fmmp: { label: 'ФММП', value: 'fmmp' },
  ef: { label: 'ЭФ', value: 'ef' },
  fitr: { label: 'ФИТР', value: 'fitr' },
  ftug: { label: 'ФТУГ', value: 'ftug' },
  ipf: { label: 'ИПФ', value: 'ipf' },
  fes: { label: 'ФЭС', value: 'fes' },
  af: { label: 'АФ', value: 'af' },
  sf: { label: 'СФ', value: 'sf' },
  psf: { label: 'ПСФ', value: 'psf' },
  ftk: { label: 'ФТК', value: 'ftk' },
  vtf: { label: 'ВТФ', value: 'vtf' },
  stf: { label: 'СТФ', value: 'stf' },
  filial: { label: 'Филиал БНТУ, г. Солигорск', value: 'filial' },
  fms: { label: 'ФМС', value: 'fms' },
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
