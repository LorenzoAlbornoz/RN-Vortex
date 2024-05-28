import axios from 'axios';

import {BASE_URL} from './path';

export const api = axios.create({
  baseURL: BASE_URL,
});

export const setAuthentication = accessToken => {
  api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
};
