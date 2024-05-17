export const BASE_URL = import.meta.env.VITE_ENV
  ? 'http://192.168.100.2:3000'
  : 'http://localhost:3000';

export const S3_URL = import.meta.env.VITE_ENV
  ? 'http://192.168.100.2:3000'
  : 'http://localhost:3000';
