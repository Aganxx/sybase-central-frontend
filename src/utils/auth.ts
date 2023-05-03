import { useStorage } from '@vueuse/core';

const TOKEN_KEY = 'token';

const isLogin = () => {
  return !!getToken();
};

const getToken = () => {
  return sessionStorage.getItem(TOKEN_KEY);
};

const setToken = (token: string) => {
  useStorage(TOKEN_KEY, token, sessionStorage);
};

const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(TOKEN_KEY);
};

export { isLogin, getToken, setToken, clearToken };
