export const BASE_URL =
  import.meta.env.VITE_VERCEL_ENV === 'preview' ? 'http://localhost:3000' : 'http://localhost:3000';

export const S3_URL =
  import.meta.env.VITE_VERCEL_ENV === 'preview' ? 'https://i.pravatar.cc' : 'http://localhost:3000';
