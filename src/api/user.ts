import axios from 'axios';
import type { RouteRecordNormalized } from 'vue-router';
import { UserState } from '@/store/modules/user/types';
// user.ts

export interface LoginData {
  username: string;
  password: string;
}

export interface LoginRes {
  token: string;
}

// regiser function
export async function register(registerData: LoginData) {
  return axios.post<LoginRes>('/register', registerData);
}

// login function
export async function login(loginData: LoginData) {
  return axios.post<LoginRes>('/login', loginData);
}

// export function login(data: LoginData) {
//   return axios.post<LoginRes>('/api/user/login', data);
// }

export function logout() {
  return axios.post<LoginRes>('/api/user/logout');
}

export function getUserInfo() {
  return axios.post<UserState>('/api/user/info');
}

export function getMenuList() {
  return axios.post<RouteRecordNormalized[]>('/api/user/menu');
}
