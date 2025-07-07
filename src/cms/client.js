import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: '89azby5y', // tu ID de proyecto
  dataset: 'production',
  useCdn: true,
  apiVersion: '2023-01-01' // puedes ajustar si quieres
});
