export const BASE_URL = import.meta.env.VITE_URL_TO_SERVER
  ? import.meta.env.VITE_URL_TO_SERVER
  : 'http://localhost:3000';

export const S3_URL = import.meta.env.VITE_URL_TO_S3
  ? import.meta.env.VITE_URL_TO_S3
  : 'http://localhost:3000';
