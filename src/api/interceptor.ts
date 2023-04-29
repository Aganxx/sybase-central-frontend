import axios from 'axios';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Message } from '@arco-design/web-vue';
import { getToken } from '@/utils/auth';

export interface HttpResponse<T = unknown> {
  status: number;
  msg: string;
  code: number;
  data: T;
  error: T;
}

if (import.meta.env.VITE_API_BASE_URL) {
  axios.defaults.baseURL = import.meta.env.VITE_API_LAF_URL;
}

axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // let each request carry token
    // this example using the JWT token
    // Authorization is a custom headers key
    // please modify it according to the actual situation
    const token = getToken();
    if (token) {
      if (!config.headers) {
        config.headers = {};
      }
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    // do something
    return Promise.reject(error);
  }
);
// add response interceptors
axios.interceptors.response.use(
  (response: AxiosResponse<HttpResponse>) => {
    const { data, status, statusText } = response;
    // if the custom code is not 20000, it is judged as an error.
    if (status !== 200) {
      Message.error({
        content: statusText || 'Error',
        duration: 5 * 1000,
      });
      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      return Promise.reject(new Error(statusText || 'Error'));
    }
    if (data.error) {
      return Promise.reject(data?.error || 'Error');
    }
    return { data };
  },
  (error) => {
    Message.error({
      content: error.msg || 'Request Error',
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  }
);
