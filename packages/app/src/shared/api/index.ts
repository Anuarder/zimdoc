import axios from 'axios';
import { env } from '~shared/config';

export function createHttpClient() {
  const config = {
    baseURL: env.API_URL,
    headers: {
      'accept-language': 'ru',
    },
  };

  return axios.create(config);
}

export const http = createHttpClient();
