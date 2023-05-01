import axios from 'axios';
import type { RouteRecordNormalized } from 'vue-router';
import { UserState } from '@/store/modules/user/types';
// user.ts

export interface LoginData {
  username: string;
  password: string;
}

export interface RegisterData extends LoginData {
  role: string;
}

export interface LoginRes {
  token: string;
}

export interface ComplaintInfo {
  subject: string;
  content: string;
}

// regiser function
export async function register(registerData: RegisterData) {
  return axios.post<LoginRes>('/register', registerData);
}

// login function
export async function login(loginData: LoginData) {
  return axios.post('/login', loginData);
}

export function getUserInfo() {
  return axios.get('/getUserInfo');
}

export function requestComplaint(complaintInfo: ComplaintInfo) {
  return axios.post('/complaint', complaintInfo);
}

export function logout() {
  return axios.post<LoginRes>('/api/user/logout');
}

export function getMenuList() {
  return axios.post<RouteRecordNormalized[]>('/api/user/menu');
}
