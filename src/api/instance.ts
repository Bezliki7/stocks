import axios from 'axios';

import { BASE_URL } from './requests/requests.constant';

export const api = axios.create({
  baseURL: BASE_URL,
});
