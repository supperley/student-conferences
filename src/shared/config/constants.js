export const BASE_URL = import.meta.env.VITE_ENV
  ? 'http://172.20.10.5:3000'
  : 'http://localhost:3000';

export const S3_URL = import.meta.env.VITE_ENV
  ? 'http://172.20.10.5:3000'
  : 'http://localhost:3000';
